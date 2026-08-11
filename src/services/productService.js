import { supabase } from '../supabase';

const mapToUI = (dbProduct) => {
  if (!dbProduct) return null;
  return {
    id: dbProduct.id,
    title: dbProduct.name,
    slug: dbProduct.slug,
    description: dbProduct.description,
    price: Number(dbProduct.price),
    stock_quantity: dbProduct.stock_quantity,
    categoryId: dbProduct.category_id,
    categoryName: dbProduct.categories?.name,
    category_slug: dbProduct.categories?.slug,
    image: dbProduct.image_url,
    images: dbProduct.image_url ? [dbProduct.image_url] : [],
    status: dbProduct.status === 'active' ? 'Active' : 'Inactive',
    variants: dbProduct.product_variants || [],
    created_at: dbProduct.created_at,
    updated_at: dbProduct.updated_at
  };
};

const mapToDB = (uiProduct) => {
  const dbStatus = uiProduct.status === 'Active' ? 'active' : 'inactive';
  const imageUrl = Array.isArray(uiProduct.images) && uiProduct.images.length > 0 
    ? uiProduct.images[0] 
    : (uiProduct.image || null);
    
  return {
    name: uiProduct.title,
    slug: uiProduct.slug || uiProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: uiProduct.description,
    price: uiProduct.price,
    stock_quantity: uiProduct.stock_quantity || 0,
    category_id: uiProduct.categoryId || null,
    image_url: imageUrl,
    status: dbStatus
  };
};

export const productService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug), product_variants(*)')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return (data || []).map(mapToUI);
  },

  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name, slug), product_variants(*)')
      .eq('id', id)
      .order('sort_order', { referencedTable: 'product_variants', ascending: true })
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return mapToUI(data);
  },

  async createProduct(productData) {
    const dbData = mapToDB(productData);
    const { data: createdProduct, error } = await supabase
      .from('products')
      .insert([dbData])
      .select('id')
      .single();
      
    if (error) throw error;
    
    // Handle variants
    if (productData.variants && productData.variants.length > 0) {
      const variantsToInsert = productData.variants.map((v, index) => ({
        product_id: createdProduct.id,
        variant_name: v.variant_name,
        color_hex: v.color_hex || null,
        image_url: v.image_url || null,
        stock_quantity: Number(v.stock_quantity) || 0,
        price_override: v.price_override ? Number(v.price_override) : null,
        sort_order: index
      }));
      
      const { error: variantError } = await supabase
        .from('product_variants')
        .insert(variantsToInsert);
        
      if (variantError) throw variantError;
    }
    
    return this.getProductById(createdProduct.id);
  },

  async updateProduct(id, productData) {
    const dbData = mapToDB(productData);
    dbData.updated_at = new Date().toISOString();
    
    const { error } = await supabase
      .from('products')
      .update(dbData)
      .eq('id', id);
      
    if (error) throw error;
    
    // Handle variants
    if (productData.variants) {
      const { error: deleteError } = await supabase
        .from('product_variants')
        .delete()
        .eq('product_id', id);
        
      if (deleteError) throw deleteError;
      
      if (productData.variants.length > 0) {
        const variantsToInsert = productData.variants.map((v, index) => ({
          product_id: id,
          variant_name: v.variant_name,
          color_hex: v.color_hex || null,
          image_url: v.image_url || null,
          stock_quantity: Number(v.stock_quantity) || 0,
          price_override: v.price_override ? Number(v.price_override) : null,
          sort_order: index
        }));
        
        const { error: insertError } = await supabase
          .from('product_variants')
          .insert(variantsToInsert);
          
        if (insertError) throw insertError;
      }
    }
    
    return this.getProductById(id);
  },

  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  },

  async bulkDeleteProducts(ids) {
    const { error } = await supabase
      .from('products')
      .delete()
      .in('id', ids);
      
    if (error) throw error;
    return true;
  },

  async bulkUpdateStatus(ids, newStatus) {
    const dbStatus = newStatus === 'Active' ? 'active' : 'inactive';
    const { error } = await supabase
      .from('products')
      .update({ status: dbStatus, updated_at: new Date().toISOString() })
      .in('id', ids);
      
    if (error) throw error;
    
    // We need to return the updated products for the UI
    const { data: updatedData, error: fetchError } = await supabase
      .from('products')
      .select('*, categories(name, slug), product_variants(*)')
      .in('id', ids);
      
    if (fetchError) throw fetchError;
    return updatedData.map(mapToUI);
  }
};
