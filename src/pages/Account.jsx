import React, { useState } from 'react';
import { LogOut, Package, MapPin, User as UserIcon, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Account() {
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    { 
      id: '#EL-1092', 
      date: 'Oct 24, 2026', 
      status: 'Delivered', 
      total: '$38.00',
      items: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=200"
      ]
    },
    { 
      id: '#EL-1045', 
      date: 'Sep 12, 2026', 
      status: 'Delivered', 
      total: '$76.00',
      items: [
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=200",
        "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=200"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Premium Header / Beauty Squad Banner */}
      <div className="bg-black text-white pt-32 pb-16 px-4 sm:px-8 border-b-4 border-cyan-400">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="inline-block bg-white text-black text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 mb-4">
              Beauty Squad Member
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-black lowercase tracking-tighter mb-2">
              hi, sarah.
            </h1>
            <p className="text-neutral-400 font-semibold text-sm">
              Member since 2024
            </p>
          </div>
          
          {/* Points Card */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 w-full md:w-80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Star className="w-24 h-24" />
            </div>
            <p className="text-[11px] font-black tracking-widest uppercase text-cyan-400 mb-1">Your Points</p>
            <p className="text-4xl font-black tracking-tighter mb-4">1,250</p>
            <div className="w-full bg-neutral-800 h-1 mb-2">
              <div className="bg-cyan-400 h-1 w-[70%]"></div>
            </div>
            <p className="text-xs text-neutral-400 font-medium">250 points away from <span className="text-white font-bold">PRO Tier</span></p>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Horizontal Tabs for Mobile, Vertical for Desktop */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex-shrink-0 text-left px-5 py-4 text-[13px] font-black uppercase tracking-widest flex items-center gap-3 transition-colors ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-white text-black border border-neutral-200 hover:border-black'}`}
              >
                <Package className="w-4 h-4" /> Orders
              </button>
              <button 
                onClick={() => setActiveTab('addresses')}
                className={`flex-shrink-0 text-left px-5 py-4 text-[13px] font-black uppercase tracking-widest flex items-center gap-3 transition-colors ${activeTab === 'addresses' ? 'bg-black text-white' : 'bg-white text-black border border-neutral-200 hover:border-black'}`}
              >
                <MapPin className="w-4 h-4" /> Addresses
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex-shrink-0 text-left px-5 py-4 text-[13px] font-black uppercase tracking-widest flex items-center gap-3 transition-colors ${activeTab === 'profile' ? 'bg-black text-white' : 'bg-white text-black border border-neutral-200 hover:border-black'}`}
              >
                <UserIcon className="w-4 h-4" /> Profile
              </button>
              <div className="hidden lg:block my-4 border-b border-neutral-200"></div>
              <Link to="/login" className="flex-shrink-0 text-left px-5 py-4 text-[13px] font-black uppercase tracking-widest flex items-center gap-3 bg-white text-neutral-500 border border-neutral-200 hover:text-black hover:border-black transition-colors">
                <LogOut className="w-4 h-4" /> Sign Out
              </Link>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="font-sans text-2xl font-black text-black mb-6 tracking-tighter uppercase">Recent Orders</h3>
                
                <div className="space-y-6">
                  {orders.map((order, i) => (
                    <div key={i} className="bg-white border border-neutral-200 p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-100 pb-4 mb-4 gap-4">
                        <div>
                          <p className="text-[11px] font-black tracking-widest uppercase text-neutral-500 mb-1">Order Placed</p>
                          <p className="text-sm font-extrabold text-black">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-black tracking-widest uppercase text-neutral-500 mb-1">Total</p>
                          <p className="text-sm font-extrabold text-black">{order.total}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-black tracking-widest uppercase text-neutral-500 mb-1">Order #</p>
                          <p className="text-sm font-extrabold text-black">{order.id}</p>
                        </div>
                        <div className="sm:text-right">
                          <span className="inline-block bg-black text-white px-3 py-1.5 text-[10px] font-black tracking-widest uppercase">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          {order.items.map((img, idx) => (
                            <div key={idx} className="w-16 h-16 bg-neutral-100 border border-neutral-200 flex items-center justify-center p-2">
                              <img src={img} alt="Product" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <button className="text-[11px] font-black uppercase tracking-widest text-black hover:text-neutral-500 transition-colors flex items-center gap-1">
                          View Details <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-sans text-2xl font-black text-black tracking-tighter uppercase">Saved Addresses</h3>
                  <button className="bg-black text-white px-6 py-3 text-[11px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-colors">
                    Add New
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-black p-6 relative bg-white">
                    <span className="absolute top-4 right-4 text-[9px] font-black tracking-widest uppercase text-black border border-black px-2 py-0.5">Default</span>
                    <p className="font-extrabold text-black mb-3 text-lg uppercase tracking-tight">Sarah Jenkins</p>
                    <p className="text-[14px] text-neutral-600 font-semibold leading-relaxed">
                      123 Beauty Lane<br />
                      Apt 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                    <div className="mt-8 flex gap-6 text-[11px] font-black uppercase tracking-widest text-black">
                      <button className="hover:text-neutral-500 underline underline-offset-4 transition-colors">Edit</button>
                      <button className="hover:text-neutral-500 underline underline-offset-4 transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="font-sans text-2xl font-black text-black mb-6 tracking-tighter uppercase">Profile Settings</h3>
                <div className="bg-white border border-neutral-200 p-6 md:p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-black text-black uppercase tracking-widest">First Name</label>
                        <input type="text" defaultValue="Sarah" className="w-full p-4 border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none bg-neutral-50 text-black font-semibold text-sm transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-black text-black uppercase tracking-widest">Last Name</label>
                        <input type="text" defaultValue="Jenkins" className="w-full p-4 border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none bg-neutral-50 text-black font-semibold text-sm transition-all" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-black text-black uppercase tracking-widest">Email Address</label>
                      <input type="email" defaultValue="sarah@example.com" className="w-full p-4 border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black outline-none bg-neutral-50 text-black font-semibold text-sm transition-all" />
                    </div>
                    <div className="pt-4">
                      <button className="w-full md:w-auto px-12 py-4 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-xl">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
