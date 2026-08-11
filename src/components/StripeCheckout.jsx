import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';
import { supabase } from '../supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'test');

export default function StripeCheckout({ total, shippingDetails }) {
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const fetchPaymentIntent = async () => {
      try {
        const { data, error: functionError } = await supabase.functions.invoke('create-payment-intent', {
          body: { amount: Math.round(total * 100), currency: 'usd' }
        });

        if (functionError) throw functionError;
        if (data?.error) throw new Error(data.error);

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error fetching client secret:', err);
        setError('Failed to initialize payment gateway.');
      }
    };

    fetchPaymentIntent();
  }, [total]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#000000',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (error) {
    return <div className="text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="StripeCheckout">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <StripePaymentForm total={total} shippingDetails={shippingDetails} />
        </Elements>
      ) : (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        </div>
      )}
    </div>
  );
}
