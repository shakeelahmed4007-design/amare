import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-20 h-20 text-black" />
        </div>
        
        <h1 className="text-4xl font-black lowercase tracking-tighter">
          Thank you!
        </h1>
        
        <p className="text-neutral-500 font-medium">
          Your order has been placed successfully and is being processed.
        </p>

        {orderId && (
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mt-4">
            <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Order Number</p>
            <p className="font-mono text-black font-semibold text-sm">{orderId}</p>
          </div>
        )}

        <div className="pt-8">
          <Link 
            to="/" 
            className="inline-block px-10 py-4 bg-black text-white rounded font-extrabold text-[13px] tracking-wider uppercase hover:bg-neutral-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
