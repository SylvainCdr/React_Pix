import React, { useEffect, useState } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import AdminUserForm from "../../../Components/AdminUserForm/AdminUserForm";





export default function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then((response) => response.json())
            .then((data) => setUsers(data.reverse()));
    }
    , []);

    const EditUser = (id) => {
        if (!id) {
            console.error("ID is undefined or null");
            return;
        }
        window.location.href = `/admin/edit-user/${id}`;
    };



       

    return (
        <div className="admin-users">

        <h1>ADMINISTRATION</h1>
        <h2>Utilisateurs</h2>

{selectedUser ? (
    <AdminUserForm
    userToEdit={selectedUser}
    onSubmit={() => {
        setSelectedUser(null);
    }
    }
    /> ) : (
        <table>
            <thead>
                <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Entreprise</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Remise</th>
                    <th>Création <br />compte</th>
                    <th>Modification <br />compte</th>
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
                        <td>{user.role}</td>
                        <td>{user.discount} %</td>
                    
                        <td>{new Date(user.created).toLocaleDateString()}</td>
                        
                        {/* // Ajout de la date de modification si elle est différente de la date de création, sinon on affiche un tiret */}
                        <td>{user.updated !== user.created ? new Date(user.updated).toLocaleDateString() : '-'}</td>


                      
                       


                      <NavLink to={`/admin/edit-user/${user._id}`}><button class="btn btn-primary" >Modifier</button></NavLink>

                        <td>
                            <button class="btn btn-danger" >Supprimer</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}
        </div>
    );
    }
