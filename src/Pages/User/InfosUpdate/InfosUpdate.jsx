import React, { useState, useEffect } from "react";
import './style.scss';
import Swal from "sweetalert2";

export default function InfosUpdate() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "non renseigné",
    phone: "non renseigné",
    billingAddress: {
      street: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    fetch(`http://localhost:3001/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      billingAddress: {
        ...prevUser.billingAddress,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3001/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User updated:", data);

        Swal.fire({
          title: "Vos informations seront à jour à votre prochaine connexion",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/mon-compte";
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);

        Swal.fire({
          title: "Erreur lors de la mise à jour des informations",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div className="infosUpdate-container">
      <h1>Modifier mes informations</h1>
      <form onSubmit={handleSubmit}>
<div className="update-form">
        <div className="form-group">
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        
       
          <label htmlFor="lastName">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        
        
          <label htmlFor="company">Entreprise</label>
          <input
            type="text"
            id="company"
            name="company"
            value={user.company}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
     
       
      
          <label htmlFor="phone">Téléphone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Adresse</label>
          <input
            type="text"
            id="street"
            name="street"
            value={user.billingAddress.street}
            onChange={handleAddressChange}
          />
       
          <label htmlFor="city">Ville</label>
          <input
            type="text"
            id="city"
            name="city"
            value={user.billingAddress.city}
            onChange={handleAddressChange}
          />
       
          <label htmlFor="zip">Code postal</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={user.billingAddress.zip}
            onChange={handleAddressChange}
          />
       
          <label htmlFor="country">Pays</label>
          <input
            type="text"
            id="country"
            name="country"
            value={user.billingAddress.country}
            onChange={handleAddressChange}
          />
        
        </div>
      </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
