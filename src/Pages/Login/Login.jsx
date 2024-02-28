import { useAppContext } from "../appContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.scss";
import Cookies from "js-cookie";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const [authenticated, setAuthenticated] = useState(false);

  // on récupère le setUser afin de mettre à jour le contexte
  const {setUser } = useAppContext();


  

  useEffect(() => {
    // Vérifier l'authentification lors du chargement de la page
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3001/check-auth", {
        method: "GET",
        headers: {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email ou mot de passe incorrect",
        });
      } else {
        Cookies.set("token", data.token);
        setUser(data.user);
        navigate("/Catalogue");
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

  return (
    <div className="login-container">
      {/* // J'ecoute l'evennement onSubmit qui s'execute quand on soumet le formulaire (que ce soit avec la touche entrée ou le bouton envoyer)
        // Et l'evennement appel ma fonction handleSubmit */}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        {/* Pour chaques input, j'ecoute l'evennement onChange afin de mettre a jour ma variable en fonction de mon input */}
        {/* Ca permet d'avoir en temps réel le contenu de l'input dans ma variable correspondante */}
        {/* Pour recuperer le contenu de l'input, je recupère l'evennement (la variable "e") */}
        {/* Dans cet evennement, je recupère ma cible (donc l'input) puis sa valeur */}
        {/* et j'utilise le setLastName pour définir ma variable avec le contenu de mon input */}
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
        <a href="#">Mot de passe oublié ?</a>
        <button>Se connecter</button>

        {/* {authenticated && (
          <button> Déconnexion</button>
        )} */}

        <a href="/register">Pas encore de compte ? S'enregistrer </a>
      </form>

      <img src="./../../assets/logo-clear.svg" alt="" />
    </div>
  );
}