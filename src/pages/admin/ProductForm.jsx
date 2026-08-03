import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { supabase } from '../../supabase';

export function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    sale_price: '',
    stock_quantity: 0,
    category_id: '',
    status: 'active',
  });

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('id, name');
    if (data) setCategories(data);
  }

  async function fetchProduct() {
    // Implement fetch later when editing is needed
  }

  const handleGenerateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, slug });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            price: parseFloat(formData.price),
            sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
            stock_quantity: parseInt(formData.stock_quantity),
            category_id: formData.category_id || null,
            status: formData.status,
          }
        ]);

      if (error) throw error;
      
      // Go back to products list on success
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/admin/products"
            className="p-2 rounded-full hover:bg-admin-border dark:hover:bg-admin-darkBorder transition-colors text-admin-muted dark:text-admin-darkMuted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 p-6">
          <h2 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-6">Basic Details</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">
                Product Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  onBlur={handleGenerateSlug}
                  className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text dark:focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="slug" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">
                Slug (URL)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text dark:focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text dark:focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 p-6">
          <h2 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-6">Pricing & Inventory</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">
                Price ($)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  step="0.01"
                  id="price"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text dark:focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sale_price" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">
                Sale Price ($)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  step="0.01"
                  id="sale_price"
                  value={formData.sale_price}
                  onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                  className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text dark:focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="stock_quantity" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">
                Stock Quantity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  id="stock_quantity"
                  required
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text dark:focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 p-6">
          <h2 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-6">Organization</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category_id"
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text dark:focus:ring-white sm:text-sm sm:leading-6"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">
                Status
              </label>
              <div className="mt-2">
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text dark:focus:ring-white sm:text-sm sm:leading-6"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6">
          <Link
            to="/admin/products"
            className="text-sm font-semibold leading-6 text-admin-text dark:text-admin-darkText"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded-md bg-admin-text dark:bg-admin-darkText px-8 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
