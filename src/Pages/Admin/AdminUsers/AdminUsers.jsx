import React, { useEffect, useState } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import AdminUserForm from "../../../Components/AdminUserForm/AdminUserForm";
import Swal from "sweetalert2";





export default function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then((response) => response.json())
            .then((data) => setUsers(data.reverse()));
    }
    , []);

const deleteUser = (id) => {
    if (!id) {
        console.error("ID is undefined or null");
        return;
    }

    Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas récupérer cet utilisateur!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Annuler",
        confirmButtonText: "Oui",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:3001/users/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    setUsers((prevUsers) =>
                        prevUsers.filter((user) => user._id !== id)
                    );
                })
                .then(() => {
                    // Ajoute une alerte SweetAlert2 pour indiquer que la suppression a réussi
                    Swal.fire({
                        title: "Supprimé!",
                        text: "L'utilisateur a été supprimé avec succès.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                    });
                })
                .catch((error) =>
                    console.log("Erreur lors de la suppression :", error)
                );
        }
    });
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
                    <th>Rôle <br />(user / admin)</th>
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


                      
                       


                      <NavLink to={`/admin/utilisateurs/modification/${user._id}`}><button class="btn btn-primary" >Modifier</button></NavLink>

                        <td>
                            <button class="btn btn-danger" onClick={() => deleteUser(user._id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )}
        </div>
    );
    }
