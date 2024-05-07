import React, { useState } from "react";
import Swal from "sweetalert2";
import "./style.scss";

const PasswordResetModal = ({ show, onClose, onResetPassword }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    // Expression régulière pour valider le format de l'e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
    <div className={`resetPasswordModal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-title">Réinitialisation du mot de passe</h2>
        <p>
          Veuillez saisir votre e-mail pour réinitialiser votre mot de passe :
        </p>
        <input
          type="email"
          placeholder="Entrez votre e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-send" onClick={handleReset} disabled={isLoading}>
          {isLoading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </div>
    </div>
  );
};

export default PasswordResetModal;
