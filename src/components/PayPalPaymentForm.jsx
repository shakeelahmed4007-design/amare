import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { orderService } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/StoreContext';

export default function PayPalPaymentForm({ total, shippingDetails }) {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useStore();
  const [errorMessage, setErrorMessage] = useState('');

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      if (details.status === 'COMPLETED') {
        // Create order in Supabase
        const order = await orderService.createOrder(cartItems, total, shippingDetails, 'paypal');
        
        // Clear cart
        clearCart();
        
        // Redirect to success
        navigate(`/order-confirmation?order_id=${order.id}`);
      }
    } catch (error) {
      console.error('PayPal Capture Error:', error);
      setErrorMessage('Payment failed. Please try again or contact support.');
    }
  };

  return (
    <div className="w-full">
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
          {errorMessage}
        </div>
      )}
      
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons 
          createOrder={createOrder}
          onApprove={onApprove}
          onError={() => setErrorMessage('PayPal encountered an error. Please try again.')}
          style={{ layout: "vertical", shape: "rect", color: "gold" }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
