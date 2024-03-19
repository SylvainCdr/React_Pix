import React, {useState, useEffect} from "react";
import style from "./style.scss";

export default function AdminOrders() {

// on récupère toutes les commandes de la base de données
// on les affiche dans un tableau
// on peut les trier par date, par nom, par montant
// on peut les filtrer par date

const [orders, setOrders] = useState([]);
const [filter, setFilter] = useState("all");
const [sort, setSort] = useState("date");

useEffect(() => {
    fetch("localhost:3001/orders")
        .then((response) => response.json())
        .then((data) => setOrders(data));
}, []);

return (

    <div class="admin-orders">
        <h1>COMMANDES</h1>

        <div class="admin-orders-filter">
            <label for="filter">Filtrer par date</label>
            <select name="filter" id="filter" onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Toutes</option>
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
            </select>
        </div>

        <table class="admin-orders-table">
            <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Montant</th>
                </tr>
            </thead>
            <tbody>
                {orders
                    .filter((order) => {
                        if (filter === "today") {
                            return order.date === new Date().toDateString();
                        }
                        if (filter === "week") {
                            return order.date >= new Date().setDate(new Date().getDate() - 7);
                        }
                        if (filter === "month") {
                            return order.date >= new Date().setMonth(new Date().getMonth() - 1);
                        }
                        return true;
                    })
                    .sort((a, b) => {
                        if (sort === "date") {
                            return new Date(b.date) - new Date(a.date);
                        }
                        if (sort === "name") {
                            return a.client.localeCompare(b.client);
                        }
                        if (sort === "amount") {
                            return b.amount - a.amount;
                        }
                    })
                    .map((order) => (
                        <tr>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.client}</td>
                            <td>{order.amount}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
);
}
