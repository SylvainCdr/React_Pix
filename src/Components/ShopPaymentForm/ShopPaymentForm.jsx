import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BASE_URL } from "../../url";
import Swal from "sweetalert2";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ totalAmount, onPaymentSuccess }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    fetch(`${BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, amount: Math.round(totalAmount * 100), currency: "eur" }), // Multiplie par 100 pour convertir en centimes
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Client Secret:", data.clientSecret);
        setClientSecret(data.clientSecret);
      })
      .catch((error) => console.error("Error:", error));
  }, [totalAmount]);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      Swal.fire({
        icon: "success",
        title: "Paiement réussi",
        text: "Votre paiement a été effectué avec succès. Vous allez recevoir un email de confirmation.",
        confirmButtonText: "OK",
      }).then(() => {
        onPaymentSuccess(); // Appelle la fonction de succès de paiement
      });
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="paymentContainer">
      <CardElement id="card-element" onChange={handleChange} />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            "Pay now"
          )}{" "}
          {totalAmount.toFixed(2)}€
        </span>
      </button>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {succeeded && <p className="result-message">Payment succeeded</p>}
      <p>Use the following test card number for testing:</p>
      <ul>
        <li>Card Number: 4242 4242 4242 4242</li>
        <li>Expiration Date: Any future date</li>
        <li>CVC: Any 3 digits</li>
        <li>ZIP: Any valid ZIP code</li>
      </ul>
    </form>
  );
};

const StripeWrapper = ({ totalAmount, onPaymentSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm totalAmount={totalAmount} onPaymentSuccess={onPaymentSuccess} />
    </Elements>
  );
};

export default StripeWrapper;
