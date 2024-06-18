// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { BASE_URL } from "@/url";
// import styles from "./style.module.scss";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// const PaymentForm = ({ totalAmount, clientSecret, onPaymentSuccess }) => {
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [cardholderName, setCardholderName] = useState("");

//   const stripe = useStripe();
//   const elements = useElements();

//   const handleChange = async (event) => {
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);

//     if (!stripe || !elements || !clientSecret) {
//       return;
//     }

//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: cardholderName,
//         },
//       },
//     });

//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);

//       onPaymentSuccess(); // Appelle la fonction de succès de paiement
//     }
//   };

//   return (
//     <form
//       id="payment-form"
//       onSubmit={handleSubmit}
//       className={styles.paymentContainer}
//     >
//       <input
//         type="text"
//         id="cardholder-name"
//         placeholder="Nom sur la carte"
//         value={cardholderName}
//         onChange={(e) => setCardholderName(e.target.value)}
//         className={styles.input}
//         required
//       />
//       <CardElement 
//         id="card-element" 
//         onChange={handleChange} 
//         options={{
//           style: {
//             base: {
//               color: "#30313d",
//               fontFamily: 'Ideal Sans, system-ui, sans-serif',
//               fontSmoothing: "antialiased",
//               fontSize: "16px",
//               "::placeholder": {
//                 color: "#aab7c4"
//               }
//             },
//             invalid: {
//               color: "#df1b41",
//               iconColor: "#df1b41"
//             }
//           },
//           hidePostalCode: true // Option to hide the postal code field
//         }} 
//       />
//       <button disabled={processing || disabled || succeeded} id="submit" className={styles.submitButton}>
//         <span id="button-text">
//           {processing ? (
//             <div className={styles.spinner} id="spinner"></div>
//           ) : (
//             `Payer ${totalAmount.toFixed(2)}€`
//           )}
//         </span>
//       </button>
//       {error && (
//         <div className={styles.cardError} role="alert">
//           {error}
//         </div>
//       )}
//       {succeeded && <p className={styles.resultMessage}>Payment succeeded</p>}
//       <p>Use the following test card number for testing:</p>
//       <ul>
//         <li>Card Number: 4242 4242 4242 4242</li>
//         <li>Expiration Date: Any future date</li>
//         <li>CVC: Any 3 digits</li>
//         <li>ZIP: Any valid ZIP code</li>
//       </ul>
//     </form>
//   );
// };

// const StripeWrapper = ({ totalAmount, onPaymentSuccess }) => {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     const userId = JSON.parse(localStorage.getItem("user"))._id;
//     fetch(`${BASE_URL}/create-payment-intent`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId,
//         amount: Math.round(totalAmount * 100),
//         currency: "eur",
//       }), // Multiplie par 100 pour convertir en centimes
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Client Secret:", data.clientSecret);
//         setClientSecret(data.clientSecret);
//       })
//       .catch((error) => console.error("Error:", error));
//   }, [totalAmount]);

//   const appearance = {
//     theme: 'stripe',
//     variables: {
//       colorPrimary: '#0570de',
//       colorBackground: '#ffffff',
//       colorText: '#30313d',
//       colorDanger: '#df1b41',
//       fontFamily: 'Ideal Sans, system-ui, sans-serif',
//       spacingUnit: '2px',
//       borderRadius: '4px',
//     },
//     rules: {
//       '.Label': {
//         color: '#30313d',
//       },
//     },
//   };

//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     clientSecret && (
//       <Elements stripe={stripePromise} options={options}>
//         <PaymentForm
//           totalAmount={totalAmount}
//           clientSecret={clientSecret}
//           onPaymentSuccess={onPaymentSuccess}
//         />
//       </Elements>
//     )
//   );
// };

// export default StripeWrapper;
