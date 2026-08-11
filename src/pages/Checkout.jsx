import React, { useState } from 'react';
import { ChevronRight, ShieldCheck, ChevronDown, Check, Upload, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StripeCheckout from '../components/StripeCheckout';
import PayPalPaymentForm from '../components/PayPalPaymentForm';

export default function Checkout({ cartItems = [] }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [paymentProofUrl, setPaymentProofUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 35 ? 0 : 5.95;
  const total = subtotal + shipping;

  const uploadToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET is missing in .env");
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', uploadPreset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: data
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
    }

    const json = await res.json();
    return json.secure_url;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    setUploadError('');
    
    try {
      const url = await uploadToCloudinary(file);
      setPaymentProofUrl(url);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleManualPaymentSubmit = async (e) => {
    e.preventDefault();
    if (!paymentProofUrl) {
      setUploadError('Please upload a payment screenshot before placing your order.');
      return;
    }

    try {
      const { orderService } = await import('../services/orderService');
      const methodMap = {
        bank_transfer: 'Bank Transfer',
        easypaisa: 'EasyPaisa',
        jazzcash: 'JazzCash'
      };
      
      const order = await orderService.createOrder(
        cartItems,
        total,
        {}, // shippingDetails (would normally come from step 1 state)
        methodMap[selectedPayment],
        paymentProofUrl
      );
      
      // Navigate to order confirmation
      navigate('/order-confirmation', { state: { orderId: order.id } });
    } catch (err) {
      setUploadError('Failed to place order. Please try again.');
      console.error(err);
    }
  };

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
                  
                  {/* Express Checkout section removed */}

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
                                    {/* Unified Payment Options (Pill Buttons) */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    <label className={`flex-1 min-w-[100px] sm:min-w-[120px] cursor-pointer flex items-center justify-center py-3 px-4 rounded-full font-bold text-sm border-2 transition-colors ${selectedPayment === 'card' ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'}`}>
                      <input type="radio" name="payment_method" checked={selectedPayment === 'card'} onChange={() => setSelectedPayment('card')} className="sr-only" />
                      Card
                    </label>
                    
                    <label className={`flex-1 min-w-[100px] sm:min-w-[120px] cursor-pointer flex items-center justify-center py-3 px-4 rounded-full font-black italic tracking-wide text-sm border-2 transition-colors ${selectedPayment === 'paypal' ? 'bg-[#FFC439] text-[#003087] border-[#FFC439]' : 'bg-white border-neutral-200 text-[#003087] hover:border-[#FFC439]'}`}>
                      <input type="radio" name="payment_method" checked={selectedPayment === 'paypal'} onChange={() => setSelectedPayment('paypal')} className="sr-only" />
                      PayPal
                    </label>

                    <label className={`flex-1 min-w-[100px] sm:min-w-[120px] cursor-pointer flex items-center justify-center py-3 px-4 rounded-full font-bold text-sm border-2 transition-colors ${selectedPayment === 'bank_transfer' ? 'bg-black text-white border-black' : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'}`}>
                      <input type="radio" name="payment_method" checked={selectedPayment === 'bank_transfer'} onChange={() => setSelectedPayment('bank_transfer')} className="sr-only" />
                      Bank Transfer
                    </label>

                    <label className={`flex-1 min-w-[100px] sm:min-w-[120px] cursor-pointer flex items-center justify-center py-3 px-4 rounded-full font-bold text-sm border-2 transition-colors ${selectedPayment === 'easypaisa' ? 'bg-[#40b15a] text-white border-[#40b15a]' : 'bg-white border-neutral-200 text-[#40b15a] hover:border-[#40b15a]'}`}>
                      <input type="radio" name="payment_method" checked={selectedPayment === 'easypaisa'} onChange={() => setSelectedPayment('easypaisa')} className="sr-only" />
                      EasyPaisa
                    </label>

                    <label className={`flex-1 min-w-[100px] sm:min-w-[120px] cursor-pointer flex items-center justify-center py-3 px-4 rounded-full font-bold text-sm border-2 transition-colors ${selectedPayment === 'jazzcash' ? 'bg-[#c52127] text-white border-[#c52127]' : 'bg-white border-neutral-200 text-[#c52127] hover:border-[#c52127]'}`}>
                      <input type="radio" name="payment_method" checked={selectedPayment === 'jazzcash'} onChange={() => setSelectedPayment('jazzcash')} className="sr-only" />
                      JazzCash
                    </label>
                  </div>

                  {/* Payment Content */}
                  <div className="mb-6 animate-in fade-in duration-300">
                    {selectedPayment === 'card' && (
                      <StripeCheckout total={total} shippingDetails={{}} />
                    )}
                    
                    {selectedPayment === 'paypal' && (
                       <PayPalPaymentForm total={total} shippingDetails={{}} />
                    )}

                    {['bank_transfer', 'easypaisa', 'jazzcash'].includes(selectedPayment) && (
                      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <div className="px-5 py-5">
                          <div className="text-[13px] text-neutral-600 space-y-1.5 mb-5 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                            {selectedPayment === 'bank_transfer' && (
                              <>
                                <p><span className="text-neutral-400 w-24 inline-block">Bank Name:</span> <span className="font-bold text-black">[Your Bank]</span></p>
                                <p><span className="text-neutral-400 w-24 inline-block">Account Title:</span> <span className="font-bold text-black">[Your Business Name]</span></p>
                                <p><span className="text-neutral-400 w-24 inline-block">Account No:</span> <span className="font-bold text-black">[0000000000000]</span></p>
                              </>
                            )}
                            {(selectedPayment === 'easypaisa' || selectedPayment === 'jazzcash') && (
                              <p><span className="text-neutral-400 w-28 inline-block">Account No:</span> <span className="font-bold text-black">[03XXXXXXXXX]</span></p>
                            )}
                            <p className="mt-3 text-[12px] text-neutral-500 italic">Please send total amount and upload screenshot below.</p>
                          </div>
                          
                          <div className="border-2 border-dashed border-neutral-300 rounded-lg p-5 text-center relative bg-white mb-5 hover:border-neutral-400 transition-colors">
                            {isUploading ? (
                              <span className="text-xs font-bold text-neutral-500">Uploading...</span>
                            ) : paymentProofUrl ? (
                              <div className="flex flex-col items-center gap-2">
                                <span className="text-xs font-bold text-green-600">Screenshot uploaded!</span>
                                <button type="button" onClick={() => setPaymentProofUrl('')} className="text-[11px] text-neutral-500 underline">Remove & upload different</button>
                              </div>
                            ) : (
                              <>
                                <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                <span className="text-xs font-bold text-neutral-600 flex items-center justify-center gap-2">
                                  <Upload className="w-4 h-4 text-neutral-400" /> Tap to upload screenshot
                                </span>
                              </>
                            )}
                          </div>
                          {uploadError && <p className="text-red-500 text-xs font-bold mb-4 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5"/> {uploadError}</p>}
                          
                          <button 
                            type="button" 
                            onClick={handleManualPaymentSubmit}
                            disabled={isUploading}
                            className="w-full px-4 py-4 bg-black text-white rounded-lg font-extrabold text-[13px] tracking-wider uppercase hover:bg-neutral-800 transition-colors disabled:opacity-50"
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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
