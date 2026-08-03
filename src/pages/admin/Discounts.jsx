import { useState, useEffect } from 'react';
import { Search, Plus, Filter, Edit, Trash2, TicketPercent, Check, X } from 'lucide-react';
import { supabase } from '../../supabase';

export function Discounts() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'percentage', // percentage or fixed
    value: '',
    expires_at: '',
    is_active: true
  });

  useEffect(() => {
    fetchDiscounts();
  }, []);

  async function fetchDiscounts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('discounts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching discounts:', error);
    } else {
      setDiscounts(data || []);
    }
    setLoading(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        code: formData.code.toUpperCase(),
        discount_type: formData.discount_type,
        value: parseFloat(formData.value),
        expires_at: formData.expires_at ? new Date(formData.expires_at).toISOString() : null,
        is_active: formData.is_active
      };

      if (editingDiscount) {
        const { error } = await supabase
          .from('discounts')
          .update(payload)
          .eq('id', editingDiscount.id);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('discounts')
          .insert([payload]);
          
        if (error) throw error;
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchDiscounts();
    } catch (error) {
      console.error('Error saving discount:', error);
      alert('Error saving discount: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setFormData({
      code: discount.code,
      discount_type: discount.discount_type,
      value: discount.value,
      expires_at: discount.expires_at ? new Date(discount.expires_at).toISOString().split('T')[0] : '',
      is_active: discount.is_active
    });
    setIsModalOpen(true);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this discount code?')) {
      const { error } = await supabase
        .from('discounts')
        .delete()
        .eq('id', id);
        
      if (error) {
        alert('Error deleting discount: ' + error.message);
      } else {
        fetchDiscounts();
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const { error } = await supabase
      .from('discounts')
      .update({ is_active: !currentStatus })
      .eq('id', id);
      
    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      fetchDiscounts();
    }
  };

  const resetForm = () => {
    setEditingDiscount(null);
    setFormData({ 
      code: '', 
      discount_type: 'percentage', 
      value: '', 
      expires_at: '', 
      is_active: true 
    });
  };

  const openNewModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const filteredDiscounts = discounts.filter(d => 
    d.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Discounts</h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">Manage promo codes and special offers.</p>
        </div>
        <button 
          onClick={openNewModal}
          className="inline-flex items-center justify-center rounded-md bg-admin-text dark:bg-admin-darkText px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Create Discount
        </button>
      </div>

      <div className="bg-white dark:bg-admin-darkCard p-4 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-admin-muted dark:text-admin-darkMuted" />
          <input
            type="text"
            placeholder="Search coupon codes..."
            className="w-full pl-10 pr-4 py-2 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-lg text-sm focus:ring-2 focus:ring-admin-text outline-none text-admin-text dark:text-admin-darkText"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-admin-muted dark:text-admin-darkMuted">
            Loading discounts...
          </div>
        ) : discounts.length === 0 ? (
          <div className="p-12 text-center">
            <TicketPercent className="mx-auto h-12 w-12 text-admin-muted dark:text-admin-darkMuted/50 mb-4" />
            <h3 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-1">No discounts yet</h3>
            <p className="text-admin-muted dark:text-admin-darkMuted mb-6">Create promotional codes to boost your sales.</p>
            <button 
              onClick={openNewModal}
              className="inline-flex items-center justify-center rounded-md bg-admin-text dark:bg-admin-darkText px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 transition-colors"
            >
              <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Create Discount
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-admin-border dark:divide-admin-darkBorder">
              <thead className="bg-admin-bg/50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText sm:pl-6">Code</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Value</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Status</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Expires At</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border dark:divide-admin-darkBorder">
                {filteredDiscounts.map((discount) => {
                  const isExpired = discount.expires_at && new Date(discount.expires_at) < new Date();
                  return (
                    <tr key={discount.id} className="hover:bg-admin-bg/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 font-bold text-admin-text dark:text-admin-darkText">
                        <span className="bg-admin-bg dark:bg-slate-800 px-2 py-1 rounded tracking-wider border border-admin-border dark:border-admin-darkBorder">
                          {discount.code}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-admin-text dark:text-admin-darkText">
                        {discount.discount_type === 'percentage' ? `${discount.value}% OFF` : `$${discount.value} OFF`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <button 
                          onClick={() => toggleStatus(discount.id, discount.is_active)}
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium cursor-pointer transition-colors ${
                            discount.is_active && !isExpired
                              ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100'
                              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100'
                          }`}
                        >
                          {discount.is_active && !isExpired ? (
                            <><Check className="w-3 h-3 mr-1" /> Active</>
                          ) : isExpired ? (
                            <><X className="w-3 h-3 mr-1" /> Expired</>
                          ) : (
                            <><X className="w-3 h-3 mr-1" /> Inactive</>
                          )}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-admin-muted dark:text-admin-darkMuted">
                        {discount.expires_at ? new Date(discount.expires_at).toLocaleDateString() : 'Never expires'}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={() => handleEdit(discount)}
                            className="text-admin-accent hover:text-blue-700 dark:hover:text-blue-400"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(discount.id)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
          
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md transform bg-white dark:bg-admin-darkCard shadow-2xl transition-transform">
              <form onSubmit={handleSubmit} className="flex h-full flex-col divide-y divide-admin-border dark:divide-admin-darkBorder">
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-admin-text dark:text-admin-darkText">
                      {editingDiscount ? 'Edit Discount' : 'New Discount'}
                    </h2>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="text-admin-muted hover:text-admin-text dark:text-admin-darkMuted dark:hover:text-admin-darkText">
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label htmlFor="code" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">Promo Code</label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="code"
                          required
                          placeholder="e.g. SUMMER20"
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                          className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="discount_type" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">Type</label>
                        <div className="mt-2">
                          <select
                            id="discount_type"
                            value={formData.discount_type}
                            onChange={(e) => setFormData({ ...formData, discount_type: e.target.value })}
                            className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                          >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount ($)</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="value" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">Value</label>
                        <div className="mt-2">
                          <input
                            type="number"
                            id="value"
                            required
                            step="0.01"
                            min="0"
                            max={formData.discount_type === 'percentage' ? "100" : undefined}
                            value={formData.value}
                            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                            className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="expires_at" className="block text-sm font-medium leading-6 text-admin-text dark:text-admin-darkText">Expiration Date (Optional)</label>
                      <div className="mt-2">
                        <input
                          type="date"
                          id="expires_at"
                          value={formData.expires_at}
                          onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                          className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-admin-text focus:ring-admin-text"
                      />
                      <label htmlFor="is_active" className="text-sm font-medium text-admin-text dark:text-admin-darkText">
                        Active (Can be used at checkout)
                      </label>
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
                    {isSubmitting ? 'Saving...' : 'Save Discount'}
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
