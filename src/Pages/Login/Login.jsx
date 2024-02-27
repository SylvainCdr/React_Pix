import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./style.scss";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);    


  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          setLogged(data);
  
          // Utilisez SweetAlert pour afficher un message de bienvenue
          Swal.fire({
            title: `Bienvenue ${data.firstName}`,
            text: "Vous êtes maintenant connecté",
            icon: "success",
            showConfirmButton: false,
            timer: 1700,
          });
  
          // Attendez un bref instant avant d'effectuer la deuxième requête
          setTimeout(() => {
            // Envoi de la requête pour vérifier l'état d'authentification
            fetch("http://localhost:3001/check-auth", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Data from check-auth:", data);
                // Mettez à jour l'état d'authentification ici
              })
              .catch((error) => console.log(error));
          }, 500);
  
          navigate("/");
        } else {
          setLogged(false);
        }
      })
      .catch((error) => console.log(error));
  };
  


          // // Utilisez SweetAlert pour afficher un message de bienvenue
          // Swal.fire({
          //   title: `Bienvenue `,
          //   text: "Vous êtes maintenant connecté",
          //   icon: "success",
          //   showConfirmButton: false,
          //   timer: 1700,
          // });


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
        {/* Par defaut, logged est false, quand le formulaire n'est pas encore envoyé */}
        {/* Donc tant que logged est false, on affiche pas la div */}
        {/* Ajoutez une condition pour afficher le message d'erreur */}
        {logged === false && (
          <div className="error">Identifiants incorrects</div>
        )}

        {logged && (
          <div className="success">
            Bonjour {logged.firstName} {logged.lastName}
          </div>
        )}
        <a href="/register">Pas encore de compte ? S'enregistrer </a>
      </form>

      <img src="./../../assets/logo-clear.svg" alt="" />
    </div>
  );
}