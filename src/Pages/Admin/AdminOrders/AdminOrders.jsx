import React, { useState, useEffect } from "react";
import "./style.scss";
import AdminOrderModal from "../AdminOrderModal/AdminOrderModal";

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
    const [selectedOrderId, setSelectedOrderId] = useState(null);


    useEffect(() => {
        fetch("http://localhost:3001/allOrders")
            .then((response) => response.json())
            .then((data) => setOrders(data));
    }, []);

    useEffect(() => {
        const userIds = orders.map(order => order.user);
        userIds.forEach(userId => {
            fetch(`http://localhost:3001/users/${userId}`)
                .then((response) => response.json())
                .then((userData) => {
                    setUsers(prevUsers => ({
                        ...prevUsers,
                        [userId]: userData
                    }));
                });
        });
    }, [orders]);

    // Au clic sur "Détails", on met à jour l'ID de la commande sélectionnée
    const handleDetails = (orderId) => {
        setSelectedOrderId(orderId);
    }

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
                            <td> {users[order.user]?.company} ({users[order.user]?.lastName} {users[order.user]?.firstName}) </td>
                            <td>{order.totalAmount.toFixed(2)} €</td>
                            <td>{order.status}</td>
                            <td>
                                {/* Au clic sur "Détails", on appelle la fonction handleDetails avec l'ID de la commande */}
                                <button onClick={() => handleDetails(order._id)}>Détails</button>
                                <button>Modifier</button>
                                <button>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Le modal s'affiche seulement si selectedOrderId est défini */}
            {selectedOrderId && (
                <AdminOrderModal 
                   order={orders.find(order => order._id === selectedOrderId)}
                     user={users[selectedOrderId]}
                     onClose={() => setSelectedOrderId(null)}
                     
                />
            )}
        </div>
    );
}
