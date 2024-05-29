import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../Pages/appContext";
import Swal from "sweetalert2";
import { useCartContext } from "../../Pages/appContext";

function Header() {

  const user = useUser();
  console.log(user);


  // Creation fonction menu Burger
  let isBurgerOpen = false;
  function burgerToggle() {
    const nav = document.querySelector(".header__nav");
    console.log(nav);
    nav.classList.toggle("active");
    isBurgerOpen = !isBurgerOpen;
  }
  // Fin fonction menu Burger

  const logout = () => {
    // on supprime le user du localStorage
    localStorage.removeItem("user");
    // on supprime le cookie
    //
    document.cookie.split(";").forEach((c) => {
      // on supprime le cookie en changeant la date d'expiration
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // alerte de déconnexion SweetAlert
    Swal.fire({
      title: "Déconnecté",
      icon: "success",
      text: "Pixecurity vous remercie pour votre visite !",
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      // on redirige vers la page d'accueil
      window.location.href = "/";
    }, 2000);
  };

  const location = useLocation();


  return (
    <div className="header">
      <nav className="header__nav">
        <div className="header__logo">
          <Link to="/">
            <img src="/assets/logo-dark.svg" alt="logo" />
          </Link>
        </div>

        <ul>
          <li className={location.pathname === "/boutique" ? "active" : ""}>
            <Link to="/boutique" className="shop">Boutique</Link>
          </li>
          <li className={location.pathname === "/notre-expertise" ? "active" : ""}>
            <Link to="/notre-expertise">Notre expertise</Link>
          </li>
          <li className={location.pathname === "/a-propos" ? "active" : ""}>
            <Link to="/a-propos">Qui sommes-nous ?</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact">Contact</Link>
          </li>
          {!user && (
            <li className={location.pathname === "/inscription" || location.pathname === "/connexion" ? "active" : ""}>
              <Link to="/inscription">Se Connecter</Link>
            </li>
          )}
          {user?.role === "user" && (
            <li className={location.pathname === "/mon-compte" ? "active" : ""}>
              <Link to="/mon-compte">Mon compte</Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li className={location.pathname === "/admin/dashboard" ? "active" : ""} >
              <Link to="/admin/dashboard">Administration</Link>
            </li>
          )}
          {user && (
            <li>
              <a href="#" onClick={logout} className="logout">
                Se déconnecter
              </a>
            </li>
          )}
        </ul>

        <div className="cart-burgerMenu"></div>
        <div className="header__burgerMenu" onClick={burgerToggle}></div>

        {user?.role === "user" && (
          <div className="cart">
            <Link to="/panier">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;