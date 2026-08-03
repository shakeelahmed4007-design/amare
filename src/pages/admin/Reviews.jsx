import { useState, useEffect } from 'react';
import { Search, Filter, Star, CheckCircle, XCircle, Trash2, MessageSquare } from 'lucide-react';
import { supabase } from '../../supabase';

export function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*, products(title), customers(full_name)')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching reviews:', error);
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  }

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Error updating review: ' + error.message);
    } else {
      setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) {
        alert('Error deleting review: ' + error.message);
      } else {
        fetchReviews();
      }
    }
  };

  const filteredReviews = reviews.filter(r => {
    const matchesSearch = 
      (r.products?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.customers?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.comment || '').toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Reviews Moderation</h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">Approve, reject or delete customer product reviews.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-admin-darkCard p-4 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-admin-muted dark:text-admin-darkMuted" />
          <input
            type="text"
            placeholder="Search reviews..."
            className="w-full pl-10 pr-4 py-2 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-lg text-sm focus:ring-2 focus:ring-admin-text outline-none text-admin-text dark:text-admin-darkText"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-lg text-sm py-2 px-3 text-admin-text dark:text-admin-darkText outline-none focus:ring-2 focus:ring-admin-text"
          >
            <option value="all">All Reviews</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-admin-border dark:border-admin-darkBorder rounded-lg text-sm font-medium text-admin-text dark:text-admin-darkText hover:bg-admin-bg dark:hover:bg-slate-800 transition-colors">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-admin-muted dark:text-admin-darkMuted">
            Loading reviews...
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-admin-muted dark:text-admin-darkMuted/50 mb-4" />
            <h3 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-1">No reviews found</h3>
            <p className="text-admin-muted dark:text-admin-darkMuted">There are no reviews matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-admin-border dark:divide-admin-darkBorder">
              <thead className="bg-admin-bg/50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText sm:pl-6 w-1/4">Product / Customer</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText w-1/2">Review</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Status</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-right">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border dark:divide-admin-darkBorder">
                {filteredReviews.map((review) => (
                  <tr key={review.id} className="hover:bg-admin-bg/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="font-medium text-admin-text dark:text-admin-darkText mb-1">
                        {review.products?.title || 'Unknown Product'}
                      </div>
                      <div className="text-admin-muted dark:text-admin-darkMuted text-xs">
                        by {review.customers?.full_name || 'Anonymous'}
                      </div>
                      <div className="text-admin-muted dark:text-admin-darkMuted text-xs mt-1">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-admin-text dark:text-admin-darkText">
                      <div className="mb-2">{renderStars(review.rating)}</div>
                      <p className="text-admin-muted dark:text-admin-darkMuted line-clamp-3">{review.comment}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        review.status === 'approved' 
                          ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : review.status === 'rejected'
                          ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end gap-2">
                        {review.status !== 'approved' && (
                          <button 
                            onClick={() => handleUpdateStatus(review.id, 'approved')}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1"
                            title="Approve"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {review.status !== 'rejected' && (
                          <button 
                            onClick={() => handleUpdateStatus(review.id, 'rejected')}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-1 ml-2"
                          title="Delete permanently"
                        >
                          <Trash2 className="w-5 h-5" />
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
    </div>
  );
}
