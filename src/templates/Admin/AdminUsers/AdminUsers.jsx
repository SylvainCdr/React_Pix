import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AdminUserForm from "@/Components/AdminUserForm/AdminUserForm";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data.reverse()));
  }, []);

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
        fetch(`${BASE_URL}/users/${id}`, {
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
    <div className={styles["admin-users"]}>
      <h1>
        ADMINISTRATION -<span> Utilisateurs </span>
      </h1>

      {selectedUser ? (
        <AdminUserForm
          userToEdit={selectedUser}
          onSubmit={() => {
            setSelectedUser(null);
          }}
        />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Entreprise</th>
              <th>Email</th>
              <th>
                Rôle <br />
                (user / admin)
              </th>
              <th>Remise</th>
              <th>
                Création <br />
                compte
              </th>
              <th>
                Modification <br />
                compte
              </th>
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
                <td>
                  {user.updated !== user.created
                    ? new Date(user.updated).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <Link href={`/admin/utilisateurs/modification/${user._id}`}>
                    <button className={styles["modify-btn"]}>Modifier</button>
                  </Link>
                </td>
                <td>
                  <button
                    className={styles["delete-btn"]}
                    onClick={() => deleteUser(user._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
