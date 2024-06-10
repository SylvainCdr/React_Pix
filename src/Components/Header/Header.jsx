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
 function burgerToggle() {
  const nav = document.querySelector(".header__nav");
  const burgerMenu = document.querySelector(".header__burgerMenu");
  nav.classList.toggle("active");
  burgerMenu.classList.toggle("active");
}
// Fin fonction menu Burger

  const handleLinkClick = () => {
    const nav = document.querySelector(".header__nav");
    const burgerMenu = document.querySelector(".header__burgerMenu");
    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
      burgerMenu.classList.remove("active");
    }
  };

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
            <Link to="/boutique" className="shop" onClick={handleLinkClick}>Boutique</Link>
          </li>
          <li className={location.pathname === "/notre-expertise" ? "active" : ""}>
            <Link to="/notre-expertise" onClick={handleLinkClick}>Notre expertise</Link>
          </li>
          <li className={location.pathname === "/a-propos" ? "active" : ""}>
            <Link to="/a-propos" onClick={handleLinkClick}>Qui sommes-nous ?</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          </li>
          {!user && (
            <li className={location.pathname === "/inscription" || location.pathname === "/connexion" ? "active" : ""}>
              <Link to="/inscription" onClick={handleLinkClick}>Connexion</Link>
            </li>
          )}
          {user?.role === "user" && (
            <li className={location.pathname === "/mon-compte" ? "active" : ""}>
              <Link to="/mon-compte" onClick={handleLinkClick}>Mon compte</Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li className={location.pathname === "/admin/dashboard" ? "active" : ""} >
              <Link to="/admin/dashboard" onClick={handleLinkClick}>Administration</Link>
            </li>
          )}
          {user && (
            <li>
              <a href="#" onClick={logout} className="logout">
                Déconnexion
              </a>
            </li>
          )}
        </ul>


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