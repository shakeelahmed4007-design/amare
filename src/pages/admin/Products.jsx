import React, { useState } from 'react';
import { useStore } from '../../contexts/StoreContext';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Trash2, Edit, CheckSquare, Square, 
  Download, Package as PackageIcon, Sparkles, AlertCircle, Layers
} from 'lucide-react';
import ConfirmModal from '../../components/common/ConfirmModal';

export function Products() {
  const { products, categories, deleteProduct, bulkDeleteProducts, bulkUpdateProductStatus, loading } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Bulk selection & Modals
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category_slug === selectedCategory;
    const matchesType = selectedType === 'all' || (p.type || 'Physical') === selectedType;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesCat && matchesType && matchesStatus;
  });

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedProducts.map(p => p.id));
    }
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleSingleDelete = async () => {
    if (!deleteTarget) return;
    await deleteProduct(deleteTarget.id);
    setSelectedIds(prev => prev.filter(id => id !== deleteTarget.id));
    showToast(`Deleted "${deleteTarget.title}"`);
    setDeleteTarget(null);
  };

  const handleBulkDelete = async () => {
    await bulkDeleteProducts(selectedIds);
    showToast(`Deleted ${selectedIds.length} selected products`);
    setSelectedIds([]);
    setIsBulkDeleteModalOpen(false);
  };

  const handleBulkStatusChange = async (status) => {
    await bulkUpdateProductStatus(selectedIds, status);
    showToast(`Updated status of ${selectedIds.length} products to ${status}`);
    setSelectedIds([]);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Type', 'Price', 'Category', 'Stock', 'Status'];
    const rows = filteredProducts.map(p => [
      p.id,
      `"${p.title.replace(/"/g, '""')}"`,
      p.type || 'Physical',
      p.price,
      p.category_slug || 'uncategorized',
      p.stock_quantity ?? 0,
      p.status || 'Active'
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `products_inventory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported products list to CSV!');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-950 px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2.5 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
            Products Directory
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 mt-1 font-medium">
            Manage inventory, physical/digital types, tiered pricing, and category assignments.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-neutral-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors shadow-2xs"
          >
            <Download className="-ml-1 mr-2 h-4 w-4" />
            Export CSV
          </button>
          <Link 
            to="/admin/products/new"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-slate-950 px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-lg hover:bg-neutral-800 transition-all active:scale-95"
          >
            <Plus className="-ml-1 mr-1.5 h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Toolbar: Search, Filters, Bulk Selection Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black text-neutral-900 dark:text-slate-100 placeholder:text-neutral-400"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="px-3.5 py-2.5 bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none text-neutral-800 dark:text-slate-200 capitalize"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
            className="px-3.5 py-2.5 bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none text-neutral-800 dark:text-slate-200"
          >
            <option value="all">All Product Types</option>
            <option value="Physical">Physical Good</option>
            <option value="Digital">Digital Product</option>
            <option value="Service">Service</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
            className="px-3.5 py-2.5 bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none text-neutral-800 dark:text-slate-200"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Floating Bulk Actions Bar */}
        {selectedIds.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 bg-neutral-900 text-white dark:bg-white dark:text-slate-950 rounded-xl border border-neutral-800 gap-3 animate-fadeIn shadow-lg">
            <span className="text-xs font-black uppercase tracking-wider flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-cyan-400" />
              {selectedIds.length} Products Selected
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => handleBulkStatusChange('Active')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Set Active
              </button>
              <button
                onClick={() => handleBulkStatusChange('Inactive')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Set Inactive
              </button>
              <button
                onClick={() => setIsBulkDeleteModalOpen(true)}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content: Desktop Table + Mobile Cards Dual View */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-slate-800 overflow-hidden">
        
        {loading ? (
          /* Skeleton Loader */
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-neutral-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : paginatedProducts.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center max-w-sm mx-auto space-y-3">
            <div className="w-14 h-14 bg-neutral-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-neutral-400">
              <PackageIcon className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">No products found</h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 leading-relaxed">
              Try adjusting your search query or filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View (hidden on small mobile screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200/80 dark:divide-slate-800">
                <thead className="bg-neutral-50/80 dark:bg-slate-800/50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-5 pr-3 text-left w-10">
                      <button onClick={toggleSelectAll} className="text-neutral-400 hover:text-black dark:hover:text-white">
                        {selectedIds.length === paginatedProducts.length ? (
                          <CheckSquare className="w-4 h-4 text-black dark:text-white" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="py-3.5 px-3 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider">Product</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider">Type</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider">Category</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider">Price & Tiers</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider">Stock</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider">Status</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-5 text-right">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-slate-800/80">
                  {paginatedProducts.map((product) => {
                    const isSelected = selectedIds.includes(product.id);
                    return (
                      <tr 
                        key={product.id} 
                        className={`hover:bg-neutral-50/80 dark:hover:bg-slate-800/30 transition-colors ${isSelected ? 'bg-cyan-50/40 dark:bg-slate-800/60' : ''}`}
                      >
                        <td className="py-4 pl-5 pr-3">
                          <button onClick={() => toggleSelectOne(product.id)}>
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-black dark:text-white" />
                            ) : (
                              <Square className="w-4 h-4 text-neutral-300 dark:text-slate-600" />
                            )}
                          </button>
                        </td>
                        <td className="whitespace-nowrap py-4 px-3 text-xs">
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 flex-shrink-0 bg-neutral-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-neutral-200/80 dark:border-slate-700 flex items-center justify-center">
                              {product.images && product.images[0] ? (
                                <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
                              ) : (
                                <PackageIcon className="w-5 h-5 text-neutral-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-extrabold text-neutral-900 dark:text-slate-100">{product.title}</div>
                              <div className="text-[11px] text-neutral-400 line-clamp-1 max-w-[220px]">{product.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xs font-bold text-neutral-600 dark:text-slate-400">
                          <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-slate-800 border border-neutral-200/80 dark:border-slate-700">
                            {product.type || 'Physical'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xs font-semibold text-neutral-500">
                          <span className="capitalize">{product.category_slug || 'Uncategorized'}</span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xs font-black text-neutral-900 dark:text-slate-100">
                          ${product.price}
                          {product.tieredPricing && product.tieredPricing.length > 0 && (
                            <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-50 dark:bg-cyan-950/50 px-2 py-0.5 rounded-full border border-cyan-200 dark:border-cyan-800">
                              <Layers className="w-3 h-3" />
                              {product.tieredPricing.length} Scale Tiers
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xs font-bold">
                          <span className={product.stock_quantity === 0 ? 'text-red-500 font-black' : 'text-neutral-600 dark:text-slate-400'}>
                            {product.stock_quantity ?? 0} left
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-xs">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider ${
                            product.status === 'Active' 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                              : product.status === 'Inactive'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-5 text-right text-xs font-medium">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/admin/products/${product.id}`}
                              className="p-1.5 rounded-lg border border-neutral-200 dark:border-slate-700 hover:bg-neutral-100 dark:hover:bg-slate-800 text-neutral-700 dark:text-slate-300 transition-colors"
                              title="Edit Product"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => setDeleteTarget(product)}
                              className="p-1.5 rounded-lg border border-red-200 dark:border-red-950 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Grid View (Shown on phone screens) */}
            <div className="block md:hidden divide-y divide-neutral-100 dark:divide-slate-800">
              {paginatedProducts.map((product) => {
                const isSelected = selectedIds.includes(product.id);
                return (
                  <div key={product.id} className={`p-4 space-y-3 ${isSelected ? 'bg-cyan-50/30 dark:bg-slate-800/50' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleSelectOne(product.id)}>
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-black dark:text-white" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-300" />
                          )}
                        </button>
                        <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-neutral-200">
                          {product.images && product.images[0] ? (
                            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                          ) : (
                            <PackageIcon className="w-6 h-6 m-auto text-neutral-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white">{product.title}</h4>
                          <span className="text-[11px] text-neutral-400 capitalize">{product.category_slug}</span>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        product.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-slate-800 text-xs">
                      <div>
                        <span className="font-black text-neutral-900 dark:text-white text-sm">${product.price}</span>
                        <span className="text-[11px] text-neutral-400 ml-2">Stock: {product.stock_quantity}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/products/${product.id}`}
                          className="p-1.5 rounded-lg border border-neutral-200 dark:border-slate-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="p-1.5 rounded-lg border border-red-200 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Pagination Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs text-neutral-500 dark:text-slate-400 font-medium">
            Page {currentPage} of {totalPages} ({filteredProducts.length} items)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-1.5 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-bold disabled:opacity-40 transition-colors hover:bg-neutral-100 dark:hover:bg-slate-800"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-1.5 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-bold disabled:opacity-40 transition-colors hover:bg-neutral-100 dark:hover:bg-slate-800"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleSingleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete Product"
      />

      <ConfirmModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={handleBulkDelete}
        title="Bulk Delete Products"
        message={`Are you sure you want to delete ${selectedIds.length} selected products?`}
        confirmText={`Delete ${selectedIds.length} Products`}
      />

    </div>
  );
}
