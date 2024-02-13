import React, { useEffect, useState } from "react";
import "./style.scss";



export default function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }
    , []);


       

    return (
        <div className="admin-users">

        <h1>ADMINISTRATION</h1>
        <h2>Utilisateurs</h2>

        <table>
            <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Entreprise</th>
                    <th>Email</th>
                    <th>Actions</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.company}</td>
                        <td>{user.email}</td>
                        <td>
                            <button class="btn btn-primary" >Modifier</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" >Supprimer</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        </div>
    );
    }
