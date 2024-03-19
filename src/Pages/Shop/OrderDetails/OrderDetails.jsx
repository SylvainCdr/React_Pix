import React, { useEffect, useState } from "react";
import "./style.scss";

export default function OrderDetails() {

   // Récupération de l'id de la commande dans l'url et on affiche tous les informations de la commande

// objet commande : 
// {
//     "deliveryAddress": {
//       "street": "8888",
//       "city": "8888",
//       "zip": "888",
//       "country": "suisse"
//     },
//     "delivery": {
//       "method": "standard",
//       "fee": 9.9
//     },
//     "payment": {
//       "method": "carte",
//       "paid": false
//     },
//     "_id": "65f84bbe680594c81da33abf",
//     "user": "65f83d27cdc04e9c3b2a557f",
//     "items": [
//       {
//         "product": "65f8486ce265ca8dcee1d5f2",
//         "name": "Module WiFi Extérieur ZYXEL NWA55AXE",
//         "ref": "NWA55AXE",
//         "quantity": 1,
//         "priceAtOrderTime": 109.9,
//         "_id": "65f84bbe680594c81da33ac0"
//       }
//     ],
//     "status": "pending",
//     "totalAmount": 141.78,
//     "orderDate": "2024-03-18T14:12:14.574Z",
//     "__v": 0
//   }

   const orderId = window.location.pathname.split("/").pop();
    console.log(orderId);

    const [order, setOrder] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const [delivery, setDelivery] = useState({});
    const [payment, setPayment] = useState({});
    const [items, setItems] = useState([]);
    const [user, setUser] = useState({});
    const [status, setStatus] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState({});
    const [deliveryMethod, setDeliveryMethod] = useState("");
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/orders/${orderId}`)
            .then((response) => response.json())
            .then((data) => {
                setOrder(data);
                setTotalAmount(data.totalAmount);
                setDelivery(data.delivery);
                setPayment(data.payment);
                setItems(data.items);
                setUser(data.user);
                setStatus(data.status);
                setOrderDate(data.orderDate);
                setDeliveryAddress(data.deliveryAddress);
                setDeliveryMethod(data.delivery.method);
                setDeliveryFee(data.delivery.fee);
                setPaymentMethod(data.payment.method);
                setPaid(data.payment.paid);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération de la commande :", error);
            });
    }, [orderId]);

    return (

        <div className="order-details-container">
            <h2>DETAILS DE COMMANDE </h2>
            <div className="order-details">
                <div className="order-details-header">
                    <h3>Commande N° {orderId}</h3>
                   
                    <p> Date de la commande : {new Date(orderDate).toLocaleDateString()}</p>
                    <p>Statut : {status}</p>
                </div>
                <div className="order-details-content">
                    <div className="order-details-delivery">
                        <h4>Livraison</h4>
                        <p>Méthode de livraison : {deliveryMethod}</p>
                        <p>Frais de livraison : {deliveryFee.toFixed(2)} €</p>
                        <p>Adresse de livraison : {deliveryAddress.street}, {deliveryAddress.zip} {deliveryAddress.city}, {deliveryAddress.country}</p>
                    </div>
                    <div className="order-details-payment">
                        <h4>Paiement</h4>
                        <p>Méthode de paiement : {paymentMethod}</p>
                        <p>Statut du paiement : {paid ? "Payé" : "Non payé"}</p>
                    </div>
                    <div className="order-details-items">
                        <h4>Produits</h4>
                        <ul>
                            {items.map((item) => (
                                <li key={item._id}>
                                    <p>{item.name} - {item.quantity} x {item.priceAtOrderTime.toFixed(2)} €</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-details-total">
                        <h4>Total</h4>
                        <p>Total de la commande : {totalAmount.toFixed(2)} €</p>
                    </div>
                </div>
            </div>
            </div>

    );

}