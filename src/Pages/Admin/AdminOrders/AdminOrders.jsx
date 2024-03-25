import React, { useState, useEffect } from "react";
import "./style.scss";


// const OrderSchema = new Schema({
//     // Création d'une référence à l'utilisateur qui a passé la commande
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true
//     },
//     // Création d'un objet pour stocker l'adresse de livraison
//     deliveryAddress: {
//       street: { type: String, required: true },
//       city: { type: String, required: true },
//       zip: { type: String, required: true },
//       country: { type: String, required: true },
//     },
//     // Création d'un objet pour stocker les produits commandés
//     items: [{
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//       name: { type: String, required: true },
//       ref : { type: String, required: true },
//       quantity: { type: Number, required: true },
//       priceAtOrderTime: { type: Number, required: true },
//     }],
//     delivery: {
//       method: { type: String, required: true, enum: ['standard', 'express'] },
//       fee: { type: Number, default: 0 },
//     },
//     // Création d'une date de commande
//     orderDate: {
//       type: Date,
//       default: Date.now

//     },
//     // Création d'un statut pour la commande
//     status: {
//       type: String,
//       enum: ['pending', 'shipped', 'delivered'],
//       default: 'pending'
//     },
//     payment: {
//       method: { type: String, required: true },
//       paid: { type: Boolean, default: false },
//     },
//     // Création d'un total pour la commande
//       totalAmount: { type: Number, required: true },
//   });

export default function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState({});
    const [orderDetails, setOrderDetails] = useState({});



    useEffect(() => {
        fetch("http://localhost:3001/allOrders")
            .then((response) => response.json())
            .then((data) => setOrders(data));
    }, []);

    useEffect(() => {
        // Récupérer les ID des utilisateurs de chaque commande
        const userIds = orders.map(order => order.user);

        // Pour chaque ID d'utilisateur, effectuer une requête pour récupérer les détails de l'utilisateur
        userIds.forEach(userId => {
            fetch(`http://localhost:3001/users/${userId}`)
                .then((response) => response.json())
                .then((userData) => {
                    // Stocker les détails de l'utilisateur dans un objet avec l'ID de l'utilisateur comme clé
                    setUsers(prevUsers => ({
                        ...prevUsers,
                        [userId]: userData
                    }));
                });
        });
    }, [orders]);

    // récupération des détails de la commmande 

    const handleOrderClick = (orderId) => {
        fetch(`http://localhost:3001/orders/${orderId}`)
            .then((response) => response.json())
            .then((data) => {
                setOrderDetails(data);
            });
    };


    return (
        <div className="admin-orders">
            <h1>Commandes</h1>
            <table>
                <thead>
                    <tr>
                        <th>Numéro de commande</th>
                        <th>Date</th>
                        <th>Client</th>
                        <th>Montant</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.orderDate && new Date(order.orderDate).toLocaleDateString()}</td>
                            {/* Afficher le nom de l'utilisateur en utilisant l'ID de l'utilisateur */}
                            <td> {users[order.user]?.company} ({users[order.user]?.lastName} {users[order.user]?.firstName}) </td>
                            <td>{order.totalAmount.toFixed(2)} €</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => handleOrderClick(order._id)}>Détails</button>
                                <button>Modifier</button>
                                <button>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
