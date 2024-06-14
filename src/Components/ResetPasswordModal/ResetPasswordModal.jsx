import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "./style.module.scss";
import { BASE_URL } from "../../url";

const PasswordResetModal = ({ show, onClose, onResetPassword, checkEmail }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    // Expression régulière pour valider le format de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/check-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Erreur lors de la vérification de l'e-mail");
    }
  };

  const handleReset = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Champ vide",
        text: "Veuillez saisir votre adresse e-mail.",
      });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Format d'e-mail invalide",
        text: "Veuillez saisir une adresse e-mail valide.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await checkEmailExists(email);
      if (response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Utilisateur non trouvé",
          text: "Aucun compte n'est associé à cet e-mail.",
        });
        return;
      }
      await onResetPassword(email);
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Un e-mail de réinitialisation de mot de passe a été envoyé.",
      });
      setEmail(""); // Efface l'e-mail après l'envoi réussi
      onClose(); // Ferme le modal après l'envoi réussi
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Une erreur est survenue lors de l'envoi de la demande de réinitialisation.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${styles["resetPasswordModal"]} ${show ? styles["show"] : ""}`}
    >
      <div className={styles["modal-content"]}>
        <span className={styles["close"]} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles["modal-title"]}>
          Réinitialisation du mot de passe
        </h2>
        <p className={styles["modal-text"]}>
          Veuillez saisir votre e-mail pour réinitialiser votre mot de passe :
        </p>
        <input
          className={styles["email-input"]}
          type="email"
          placeholder="Entrez votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={styles["btn-send"]}
          onClick={handleReset}
          disabled={isLoading}
        >
          {isLoading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
};

export default PasswordResetModal;
