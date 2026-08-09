import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { 
  TicketPercent, Plus, Edit, Trash2, ShieldAlert, CheckCircle2, X 
} from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';

export function Subscriptions() {
  const { subscriptions, activeSubscription, setActiveSubscription, addSubscription, updateSubscription, deleteSubscription } = useStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSub, setEditSub] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    discountPercent: 10,
    duration: 'Monthly',
    pricePerPeriod: 9.99,
    description: '',
    status: 'Active'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const openCreateModal = () => {
    setEditSub(null);
    setErrorMessage('');
    setFormData({
      name: '',
      discountPercent: 10,
      duration: 'Monthly',
      pricePerPeriod: 9.99,
      description: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (sub) => {
    setEditSub(sub);
    setErrorMessage('');
    setFormData({
      name: sub.name || '',
      discountPercent: sub.discountPercent || 10,
      duration: sub.duration || 'Monthly',
      pricePerPeriod: sub.pricePerPeriod || 9.99,
      description: sub.description || '',
      status: sub.status || 'Active'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Strict 10% discount cap validation
    const discount = Number(formData.discountPercent);
    if (isNaN(discount) || discount < 0 || discount > 10) {
      setErrorMessage('Validation Error: Discount percentage CANNOT exceed 10% (Maximum Cap: 10%).');
      return;
    }

    try {
      if (editSub) {
        await updateSubscription(editSub.id, formData);
        showToast(`Updated subscription plan "${formData.name}"`);
      } else {
        await addSubscription(formData);
        showToast(`Created subscription plan "${formData.name}"`);
      }
      setIsModalOpen(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteSubscription(deleteTarget.id);
    showToast(`Deleted plan "${deleteTarget.name}"`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-xl shadow-2xl text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText flex items-center gap-2">
            <TicketPercent className="w-6 h-6 text-pink-500" />
            Subscription & Discount Plan Management
          </h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">
            Enforced 10% Maximum Discount Cap Rule across all customer subscription tiers.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-bold shadow-md hover:bg-neutral-800 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Create Plan
        </button>
      </div>

      {/* Strict 10% Discount Cap Banner */}
      <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-2xl flex items-start gap-3 text-pink-700 dark:text-pink-400 text-xs">
        <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold block">Policy Enforcement Active: Maximum 10% Discount Cap</span>
          <span>
            Admin input validation ensures no subscription discount can exceed 10%. Active discounts automatically adjust final prices on customer storefront.
          </span>
        </div>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptions.map((sub) => {
          const isActiveForStorefront = activeSubscription?.id === sub.id;
          return (
            <div 
              key={sub.id} 
              className={`bg-white dark:bg-admin-darkCard rounded-2xl border p-6 shadow-soft space-y-4 relative transition-all ${
                isActiveForStorefront ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-admin-border/60 dark:border-admin-darkBorder/60'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-400 text-xs font-black rounded-full uppercase tracking-wider">
                  {sub.discountPercent}% OFF (Max 10%)
                </span>
                <span className="text-xs font-extrabold text-neutral-400">{sub.duration}</span>
              </div>

              {/* Title & Price */}
              <div>
                <h3 className="text-xl font-black text-admin-text dark:text-admin-darkText">
                  {sub.name}
                </h3>
                <p className="text-sm font-bold text-neutral-500 mt-0.5">
                  ${sub.pricePerPeriod} / {sub.duration.toLowerCase()}
                </p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  {sub.description}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-neutral-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveSubscription(sub)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActiveForStorefront 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 hover:bg-neutral-200'
                  }`}
                >
                  {isActiveForStorefront ? 'Active on Store' : 'Test on Store'}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(sub)}
                    className="p-1.5 rounded-lg border border-neutral-200 dark:border-slate-700 hover:bg-neutral-100 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(sub)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Add / Edit Subscription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-black text-admin-text dark:text-admin-darkText mb-4">
              {editSub ? 'Edit Subscription Plan' : 'Create Subscription Plan'}
            </h2>

            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs font-bold mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-black text-admin-text dark:text-admin-darkText"
                  placeholder="e.g. Beauty VIP Pass"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                  Discount Percentage (0% to 10% Max Cap) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  required
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-pink-500/50 rounded-xl text-sm font-black text-pink-600 dark:text-pink-400 outline-none"
                />
                <span className="text-[10px] text-pink-500 font-bold mt-1 block">
                  * Admin validation rule: Values above 10% will be rejected.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                    Price per Period ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.pricePerPeriod}
                    onChange={(e) => setFormData({ ...formData, pricePerPeriod: e.target.value })}
                    className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm font-semibold outline-none text-admin-text dark:text-admin-darkText"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-admin-muted mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-xl text-sm outline-none text-admin-text dark:text-admin-darkText"
                  placeholder="Plan perks summary..."
                />
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
                  className="px-6 py-2 bg-pink-600 text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-pink-700 transition-colors"
                >
                  Save Plan
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
        title="Delete Subscription Plan"
        message={`Are you sure you want to delete subscription plan "${deleteTarget?.name}"?`}
        confirmText="Delete Plan"
      />

    </div>
  );
}
