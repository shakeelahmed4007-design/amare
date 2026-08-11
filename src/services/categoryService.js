import { supabase } from '../supabase';


const mapToUI = (dbCategory) => {
  if (!dbCategory) return null;
  return {
    id: dbCategory.id,
    name: dbCategory.name,
    slug: dbCategory.slug,
    parentId: dbCategory.parent_id,
    created_at: dbCategory.created_at
  };
};

const mapToDB = (uiCategory) => {
  return {
    name: uiCategory.name,
    slug: uiCategory.slug || uiCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    parent_id: uiCategory.parentId || null
  };
};

export const categoryService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
      
    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
    return (data || []).map(mapToUI);
  },

  async createCategory(categoryData) {
    const dbData = mapToDB(categoryData);
    const { data, error } = await supabase
      .from('categories')
      .insert([dbData])
      .select('*')
      .single();
      
    if (error) throw error;
    return mapToUI(data);
  },

  async updateCategory(id, categoryData) {
    const dbData = mapToDB(categoryData);
    const { data, error } = await supabase
      .from('categories')
      .update(dbData)
      .eq('id', id)
      .select('*')
      .single();
      
    if (error) throw error;
    return mapToUI(data);
  },

  async deleteCategory(id) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  }
};
