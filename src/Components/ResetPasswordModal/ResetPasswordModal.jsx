import React, { useState } from "react";
import Swal from "sweetalert2";
import "./style.scss";

const PasswordResetModal = ({ show, onClose, onResetPassword }) => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Champ vide",
        text: "Veuillez saisir votre adresse e-mail.",
      });
      return;
    }
    onResetPassword(email);
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
        <button className="btn-send" onClick={handleReset}>Envoyer</button>
      </div>
    </div>
  );
};

export default PasswordResetModal;
