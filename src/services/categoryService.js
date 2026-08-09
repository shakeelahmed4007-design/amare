import { initialCategories } from '../data/mockCategories';

const STORAGE_KEY = 'cosmatic_admin_categories';

const getStoredCategories = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCategories));
    return initialCategories;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialCategories;
  }
};

const saveStoredCategories = (categories) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

export const categoryService = {
  async getCategories() {
    await new Promise(resolve => setTimeout(resolve, 150));
    return getStoredCategories();
  },

  async createCategory(categoryData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const categories = getStoredCategories();
    const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat = {
      ...categoryData,
      id: `cat-${Date.now()}`,
      slug,
      parentId: categoryData.parentId || null,
      status: categoryData.status || 'Active'
    };
    const updated = [...categories, newCat];
    saveStoredCategories(updated);
    return newCat;
  },

  async updateCategory(id, categoryData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const categories = getStoredCategories();
    const index = categories.findIndex(c => c.id === id || String(c.id) === String(id));
    if (index === -1) throw new Error('Category not found');

    const updatedCat = {
      ...categories[index],
      ...categoryData,
      slug: categoryData.slug || categoryData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || categories[index].slug
    };
    categories[index] = updatedCat;
    saveStoredCategories(categories);
    return updatedCat;
  },

  async deleteCategory(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const categories = getStoredCategories();
    const updated = categories.filter(c => c.id !== id && String(c.id) !== String(id));
    saveStoredCategories(updated);
    return true;
  }
};
