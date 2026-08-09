import React, { useState } from 'react';
import { X, Accessibility } from 'lucide-react';

export default function FloatingWidgets() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Accessibility Widget */}
      <button 
        className="fixed right-3 top-1/2 -translate-y-1/2 z-30 bg-white border border-neutral-300 rounded-full p-2.5 shadow-md hover:bg-neutral-100 transition-colors"
        aria-label="Accessibility options"
        onClick={() => alert("Accessibility menu enabled")}
      >
        <Accessibility className="w-5 h-5 text-neutral-800" />
      </button>

      {/* Floating CHAT Widget Avatar */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-center">
        {isChatOpen ? (
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-80 sm:w-96 overflow-hidden mb-2 animate-in fade-in slide-in-from-bottom-5">
            <div className="bg-black text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                    alt="Amaré Beauty Advisor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm leading-none">Amaré Beauty Bot</h4>
                  <span className="text-[10px] text-green-400 font-bold">Online</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 bg-neutral-50 min-h-[200px] text-xs">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-neutral-200 text-neutral-800 font-medium">
                Hey beauty! 💖 Need shade matching help or product recommendations?
              </div>
            </div>
            <div className="p-2 bg-white border-t border-neutral-200">
              <input 
                type="text" 
                placeholder="Ask Amaré advisor..." 
                className="w-full text-xs bg-neutral-100 p-2.5 rounded-full border border-neutral-300 focus:outline-none focus:border-black"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    alert("Message sent! A beauty squad member will reply soon.");
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        ) : null}

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-xl group-hover:scale-110 transition-transform bg-black">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
              alt="Live Chat" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="bg-black text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full mt-1 shadow-md">
            CHAT
          </span>
        </button>
      </div>
    </>
  );
}
