import { useState, useEffect } from 'react';
import { Search, Star, CheckCircle, XCircle, Trash2, MessageSquare, Clock } from 'lucide-react';
import { supabase } from '../../supabase';

const STATUS_CONFIG = {
  approved: { cls: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900', icon: CheckCircle },
  rejected:  { cls: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-900', icon: XCircle },
  pending:   { cls: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900', icon: Clock },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-200 dark:text-slate-700'}`} />
      ))}
    </div>
  );
}

export function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { fetchReviews(); }, []);

  async function fetchReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*, products(title), customers(full_name)')
      .order('created_at', { ascending: false });
    if (!error) setReviews(data || []);
    setLoading(false);
  }

  const handleUpdateStatus = async (id, newStatus) => {
    const { error } = await supabase.from('reviews').update({ status: newStatus }).eq('id', id);
    if (!error) setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) fetchReviews();
  };

  const filtered = reviews.filter(r => {
    const matchSearch =
      (r.products?.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.customers?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.comment || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

  return (
    <div className="space-y-6 pb-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">Reviews Moderation</h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 mt-1">
            Approve, reject, or delete customer product reviews.
          </p>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {Object.entries(counts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              statusFilter === status
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-transparent shadow-md'
                : 'bg-white dark:bg-slate-900 text-neutral-600 dark:text-slate-400 border-neutral-200 dark:border-slate-700 hover:bg-neutral-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className="capitalize">{status}</span>
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-md text-[10px] font-black ${
              statusFilter === status ? 'bg-white/20 dark:bg-black/20' : 'bg-neutral-100 dark:bg-slate-800'
            }`}>{count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by product, customer, or comment..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black text-neutral-900 dark:text-slate-100 placeholder:text-neutral-400"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Reviews Grid */}
      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-36 bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200 dark:border-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm">
            <div className="w-14 h-14 bg-neutral-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-neutral-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">No reviews found</h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(review => {
              const statusCfg = STATUS_CONFIG[review.status] || STATUS_CONFIG.pending;
              const StatusIcon = statusCfg.icon;
              return (
                <div key={review.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm p-5 space-y-3 hover:shadow-md dark:hover:shadow-slate-900/50 transition-all">
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-neutral-900 dark:text-white truncate">
                        {review.products?.title || 'Unknown Product'}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        by <span className="font-bold">{review.customers?.full_name || 'Anonymous'}</span>
                        {' · '}
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border shrink-0 ${statusCfg.cls}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{review.status}</span>
                    </span>
                  </div>

                  {/* Stars + Comment */}
                  <div>
                    <StarRating rating={review.rating} />
                    <p className="text-xs text-neutral-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {review.comment}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-slate-800">
                    {review.status !== 'approved' && (
                      <button
                        onClick={() => handleUpdateStatus(review.id, 'approved')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-950 transition-colors border border-emerald-200/60 dark:border-emerald-900/40"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve
                      </button>
                    )}
                    {review.status !== 'rejected' && (
                      <button
                        onClick={() => handleUpdateStatus(review.id, 'rejected')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-950 transition-colors border border-red-200/60 dark:border-red-900/40"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="ml-auto p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="text-xs text-neutral-400 text-center">
          Showing {filtered.length} of {reviews.length} reviews
        </p>
      )}
    </div>
  );
}
