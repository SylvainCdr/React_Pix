import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Aos from "aos";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extrait le jeton JWT de l'URL
  const [, setUserEmail] = useState(""); // État pour stocker l'e-mail de l'utilisateur
  const [, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Récupérer l'e-mail de l'utilisateur à partir du backend
    fetch(`/reset-password/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Données reçues du backend :", data);
        setUserEmail(data.userEmail);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de l'e-mail de l'utilisateur :",
          error
        );
      });

    Aos.init({ duration: 2000 });
  }, []);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      isValidPassword(value)
        ? ""
        : "Mot de passe invalide (au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)"
    );
  };

  // Fonction pour valider le format du mot de passe
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  // Fonction pour réinitialiser le mot de passe
  const handleResetPassword = async (e) => {
    e.preventDefault();

    const newPassword = e.target.elements.password.value;
    const confirmPassword = e.target.elements.confirmPassword.value;

    // Valider que les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      // Afficher un message d'erreur si les mots de passe ne correspondent pas
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Les mots de passe ne correspondent pas!",
      });
      return;
    }

    // Valider le format du mot de passe
    if (!isValidPassword(newPassword)) {
      // Afficher un message d'erreur si le format du mot de passe est incorrect
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial!",
      });
      return;
    }

    try {
      // Envoi de la requête au backend pour réinitialiser le mot de passe
      const response = await fetch(`${BASE_URL}/set-new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        // Gérer les cas où la réinitialisation du mot de passe échoue
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La réinitialisation du mot de passe a échoué!",
        });
        return;
      }

      // Réinitialisation réussie, afficher une alerte de succès
      Swal.fire({
        icon: "success",
        title: "Succès!",
        text: "Mot de passe réinitialisé avec succès!",
        showConfirmButton: false,
        timer: 3000,

        timerProgressBar: true,
      });
      // Rediriger l'utilisateur vers la page de connexion après 3 secondes
      setTimeout(() => {
        window.location.replace("/connexion");
      }, 3000);
    } catch (error) {
      console.error(
        "Erreur lors de la réinitialisation du mot de passe :",
        error
      );
    }
  };

  return (
    <div className={styles["resetPassword-container"]}>
      <div data-aos="fade-right" className={styles["section-1"]}>
        <img src="./../../assets/logo-dark.svg" alt="" />
      </div>
      <div data-aos="fade-left" className={styles["section-2"]}>
        <h1>
          Réinitialisation <br />
          du mot de passe
        </h1>
        <form onSubmit={handleResetPassword}>
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePasswordChange}
          />
          {passwordError && (
            <span className={styles["error-message"]}>{passwordError}</span>
          )}

          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input type="password" name="confirmPassword" id="confirmPassword" />
          <button type="submit"> Envoyer </button>
        </form>
      </div>
    </div>
  );
}
