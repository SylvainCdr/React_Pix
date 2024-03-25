import React, { useState, useEffect } from 'react';
import './style.scss';

export default function AdminOrderModal({ order, user, onClose }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/orders/${order._id}`)
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, [order]);

    return (
        <div className="admin-order-modal">
             <button className="close-button" onClick={onClose}>X</button>
        <h2>Commande n°{order._id}</h2>
        <h4>Date de commande : {new Date(order.orderDate).toLocaleDateString()}</h4>
        <h3>Statut de la commande : {order.status}</h3>
        <h3>Client : {user?.company} ({user?.lastName} {user?.firstName})</h3>
        <h4>Adresse de facturation : {user?.billingAddress.street}, {user?.billingAddress.zip} {user?.billingAddress.city}, {user?.billingAddress.country}</h4>
        <h4>Adresse de livraison : {order.deliveryAddress.street}, {order.deliveryAddress.zip} {order.deliveryAddress.city}, {order.deliveryAddress.country}</h4>

        <table>
            <thead>
                <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {order.items.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.priceAtOrderTime.toFixed(2)} €</td>
                        <td>{(item.priceAtOrderTime * item.quantity).toFixed(2)} €</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>Méthode de livraison : {order.delivery.method}</h3>
        <h3>Frais de livraison : {order.delivery.fee.toFixed(2)} €</h3>
        <h3>Méthode de paiement : {order.payment.method}</h3>
        <h3>Paiement : {order.payment.paid ? "Payé" : "En attente de paiement"}</h3>
        
        <p>Total de la commande : {order.totalAmount.toFixed(2)} €</p>

    </div>

    );
}
