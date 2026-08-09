import { initialProducts } from '../data/mockProducts';

const STORAGE_KEY = 'cosmatic_admin_products';
// Bump this version whenever the storage schema changes.
// On mismatch the stored data is migrated instead of wiped.
const STORAGE_VERSION = 5;
const VERSION_KEY = 'cosmatic_products_version';

const sanitizeProduct = (p) => {
  let title = p.title || '';
  let description = p.description || '';
  let details = p.details || '';
  
  // Specific fix for user requested product
  if (title.includes('Alpecin Grey Attack')) {
    const extraInfo = title.replace('Alpecin Grey Attack Shampoo', '').replace('Alpecin', 'Alpecin'); // just grab original
    title = 'Alpecin Grey Attack Shampoo';
    if (details) {
      details = `${details}\n\nAdditional Info: ${p.title}`;
    } else {
      description = description ? `${description}\n\nAdditional Info: ${p.title}` : p.title;
    }
  } else {
    const words = title.trim().split(/\s+/);
    if (words.length > 5) {
      let newTitle = words.slice(0, 5).join(' ');
      const extraInfo = words.slice(5).join(' ');
      
      // Clean trailing punctuation and commas
      newTitle = newTitle.replace(/[,|:-]+$/, '').trim().replace(/,/g, '');
      title = newTitle;
      
      if (details) {
        details = `${details}\n\nAdditional Info: ${extraInfo}`;
      } else {
        description = description ? `${description}\n\nAdditional Info: ${extraInfo}` : extraInfo;
      }
    }
  }
  
  return { ...p, title, description, details };
};

/**
 * Migrate a single product so it always has both `image` (singular)
 * and `images` (array) in sync, which is what ProductCard / Product page need.
 */
const migrateProduct = (p) => {
  const imgs = Array.isArray(p.images) && p.images.length > 0
    ? p.images
    : p.image
      ? [p.image]
      : ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'];
      
  const sanitized = sanitizeProduct(p);

  return {
    ...sanitized,
    images: imgs,
    image: imgs[0],
    status: p.status || 'Active',
    tieredPricing: p.tieredPricing || [],
    rating: p.rating || 5.0,
    reviews: p.reviews ?? 0,
  };
};

const getStoredProducts = () => {
  const storedVersion = Number(localStorage.getItem(VERSION_KEY) || 0);
  const data = localStorage.getItem(STORAGE_KEY);

  // No data at all → seed with initial products
  if (!data) {
    const seeded = initialProducts.map(migrateProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
    return seeded;
  }

  let parsed;
  try {
    parsed = JSON.parse(data);
  } catch {
    // Completely corrupt JSON → re-seed
    const seeded = initialProducts.map(migrateProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
    return seeded;
  }

  if (!Array.isArray(parsed)) {
    const seeded = initialProducts.map(migrateProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
    return seeded;
  }

  // Version mismatch → migrate existing products in-place (preserves user data)
  if (storedVersion < STORAGE_VERSION) {
    const migrated = parsed.map(migrateProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
    localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
    return migrated;
  }

  return parsed;
};

const saveStoredProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION));
};

export const productService = {
  // Simulate fetching products list with optional delay
  async getProducts() {
    await new Promise(resolve => setTimeout(resolve, 150));
    return getStoredProducts();
  },

  async getProductById(id) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const products = getStoredProducts();
    return products.find(p => p.id === id || String(p.id) === String(id)) || null;
  },

  async createProduct(productData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const products = getStoredProducts();
    const firstImage = productData.images?.[0] || productData.image || '';
    
    const sanitizedData = sanitizeProduct(productData);
    
    const newProduct = {
      ...sanitizedData,
      id: `prod-${Date.now()}`,
      // Keep both `image` (singular) and `images` (array) in sync
      // ProductCard and Product page both rely on product.image
      image: firstImage,
      images: sanitizedData.images?.length > 0 ? sanitizedData.images : (firstImage ? [firstImage] : []),
      rating: sanitizedData.rating || 5.0,
      reviews: sanitizedData.reviews ?? 0,
      status: sanitizedData.status || 'Active',
      tieredPricing: sanitizedData.tieredPricing || [],
    };

    const updated = [newProduct, ...products];
    saveStoredProducts(updated);
    return newProduct;
  },

  async updateProduct(id, productData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const products = getStoredProducts();
    const sanitizedData = sanitizeProduct(productData);
    
    let updatedProduct = null;
    const updated = products.map(p => {
      if (p.id === id || String(p.id) === String(id)) {
        updatedProduct = { ...p, ...sanitizedData };
        return updatedProduct;
      }
      return p;
    });
    
    if (updatedProduct) {
      saveStoredProducts(updated);
    }
    return updatedProduct;
  },

  async deleteProduct(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const products = getStoredProducts();
    const updated = products.filter(p => p.id !== id && String(p.id) !== String(id));
    saveStoredProducts(updated);
    return true;
  },

  async bulkDeleteProducts(ids) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const products = getStoredProducts();
    const idSet = new Set(ids.map(String));
    const updated = products.filter(p => !idSet.has(String(p.id)));
    saveStoredProducts(updated);
    return true;
  },

  async bulkUpdateStatus(ids, newStatus) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const products = getStoredProducts();
    const idSet = new Set(ids.map(String));
    const updated = products.map(p => idSet.has(String(p.id)) ? { ...p, status: newStatus } : p);
    saveStoredProducts(updated);
    return updated;
  }
};
