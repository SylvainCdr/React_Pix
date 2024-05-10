import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Aos from "aos";
import "./style.scss";

export default function ResetPassword() {
    const { token } = useParams(); // Extrait le jeton JWT de l'URL
    const [userEmail, setUserEmail] = useState(""); // État pour stocker l'e-mail de l'utilisateur

    useEffect(() => {
        // Récupérer l'e-mail de l'utilisateur à partir du backend
        fetch(`/reset-password/${token}`)
            .then(response => response.json())
            .then(data => {
                console.log('Données reçues du backend :', data); // Ajout d'une déclaration console pour afficher les données reçues
                setUserEmail(data.userEmail);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de l\'e-mail de l\'utilisateur :', error);
                // Gérer l'erreur de récupération de l'e-mail de l'utilisateur
            });

        Aos.init({ duration: 2000 });
    }, []);

    // Fonction pour réinitialiser le mot de passe
    const handleResetPassword = async (e) => {
        e.preventDefault();
    
        const newPassword = e.target.elements.password.value;
        const confirmPassword = e.target.elements.confirmPassword.value;
    
        // Valider que les mots de passe correspondent
        if (newPassword !== confirmPassword) {
            // Afficher un message d'erreur si les mots de passe ne correspondent pas
            console.log("Les mots de passe ne correspondent pas");
            return;
        }
    
        try {
            // Envoi de la requête au backend pour réinitialiser le mot de passe
            const response = await fetch("http://localhost:3001/set-new-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    newPassword: newPassword,
                }),
            });

            // alert success
            alert("Mot de passe réinitialisé avec succès");
            
    
            if (!response.ok) {
                // Gérer les cas où la réinitialisation du mot de passe échoue
                console.log("La réinitialisation du mot de passe a échoué");
                return;
            }
    
            // Réinitialisation réussie, rediriger l'utilisateur vers une page de confirmation ou une autre page appropriée
            console.log("Mot de passe réinitialisé avec succès");
        } catch (error) {
            console.error("Erreur lors de la réinitialisation du mot de passe :", error);
        }
    };
    
    return (
        <div className="resetPassword-container">
            <div data-aos="fade-right" className="section-1">
                <img src="./../../assets/logo-dark.svg" alt="" />
            </div>
            <div data-aos="fade-left" className="section-2">
                <h1>   Réinitialisation <br />du mot de passe </h1>
          
                <p>Vous réinitialisez le mot de passe pour : {userEmail}</p>
                <form onSubmit={handleResetPassword}>
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input type="password" name="password" id="password" />
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" />
                    <button type="submit">Réinitialiser le mot de passe</button>
                </form>
            </div>
        </div>
    );
}
