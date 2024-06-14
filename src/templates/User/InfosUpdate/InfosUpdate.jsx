import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

export default function InfosUpdate() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    billingAddress: {
      street: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    fetch(`${BASE_URL}/users/${userId}`)
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

  const validateForm = () => {
    const newErrors = {};

    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{1,30}$/;
    const companyPattern = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]{0,30}$/; // Company can be empty
    const zipPattern = /^[0-9]{0,6}$/; // Zip code can be empty
    const addressPattern = /^.{0,60}$/; // Address can be empty
    const phonePattern = /^[0-9+]{0,20}$/; // Phone can be empty

    if (!user.firstName.trim() || !namePattern.test(user.firstName)) {
      newErrors.firstName =
        "Le prénom doit comporter uniquement des lettres (max 30 caractères)";
    }
    // Valider le nom
    if (!user.lastName.trim() || !namePattern.test(user.lastName)) {
      newErrors.lastName =
        "Le nom doit comporter uniquement des lettres (max 30 caractères)";
    }
    // Valider l'entreprise
    if (!companyPattern.test(user.company)) {
      newErrors.company =
        "L'entreprise doit comporter des lettres et/ou des chiffres (max 30 caractères)";
    }
    // Valider le code postal
    if (!zipPattern.test(user.billingAddress.zip)) {
      newErrors.zip =
        "Le code postal doit comporter uniquement des chiffres (max 6 caractères)";
    }
    // Valider l'adresse
    if (!addressPattern.test(user.billingAddress.street)) {
      newErrors.street = "L'adresse ne doit pas dépasser 60 caractères";
    }
    // Valider la ville si elle n'est pas vide
    if (
      user.billingAddress.city &&
      !namePattern.test(user.billingAddress.city)
    ) {
      newErrors.city =
        "La ville doit comporter uniquement des lettres (max 30 caractères)";
    }
    // Valider le pays si il n'est pas vide
    if (
      user.billingAddress.country &&
      !namePattern.test(user.billingAddress.country)
    ) {
      newErrors.country =
        "Le pays doit comporter uniquement des lettres (max 30 caractères)";
    }
    // Valider le téléphone
    if (!phonePattern.test(user.phone)) {
      newErrors.phone =
        "Le téléphone doit comporter des chiffres et/ou le symbole + (max 20 caractères)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch(`${BASE_URL}/users/${user._id}`, {
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
    <div className={styles["infosUpdate-container"]}>
      <h1>Modifier mes informations</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["update-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName}</span>
            )}

            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName}</span>
            )}

            <label htmlFor="company">Entreprise</label>
            <input
              type="text"
              id="company"
              name="company"
              value={user.company}
              onChange={handleChange}
            />
            {errors.company && (
              <span className={styles.error}>{errors.company}</span>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly
            />

            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="street">Adresse</label>
            <input
              type="text"
              id="street"
              name="street"
              value={user.billingAddress?.street}
              onChange={handleAddressChange}
            />
            {errors.street && (
              <span className={styles.error}>{errors.street}</span>
            )}

            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              name="city"
              value={user.billingAddress?.city}
              onChange={handleAddressChange}
            />
            {errors.city && <span className={styles.error}>{errors.city}</span>}

            <label htmlFor="zip">Code postal</label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={user.billingAddress?.zip}
              onChange={handleAddressChange}
            />
            {errors.zip && <span className={styles.error}>{errors.zip}</span>}

            <label htmlFor="country">Pays</label>
            <input
              type="text"
              id="country"
              name="country"
              value={user.billingAddress?.country}
              onChange={handleAddressChange}
            />
            {errors.country && (
              <span className={styles.error}>{errors.country}</span>
            )}
          </div>
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
}
