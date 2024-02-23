import React, { useState, useEffect } from "react";
import "./style.scss";
import { NavLink, useHistory } from "react-router-dom";

function Header() {

  // Creation fonction menu Burger
  let isBurgerOpen = false;
  function burgerToggle() {
    const nav = document.querySelector(".header__nav");
    console.log(nav);
    nav.classList.toggle("active");
    isBurgerOpen = !isBurgerOpen;
  }
  // Fin fonction menu Burger

  // Etat d'authentification
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");

  // Vérifier si l'utilisateur est authentifié
  useEffect(() => {
    fetch("http://localhost:3001/check-auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        setIsAdmin(data.isAdmin);
        setUsername(data.username);
      });
  }, []);




const handleLogout = () => {
    // Envoyer une requête de déconnexion au serveur
    fetch("http://localhost:3001/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Mettre à jour l'état d'authentification après déconnexion réussie
          setIsAuthenticated(false);
        }
      })
      .catch((error) => console.log(error));
  
  };


  return (
    <div className="header">
      <nav className="header__nav">
        {/* ON affiche le logo situé dans assets et on le redirige vers la page d'accueil */}
        <div className="header__logo">
          <NavLink to="/">
            <img src="/assets/logo-dark.svg" alt="logo" />
            <p>
              Fournisseur de solutions <br />
              de sureté intelligentes
            </p>
          </NavLink>
        </div>

        <ul onClick={burgerToggle}>
          {/* <li>
              <NavLink to="/">Accueil</NavLink>
            </li> */}
          <li>
            <NavLink to="/Catalogue">Catalogue</NavLink>
          </li>
          <li>
            <NavLink to="/Notre-expertise">Notre expertise</NavLink>
          </li>
          <li>
            <NavLink to="/A-propos">A propos</NavLink>
          </li>
          <li>
            <NavLink to="/Contact">Contact</NavLink>
          </li>

      
 {/* Bouton Se Connecter / Mon Compte */}
 <li>
          <NavLink
            to={
              isAuthenticated
                ? isAdmin
                  ? "/dashboard"
                  : "/mon-compte"
                : "/login"
            }
          >
            {isAuthenticated ? (isAdmin ? "Dashboard" : "Mon Compte") : "Se Connecter"}
          </NavLink>
        </li>

        {/* Bouton Se Déconnecter (affiché uniquement si l'utilisateur est connecté) */}
        
          <li>
            <button onClick={handleLogout}>Se Déconnecter</button>
          </li>
      

    
          {/* Afficher le message de bienvenue si l'utilisateur est connecté */}
          {isAuthenticated && (
            <li>
              Bonjour, {username}!
            </li>
          )}



          

          {/* <li>
            <NavLink to="/panier">
              <i class="fa-solid fa-cart-shopping"></i>
            </NavLink>
          </li> */}
        </ul>
        <div className="header__burgerMenu" onClick={burgerToggle}></div>
      </nav>
    </div>
  );
}

export default Header;
