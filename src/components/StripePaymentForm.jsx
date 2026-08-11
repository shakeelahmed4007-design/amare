import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { orderService } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

export default function StripePaymentForm({ total, shippingDetails }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsProcessing(false);
      return;
    }

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required' // We will handle redirect manually so we can create the order
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        // Create order
        const order = await orderService.createOrder(cartItems, total, shippingDetails, 'stripe');
        
        // Clear cart
        clearCart();
        
        // Redirect to success
        navigate(`/order-confirmation?order_id=${order.id}`);
      } catch (err) {
        setErrorMessage('Payment succeeded, but failed to create order. Please contact support.');
        setIsProcessing(false);
      }
    } else {
      setErrorMessage('Unexpected state. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
          {errorMessage}
        </div>
      )}

      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full px-10 py-4 bg-black text-white rounded font-extrabold text-[13px] tracking-wider uppercase hover:bg-neutral-800 transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center"
      >
        {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
}
