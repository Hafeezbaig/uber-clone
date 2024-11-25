// components/Home/CheckoutForm.js
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!elements || !stripe) {
      setErrorMessage('Stripe or Elements not loaded yet.');
      return;
    }

    try {
      // Fetch the client_secret from the server
      const res = await fetch('/api/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const { client_secret } = await res.json();

      if (!client_secret) {
        throw new Error('Failed to fetch client_secret from the server.');
      }

      console.log('Client Secret:', client_secret);

      // Confirm the payment
      const { error } = await stripe.confirmPayment({
        clientSecret: client_secret,
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/',
        },
      });

      if (error) {
        console.error('Error confirming payment:', error.message);
        setErrorMessage(error.message);
      }
    } catch (error) {
      console.error('Payment submission error:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-6">
      <h2 className="m-5 font-bold">Amount to Pay: {amount}</h2>
      <form onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />
        <button
          className="w-full bg-black text-white p-2 rounded-lg mt-2"
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </form>
      {errorMessage && (
        <div className="text-red-500 mt-4">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;
