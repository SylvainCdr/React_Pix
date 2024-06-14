import { useAppContext } from "../../appContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import styles from "./style.module.scss";
import Cookies from "js-cookie";
import Aos from "aos";
import PasswordResetModal from "@/Components/ResetPasswordModal/ResetPasswordModal";
import { BASE_URL } from "@/url";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setAuthenticated] = useState(false);

  // on récupère le setUser afin de mettre à jour le contexte
  const { setUser } = useAppContext();

  useEffect(() => {
    // Vérifier l'authentification lors du chargement de la page
    checkAuth();
  }, []);

  // Fonction pour vérifier si l'utilisateur est connecté
  const checkAuth = async () => {
    try {
      // On envoie une requête au serveur pour vérifier si l'utilisateur est connecté
      const response = await fetch(`${BASE_URL}check-auth`, {
        method: "GET",
        headers: {
          // On envoie le token stocké dans les cookies
          Authorization: "Bearer " + Cookies.get("token"),
        },
      });
      const data = await response.json();
      if (response.status === 401) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
      setAuthenticated(false);
    }
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi des données de connexion au serveur
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      // Récupération de la réponse du serveur
      const data = await response.json();
      if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email ou mot de passe incorrect",
        });
      } else {
        // Stockage du token dans les cookies
        Cookies.set("token", data.token);
        setUser(data.user);
        router.push("/boutique");
        Swal.fire({
          icon: "success",
          title: "Connecté",
          text: "Bienvenue sur Pixecurity !",
          showConfirmButton: false,
          timer: 2000,
        });
        setAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur serveur",
      });
    }
  };

  const [showModal, setShowModal] = useState(false);
  console.log(showModal);

  const handleResetPassword = async (clientEmail) => {
    try {
      const response = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientEmail }),
      });
      console.log(showModal);
      // const data = await response.json();
      if (response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Aucun compte n'est associé à cet e-mail.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Un e-mail de réinitialisation de mot de passe a été envoyé.",
          showConfirmButton: false,
          timer: 2000,
        });
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erreur serveur",
      });
    }
  };

  //aos
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className={styles["login-container"]}>
      <div data-aos="fade-right" className={styles["section-1"]}></div>
      <div data-aos="fade-left" className={styles["section-2"]}>
        <h1>Connexion</h1>
        {/* J'écoute l'événement onSubmit qui s'exécute quand on soumet le formulaire (que ce soit avec la touche entrée ou le bouton envoyer)
            Et l'événement appelle ma fonction handleSubmit */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          {/* Pour chaque input, j'écoute l'événement onChange afin de mettre à jour ma variable en fonction de mon input */}
          {/* Cela permet d'avoir en temps réel le contenu de l'input dans ma variable correspondante */}
          {/* Pour récupérer le contenu de l'input, je récupère l'événement (la variable "e") */}
          {/* Dans cet événement, je récupère ma cible (donc l'input) puis sa valeur */}
          {/* et j'utilise le setEmail pour définir ma variable avec le contenu de mon input */}
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Se connecter</button>
        </form>
        <a onClick={() => setShowModal(true)}>Mot de passe oublié ?</a>
        {/* Composant PasswordResetModal */}
        <PasswordResetModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onResetPassword={handleResetPassword}
        />
      </div>
    </div>
  );
}
