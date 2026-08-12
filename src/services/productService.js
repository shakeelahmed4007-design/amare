import { supabase } from '../supabase';

/**
 * Maps a raw Supabase DB row to the UI product shape.
 * Handles both old schema (image_url text) and new schema (images text[]).
 */
const mapToUI = (dbProduct) => {
  if (!dbProduct) return null;

  // Resolve images — DB may store as image_url (text) OR images (text[])
  let images = [];
  if (Array.isArray(dbProduct.images) && dbProduct.images.length > 0) {
    images = dbProduct.images;
  } else if (dbProduct.image_url) {
    images = [dbProduct.image_url];
  }

  // Status: DB stores 'active'|'inactive'|'draft' → UI uses 'Active'|'Inactive'|'Out of Stock'
  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    draft: 'Inactive',
    'out_of_stock': 'Out of Stock',
  };
  const uiStatus = statusMap[dbProduct.status?.toLowerCase()] || 'Active';

  return {
    id: dbProduct.id,
    title: dbProduct.name || dbProduct.title || '',
    slug: dbProduct.slug || '',
    description: dbProduct.description || '',
    price: Number(dbProduct.price) || 0,
    originalPrice: dbProduct.sale_price ? Number(dbProduct.sale_price) : null,
    stock_quantity: dbProduct.stock_quantity ?? 0,
    categoryId: dbProduct.category_id || null,
    categoryName: dbProduct.categories?.name || null,
    category_slug: dbProduct.categories?.slug || null,
    image: images[0] || null,
    images,
    status: uiStatus,
    type: dbProduct.type || 'Physical',
    variants: Array.isArray(dbProduct.product_variants)
      ? dbProduct.product_variants.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      : [],
    tags: dbProduct.tags || [],
    // Extra UI-only fields that may come from DB metadata in the future
    badge: dbProduct.badge || null,
    badgeColor: dbProduct.badge_color || null,
    rating: dbProduct.rating ? Number(dbProduct.rating) : null,
    reviews: dbProduct.review_count ? Number(dbProduct.review_count) : null,
    created_at: dbProduct.created_at,
    updated_at: dbProduct.updated_at,
  };
};

/**
 * Maps the UI product form state back to Supabase DB columns.
 */
const mapToDB = (uiProduct) => {
  // UI status → DB status
  const statusMap = {
    Active: 'active',
    Inactive: 'inactive',
    'Out of Stock': 'inactive', // Map to inactive since there's no out_of_stock enum by default
  };
  const dbStatus = statusMap[uiProduct.status] || 'active';

  // Resolve image_url (first image) and images array
  const imagesArray = Array.isArray(uiProduct.images) && uiProduct.images.length > 0
    ? uiProduct.images
    : (uiProduct.image ? [uiProduct.image] : []);

  const imageUrl = imagesArray[0] || null;

  const dbData = {
    name: uiProduct.title,
    slug: uiProduct.slug
      || (uiProduct.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    description: uiProduct.description || null,
    price: Number(uiProduct.price) || 0,
    sale_price: uiProduct.originalPrice ? Number(uiProduct.originalPrice) : null,
    stock_quantity: Number(uiProduct.stock_quantity) || 0,
    category_id: uiProduct.categoryId || null,
    image_url: imageUrl,
    images: imagesArray,
    status: dbStatus,
    type: uiProduct.type || 'Physical',
  };

  return dbData;
};

export const productService = {
  /**
   * Fetch all products with category info and variants.
   * NOTE: We fetch ALL products here (no status filter in query).
   * The mapToUI function converts DB status to UI status,
   * and the frontend filters for 'Active' status before display.
   * RLS "Public read products" policy also enforces status = 'active' on DB side.
   */
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name, slug),
        product_variants(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[productService] getProducts error:', error);
      throw error;
    }
    return (data || []).map(mapToUI);
  },

  /**
   * Fetch a single product by ID with full details.
   */
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name, slug),
        product_variants(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      console.error('[productService] getProductById error:', error);
      throw error;
    }
    return mapToUI(data);
  },

  /**
   * Create a new product and its variants (if any).
   */
  async createProduct(productData) {
    const dbData = mapToDB(productData);

    const { data: createdProduct, error } = await supabase
      .from('products')
      .insert([dbData])
      .select('id')
      .single();

    if (error) {
      console.error('[productService] createProduct error details:', JSON.stringify(error, null, 2));
      throw new Error(error.message || 'Failed to create product');
    }

    // Insert variants if provided
    if (Array.isArray(productData.variants) && productData.variants.length > 0) {
      const variantsToInsert = productData.variants.map((v, index) => ({
        product_id: createdProduct.id,
        variant_name: v.variant_name,
        color_hex: v.color_hex || null,
        image_url: v.image_url || null,
        stock_quantity: Number(v.stock_quantity) || 0,
        price_override: v.price_override ? Number(v.price_override) : null,
        sort_order: index,
      }));

      const { error: variantError } = await supabase
        .from('product_variants')
        .insert(variantsToInsert);

      if (variantError) {
        console.error('[productService] createProduct variants error:', variantError);
        throw variantError;
      }
    }

    return this.getProductById(createdProduct.id);
  },

  /**
   * Update an existing product and sync its variants.
   */
  async updateProduct(id, productData) {
    const dbData = mapToDB(productData);
    dbData.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('products')
      .update(dbData)
      .eq('id', id);

    if (error) {
      console.error('[productService] updateProduct error:', error);
      throw error;
    }

    // Replace variants: delete all then re-insert
    if (Array.isArray(productData.variants)) {
      const { error: deleteError } = await supabase
        .from('product_variants')
        .delete()
        .eq('product_id', id);

      if (deleteError) {
        console.error('[productService] deleteVariants error:', deleteError);
        throw deleteError;
      }

      if (productData.variants.length > 0) {
        const variantsToInsert = productData.variants.map((v, index) => ({
          product_id: id,
          variant_name: v.variant_name,
          color_hex: v.color_hex || null,
          image_url: v.image_url || null,
          stock_quantity: Number(v.stock_quantity) || 0,
          price_override: v.price_override ? Number(v.price_override) : null,
          sort_order: index,
        }));

        const { error: insertError } = await supabase
          .from('product_variants')
          .insert(variantsToInsert);

        if (insertError) {
          console.error('[productService] insertVariants error:', insertError);
          throw insertError;
        }
      }
    }

    return this.getProductById(id);
  },

  /**
   * Delete a single product (cascades variants via FK).
   */
  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[productService] deleteProduct error:', error);
      throw error;
    }
    return true;
  },

  /**
   * Delete multiple products at once.
   */
  async bulkDeleteProducts(ids) {
    const { error } = await supabase
      .from('products')
      .delete()
      .in('id', ids);

    if (error) {
      console.error('[productService] bulkDeleteProducts error:', error);
      throw error;
    }
    return true;
  },

  /**
   * Update status for multiple products and return updated rows.
   */
  async bulkUpdateStatus(ids, newStatus) {
    const statusMap = {
      Active: 'active',
      Inactive: 'inactive',
      'Out of Stock': 'inactive',
    };
    const dbStatus = statusMap[newStatus] || 'active';

    const { error } = await supabase
      .from('products')
      .update({ status: dbStatus, updated_at: new Date().toISOString() })
      .in('id', ids);

    if (error) {
      console.error('[productService] bulkUpdateStatus error:', error);
      throw error;
    }

    // Fetch and return updated rows
    const { data: updatedData, error: fetchError } = await supabase
      .from('products')
      .select('*, categories(name, slug), product_variants(*)')
      .in('id', ids);

    if (fetchError) {
      console.error('[productService] bulkUpdateStatus fetch error:', fetchError);
      throw fetchError;
    }

    return (updatedData || []).map(mapToUI);
  },
};
