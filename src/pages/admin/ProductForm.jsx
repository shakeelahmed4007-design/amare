import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { 
  ArrowLeft, Upload, Plus, Trash2, Image as ImageIcon, 
  Sparkles, Layers, DollarSign, PackageCheck, AlertCircle 
} from 'lucide-react';

export function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id && id !== 'new');
  const navigate = useNavigate();
  const { products, categories, addProduct, updateProduct } = useStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Physical',
    price: '',
    originalPrice: '',
    category_slug: categories[0]?.slug || 'makeup',
    stock_quantity: 10,
    status: 'Active',
    images: [],
    tieredPricing: []
  });

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      const existing = products.find(p => p.id === id || String(p.id) === String(id));
      if (existing) {
        setFormData({
          title: existing.title || '',
          description: existing.description || '',
          type: existing.type || 'Physical',
          price: existing.price || '',
          originalPrice: existing.originalPrice || '',
          category_slug: existing.category_slug || categories[0]?.slug || 'makeup',
          stock_quantity: existing.stock_quantity ?? 0,
          status: existing.status || 'Active',
          images: existing.images || [],
          tieredPricing: existing.tieredPricing || []
        });
      }
    }
  }, [id, isEdit, products, categories]);

  const [imageUrlInput, setImageUrlInput] = useState('');

  // Compress image before storing (keeps base64 small enough for localStorage)
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX = 600;
          let { width, height } = img;
          if (width > MAX || height > MAX) {
            if (width > height) { height = Math.round((height * MAX) / width); width = MAX; }
            else { width = Math.round((width * MAX) / height); height = MAX; }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.65));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      const compressed = await compressImage(file);
      setFormData(prev => ({ ...prev, images: [...prev.images, compressed] }));
    }
  };

  const addImageByUrl = () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
    setImageUrlInput('');
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Tiered Scale Pricing Builder
  const addTierRow = () => {
    setFormData(prev => ({
      ...prev,
      tieredPricing: [
        ...prev.tieredPricing,
        { minQty: 1, maxQty: 10, price: Number(prev.price) || 10 }
      ]
    }));
  };

  const updateTierRow = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.tieredPricing];
      updated[index] = { ...updated[index], [field]: Number(value) };
      return { ...prev, tieredPricing: updated };
    });
  };

  const removeTierRow = (index) => {
    setFormData(prev => ({
      ...prev,
      tieredPricing: prev.tieredPricing.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      setToastMessage('Please fill in Product Name and Price');
      return;
    }

    const resolvedImages = formData.images.length > 0
      ? formData.images
      : ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'];

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      stock_quantity: Number(formData.stock_quantity),
      images: resolvedImages,
      // Explicitly set image (singular) so ProductCard and Product page render correctly
      image: resolvedImages[0]
    };

    if (isEdit) {
      await updateProduct(id, payload);
    } else {
      await addProduct(payload);
    }

    navigate('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/products"
            className="p-2 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-neutral-700 dark:text-slate-300 hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-admin-text dark:text-admin-darkText">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-xs text-admin-muted">Fill in product details, tier pricing, and media preview.</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-neutral-800 transition-all shadow-md active:scale-95"
        >
          {isEdit ? 'Update Product' : 'Save & Publish'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Information */}
        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-2xl border border-admin-border/60 dark:border-admin-darkBorder/60 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-admin-text dark:text-admin-darkText flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-cyan-500" />
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-black text-admin-text dark:text-admin-darkText"
                placeholder="e.g. Suntouchable Invisi-Stick"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                Product Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
              >
                <option value="Physical">Physical Good</option>
                <option value="Digital">Digital Product (Download / Pass)</option>
                <option value="Service">Service (Consultation / Tutorial)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm outline-none focus:ring-2 focus:ring-black text-admin-text dark:text-admin-darkText"
              placeholder="Describe formula, features, usage instructions..."
            />
          </div>
        </div>

        {/* Media Upload & Preview */}
        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-2xl border border-admin-border/60 dark:border-admin-darkBorder/60 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-admin-text dark:text-admin-darkText flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-500" />
            Product Images (Upload Preview)
          </h2>

          {/* Upload Drop Area */}
          <div className="border-2 border-dashed border-neutral-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-neutral-500 transition-colors relative bg-neutral-50/50 dark:bg-slate-800/30">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
            <p className="text-xs font-bold text-neutral-700 dark:text-slate-300">
              Drag and drop product images here, or <span className="text-cyan-600 underline">browse files</span>
            </p>
            <p className="text-[11px] text-neutral-400 mt-1">PNG, JPG, WebP — auto-compressed for storage</p>
          </div>

          {/* OR — paste image URL */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider shrink-0">Or paste URL</span>
            <div className="flex-1 flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={e => setImageUrlInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImageByUrl())}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3 py-2 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black text-admin-text dark:text-admin-darkText placeholder:text-neutral-400"
              />
              <button
                type="button"
                onClick={addImageByUrl}
                className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-black rounded-xl hover:bg-neutral-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>


          {/* Image Previews Grid */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-neutral-200 dark:border-slate-700 bg-neutral-100">
                  <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Scale Tier Pricing */}
        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-2xl border border-admin-border/60 dark:border-admin-darkBorder/60 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-admin-text dark:text-admin-darkText flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-500" />
            Pricing & Scale Tiered Pricing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                Regular Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-black outline-none text-admin-text dark:text-admin-darkText"
                placeholder="15.00"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                Compare-at / Original Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
                placeholder="18.00"
              />
            </div>
          </div>

          {/* Scale Pricing / Tiered Pricing Builder */}
          <div className="pt-3 border-t border-neutral-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-admin-text dark:text-admin-darkText flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-cyan-500" />
                  Scale Bulk Pricing Tiers
                </h3>
                <p className="text-[11px] text-neutral-400">Offer discounted unit prices when customers buy in bulk quantities.</p>
              </div>
              <button
                type="button"
                onClick={addTierRow}
                className="px-3 py-1.5 bg-neutral-100 dark:bg-slate-800 text-neutral-900 dark:text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-neutral-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Tier
              </button>
            </div>

            {formData.tieredPricing.length === 0 ? (
              <p className="text-xs text-neutral-400 italic bg-neutral-50 dark:bg-slate-800/50 p-3 rounded-xl text-center">
                No bulk scale pricing added yet. Click "Add Tier" to create quantity volume discounts.
              </p>
            ) : (
              <div className="space-y-2">
                {formData.tieredPricing.map((tier, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-slate-800/50 rounded-xl border border-neutral-200 dark:border-slate-700">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block">Min Qty</span>
                        <input
                          type="number"
                          value={tier.minQty}
                          onChange={(e) => updateTierRow(idx, 'minQty', e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 rounded text-xs font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block">Max Qty</span>
                        <input
                          type="number"
                          value={tier.maxQty}
                          onChange={(e) => updateTierRow(idx, 'maxQty', e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 rounded text-xs font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-neutral-400 block">Tier Price ($)</span>
                        <input
                          type="number"
                          step="0.01"
                          value={tier.price}
                          onChange={(e) => updateTierRow(idx, 'price', e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 rounded text-xs font-extrabold text-emerald-600"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTierRow(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category, Inventory & Status */}
        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-2xl border border-admin-border/60 dark:border-admin-darkBorder/60 shadow-soft space-y-4">
          <h2 className="text-base font-bold text-admin-text dark:text-admin-darkText">
            Organization & Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                Category *
              </label>
              <select
                value={formData.category_slug}
                onChange={(e) => setFormData({ ...formData, category_slug: e.target.value })}
                className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText capitalize"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
