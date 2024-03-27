import React, { useState, useEffect } from "react";
import "./style.scss";
import { NavLink, useHistory } from "react-router-dom";
import { useUser } from "../../Pages/appContext";
import Swal from "sweetalert2";
// import useCart from "../useCart";
import { useCartContext } from "../../Pages/appContext";

function Header() {
  
  const user = useUser();
  console.log(user);

  

  // const { cartItemsCount } = useCart();
  // const [itemsCount, setItemsCount] = useState(cartItemsCount);

  const { cart } = useCartContext();
  const itemsCount = cart.length;

  // Mise à jour du nombre d'articles dans le panier
  // useEffect(() => {
  //   setItemsCount(cartItemsCount);
  // }, [cartItemsCount]);



 

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
          <li>
            <NavLink to="/Catalogue">Boutique</NavLink>
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

          {!user && (
            <li>
              <NavLink to="/register">Se Connecter</NavLink>
            </li>
          )}

          {user?.role === "user" && (
            <li>
              <NavLink to="/mon-compte">Mon compte</NavLink>
            </li>
          )}

          {user?.role === "admin" && (
            <li>
              <NavLink to="/admin/dashboard">Administration</NavLink>
            </li>
          )}

          {user && (
            <li>
              <a href="#" onClick={logout} className="logout">
                Se déconnecter
              </a>
            </li>
          )}

          {/* {user?.role === "user" && (
            <div className="cart">
              <NavLink to="/panier">
                <i className="fa-solid fa-cart-shopping"></i>
                
              </NavLink>
            </div>
          )} */}

          {/* utiliser un bouton toggle-off toggle-on pour la connexion et deconnexion */}
          {itemsCount > 0 && <span className="badge">{itemsCount}</span>} </ul>
        <div className="header__burgerMenu" onClick={burgerToggle}></div>

        {user?.role === "user" && (
            <div className="cart">
              <NavLink to="/panier">
                <i className="fa-solid fa-cart-shopping"></i>
                
              </NavLink>
            </div>
          )}

      </nav>
    </div>
  );
}

export default Header;
