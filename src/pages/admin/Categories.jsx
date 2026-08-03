import { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Tags, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../supabase';

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data || []);
    }
    setLoading(false);
  }

  const handleGenerateSlug = () => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, slug });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories')
          .update({
            name: formData.name,
            slug: formData.slug,
            description: formData.description
          })
          .eq('id', editingCategory.id);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([
            {
              name: formData.name,
              slug: formData.slug,
              description: formData.description
            }
          ]);
          
        if (error) throw error;
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || ''
    });
    setIsModalOpen(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
        
      if (error) {
        alert('Error deleting category: ' + error.message);
      } else {
        fetchCategories();
      }
    }
  };

  const resetForm = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '' });
  };

  const openNewModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Categories</h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">Organize your products into collections.</p>
        </div>
        <button 
          onClick={openNewModal}
          className="inline-flex items-center justify-center rounded-md bg-admin-text dark:bg-admin-darkText px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Category
        </button>
      </div>

      <div className="bg-white dark:bg-admin-darkCard p-4 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-admin-muted dark:text-admin-darkMuted" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-lg text-sm focus:ring-2 focus:ring-admin-text outline-none text-admin-text dark:text-admin-darkText"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-admin-muted dark:text-admin-darkMuted">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <Tags className="mx-auto h-12 w-12 text-admin-muted dark:text-admin-darkMuted/50 mb-4" />
            <h3 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-1">No categories yet</h3>
            <p className="text-admin-muted dark:text-admin-darkMuted mb-6">Create categories to help customers find what they're looking for.</p>
            <button 
              onClick={openNewModal}
              className="inline-flex items-center justify-center rounded-md bg-admin-text dark:bg-admin-darkText px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 transition-colors"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Add Category
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-admin-border dark:divide-admin-darkBorder">
              <thead className="bg-admin-bg/50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText sm:pl-6">Name</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Description</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Slug</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border dark:divide-admin-darkBorder">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-admin-bg/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 font-medium text-admin-text dark:text-admin-darkText">
                      {category.name}
                    </td>
                    <td className="px-3 py-4 text-sm text-admin-muted dark:text-admin-darkMuted max-w-xs truncate">
                      {category.description || '-'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-admin-muted dark:text-admin-darkMuted">
                      {category.slug}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleEdit(category)}
                          className="text-admin-accent hover:text-blue-700 dark:hover:text-blue-400"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over Modal for Add/Edit Category */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md transform bg-white dark:bg-admin-darkCard shadow-2xl transition-transform">
              <form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-admin-border dark:divide-admin-darkBorder">
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-admin-text dark:text-admin-darkText">
                      {editingCategory ? 'Edit Category' : 'New Category'}
                    </h2>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-admin-muted hover:text-admin-text dark:text-admin-darkMuted dark:hover:text-admin-darkText">
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">Category Name</label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onBlur={handleGenerateSlug}
                          className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="slug" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">Slug (URL)</label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="slug"
                          required
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">Description</label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          rows={4}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-shrink-0 justify-end px-4 py-4 gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-admin-text dark:text-admin-darkText hover:bg-admin-bg dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md bg-admin-text dark:bg-admin-darkText px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
