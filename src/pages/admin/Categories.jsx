import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import {
  Plus, Edit, Trash2, Tags, FolderTree, Image as ImageIcon,
  CheckCircle2, X, ChevronRight
} from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';

export function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parentId: '',
    image: '',
    status: 'Active'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openCreateModal = () => {
    setEditCategory(null);
    setFormData({
      name: '',
      slug: '',
      parentId: '',
      image: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditCategory(cat);
    setFormData({
      name: cat.name || '',
      slug: cat.slug || '',
      parentId: cat.parentId || '',
      image: cat.image || '',
      status: cat.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editCategory) {
      await updateCategory(editCategory.id, formData);
      showToast(`Updated category "${formData.name}"`);
    } else {
      await addCategory(formData);
      showToast(`Created category "${formData.name}"`);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteCategory(deleteTarget.id);
    showToast(`Deleted category "${deleteTarget.name}"`);
    setDeleteTarget(null);
  };

  // Group top-level categories and subcategories
  const parentCategories = categories.filter(c => !c.parentId);
  const getSubcategories = (parentId) => categories.filter(c => c.parentId === parentId || String(c.parentId) === String(parentId));

  return (
    <div className="space-y-6">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText flex items-center gap-2">
            <Tags className="w-6 h-6 text-purple-500" />
            Category Hierarchy Management
          </h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">
            Dynamic categories automatically sync to the customer storefront navigation.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-bold shadow-md hover:bg-neutral-800 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Add Category
        </button>
      </div>

      {/* Category Tree Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parentCategories.map((parent) => {
          const subs = getSubcategories(parent.id);
          return (
            <div key={parent.id} className="bg-white dark:bg-admin-darkCard rounded-2xl border border-admin-border/60 dark:border-admin-darkBorder/60 p-5 shadow-soft space-y-4">

              {/* Parent Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                    {parent.image ? (
                      <img src={parent.image} alt={parent.name} className="w-full h-full object-cover" />
                    ) : (
                      <FolderTree className="w-6 h-6 text-purple-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-admin-text dark:text-admin-darkText">
                      {parent.name}
                    </h3>
                    <span className="text-xs text-neutral-400 font-mono">/{parent.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${parent.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-red-100 text-red-800'}`}>
                    {parent.status}
                  </span>
                  <button
                    onClick={() => openEditModal(parent)}
                    className="p-1.5 rounded-lg border border-neutral-200 dark:border-slate-700 hover:bg-neutral-100 transition-colors"
                  >
                    <Edit className="w-4 h-4 text-neutral-600 dark:text-slate-300" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(parent)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subcategories List */}
              <div className="pt-3 border-t border-neutral-100 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5" />
                  Subcategories ({subs.length})
                </h4>

                {subs.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic pl-4">No subcategories created yet.</p>
                ) : (
                  <div className="space-y-1.5 pl-2">
                    {subs.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-slate-800/40 border border-neutral-100 dark:border-slate-700/50 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                          <span className="font-bold text-admin-text dark:text-admin-darkText">{sub.name}</span>
                          <span className="text-[10px] text-neutral-400 font-mono">({sub.slug})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditModal(sub)}
                            className="p-1 hover:text-purple-600"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(sub)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-admin-text dark:text-admin-darkText mb-4">
              {editCategory ? 'Edit Category' : 'Create New Category'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-black text-admin-text dark:text-admin-darkText"
                  placeholder="e.g. Cleansers & Serums"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                  Parent Category (Optional - for Subcategories)
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData({ ...formData, parentId: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
                >
                  <option value="">None (Top-Level Category)</option>
                  {parentCategories.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                  Category Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-neutral-300 dark:border-slate-700 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  {editCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        message={`Are you sure you want to delete category "${deleteTarget?.name}"?`}
        confirmText="Delete Category"
      />

    </div>
  );
}
