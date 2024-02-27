import React, { useState, useEffect } from "react";
import "./style.scss";
import { NavLink, useHistory } from "react-router-dom";
import { useUser } from "../../Pages/appContext";

function Header() {

  const user = useUser();
  console.log(user);

const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLogged(true);
  //   }
  //   const user = localStorage.getItem("user");
  //   if (user) {
  //     const userObj = JSON.parse(user);
  //     if (userObj.role === "admin") {
  //       setIsAdmin(true);
  //     }
  //   }
  // }, []);




  // Creation fonction menu Burger
  let isBurgerOpen = false;
  function burgerToggle() {
    const nav = document.querySelector(".header__nav");
    console.log(nav);
    nav.classList.toggle("active");
    isBurgerOpen = !isBurgerOpen;
  }
  // Fin fonction menu Burger


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
              <NavLink to="/login">Se Connecter</NavLink>
            </li>

            
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

<li> Hello {user?.firstName} </li>

{user.role === "admin" && (
  <li>
    <NavLink to="/admin/dashboard">Dashboard</NavLink>
  </li>
)}



        </ul>
        <div className="header__burgerMenu" onClick={burgerToggle}></div>
      </nav>
    </div>
  );
}

export default Header;
