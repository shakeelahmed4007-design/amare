import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from '../components/StripeCheckout';
import PayPalPaymentForm from '../components/PayPalPaymentForm';

export default function Checkout({ cartItems = [] }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 35 ? 0 : 5.95;
  const total = subtotal + shipping;

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else navigate('/'); // Simple mock finish
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="flex flex-col-reverse lg:flex-row min-h-screen">
        
        {/* Left Panel: Forms */}
        <div className="flex-1 lg:w-[55%] xl:w-[60%] lg:border-r border-neutral-200">
          <div className="max-w-2xl mx-auto px-6 py-10 lg:py-16">
            
            {/* Logo / Header (mocked) */}
            <div className="mb-8">
              <Link to="/" className="text-3xl font-black italic tracking-tighter">
                Amaré
              </Link>
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-8 tracking-wide">
              <Link to="/cart" className="hover:text-black transition-colors">Cart</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className={`cursor-pointer ${step === 1 ? 'text-black font-bold' : 'hover:text-black'}`} onClick={() => setStep(1)}>Information</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className={`cursor-pointer ${step === 2 ? 'text-black font-bold' : ''}`}>Payment</span>
            </div>

            <form onSubmit={handleNext}>
              {step === 1 && (
                <div className="animate-in fade-in duration-500">
                  
                  {/* Express Checkout */}
                  <div className="mb-10 text-center">
                    <p className="text-[11px] text-neutral-500 mb-3 tracking-wider uppercase font-semibold">Express checkout</p>
                    <div className="flex gap-3 justify-center">
                      <div className="w-full max-w-sm mx-auto">
                        <PayPalPaymentForm total={total} shippingDetails={{}} />
                      </div>
                    </div>
                  </div>

                  <div className="relative flex py-5 items-center mb-6">
                    <div className="flex-grow border-t border-neutral-200"></div>
                    <span className="flex-shrink-0 mx-4 text-neutral-500 text-[11px] uppercase tracking-widest font-semibold">OR</span>
                    <div className="flex-grow border-t border-neutral-200"></div>
                  </div>

                  {/* Contact */}
                  <div className="mb-8">
                    <div className="flex justify-between items-baseline mb-4">
                      <h2 className="text-[20px] font-extrabold text-black">Contact Information</h2>
                      <span className="text-[13px] text-neutral-600">
                        Already have an account? <Link to="/login" className="text-black underline font-bold">Log in</Link>
                      </span>
                    </div>
                    <input 
                      required 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm mb-3 placeholder:text-neutral-500" 
                    />
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-5 h-5 rounded border border-neutral-300 flex items-center justify-center bg-white checked-state">
                        {/* Mock active check for styling */}
                        <Check className="w-3.5 h-3.5 text-white opacity-0" />
                      </div>
                      <span className="text-sm text-neutral-700">Email me with news and offers</span>
                    </label>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h2 className="text-[20px] font-extrabold text-black mb-4">Shipping Address</h2>
                    <div className="space-y-3">
                      <div className="relative">
                        <select className="w-full p-3.5 border border-neutral-300 rounded appearance-none focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <input required type="text" placeholder="First Name" className="w-full p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm placeholder:text-neutral-500" />
                        <input required type="text" placeholder="Last Name" className="w-full p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm placeholder:text-neutral-500" />
                      </div>
                      
                      <input required type="text" placeholder="Address" className="w-full p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm placeholder:text-neutral-500" />
                      <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm placeholder:text-neutral-500" />
                      
                      <div className="grid grid-cols-3 gap-3">
                        <input required type="text" placeholder="City" className="w-full p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm placeholder:text-neutral-500" />
                        <div className="relative">
                          <select required className="w-full p-3.5 border border-neutral-300 rounded appearance-none focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm text-neutral-500">
                            <option value="">State</option>
                            <option value="NY">New York</option>
                            <option value="CA">California</option>
                            <option value="TX">Texas</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                        </div>
                        <input required type="text" placeholder="ZIP Code" className="w-full p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm placeholder:text-neutral-500" />
                      </div>
                      
                      <input required type="tel" placeholder="Phone" className="w-full p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm placeholder:text-neutral-500 mt-1" />
                    </div>
                  </div>

                  <div className="pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <Link to="/cart" className="text-[13px] text-neutral-600 hover:text-black flex items-center gap-1">
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Return to cart
                    </Link>
                    <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded font-extrabold text-[13px] tracking-wider uppercase hover:bg-neutral-800 transition-colors">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in duration-500">
                  {/* Summary Box */}
                  <div className="border border-neutral-200 rounded-lg p-4 text-[13px] mb-8 bg-neutral-50/50">
                    <div className="flex justify-between border-b border-neutral-200 pb-3 mb-3">
                      <div className="flex items-start gap-6">
                        <span className="text-neutral-500 w-16">Contact</span>
                        <span className="font-medium text-black">user@example.com</span>
                      </div>
                      <span className="text-xs text-neutral-500 underline cursor-pointer hover:text-black" onClick={() => setStep(1)}>Change</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-start gap-6">
                        <span className="text-neutral-500 w-16">Ship to</span>
                        <span className="font-medium text-black">123 Beauty Lane, New York, NY 10001</span>
                      </div>
                      <span className="text-xs text-neutral-500 underline cursor-pointer hover:text-black" onClick={() => setStep(1)}>Change</span>
                    </div>
                  </div>

                  <h2 className="text-[20px] font-extrabold text-black mb-1">Payment</h2>
                  <p className="text-xs text-neutral-500 mb-6">All transactions are secure and encrypted.</p>
                  
                  <StripeCheckout total={total} shippingDetails={{}} />

                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <span className="text-[13px] text-neutral-600 hover:text-black flex items-center gap-1 cursor-pointer" onClick={() => setStep(1)}>
                      <ChevronRight className="w-3.5 h-3.5 rotate-180" /> Return to shipping
                    </span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Panel: Order Summary */}
        <div className="flex-1 lg:w-[45%] xl:w-[40%] bg-neutral-50/80 border-t lg:border-t-0 border-neutral-200">
          <div className="max-w-md mx-auto lg:ml-0 lg:mr-auto px-6 py-10 lg:py-16 sticky top-0">
            
            {/* Cart Items List */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="relative">
                    <div className="w-16 h-16 border border-neutral-200 rounded-lg bg-white overflow-hidden flex items-center justify-center">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-neutral-500 text-white text-[11px] font-bold flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[13px] text-black leading-snug">{item.title}</h4>
                    {item.shades && <p className="text-[11px] text-neutral-500 mt-0.5">{item.shades[0]}</p>}
                  </div>
                  <span className="text-[14px] font-medium text-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
              {cartItems.length === 0 && (
                <div className="text-sm text-neutral-500 py-4 text-center border-2 border-dashed border-neutral-200 rounded-lg">
                  Your cart is empty.
                </div>
              )}
            </div>

            {/* Promo Code */}
            <div className="flex gap-3 mb-6 pt-6 border-t border-neutral-200">
              <input type="text" placeholder="Gift card or discount code" className="flex-1 p-3.5 border border-neutral-300 rounded focus:border-black focus:ring-1 focus:ring-black outline-none bg-white transition-all text-sm placeholder:text-neutral-500" />
              <button className="px-6 bg-neutral-200 text-neutral-500 rounded font-bold text-sm transition-colors cursor-not-allowed">
                Apply
              </button>
            </div>
            
            {/* Totals */}
            <div className="space-y-3 text-[14px] text-neutral-600 mb-6 pt-6 border-t border-neutral-200">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="font-medium text-black">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-6 border-t border-neutral-200">
              <span className="text-[16px] font-medium text-black">Total</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-neutral-500 font-medium tracking-wide">USD</span>
                <span className="text-[24px] font-black text-black">${total.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
