import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

function Header() {
  const link1 = "#";

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
    <>
      <div className="header">
        <nav className="header__nav">
          {/* ON affiche le logo situé dans assets et on le redirige vers la page d'accueil */}
          <div className="header__logo">
            <NavLink to="/">
              <img
                src="/assets/logo-dark.svg"
                alt="logo"
              /> 
              <p>Fournisseur de solutions <br />de sureté intelligentes</p>
            </NavLink>
          </div>
          
          <ul onClick={burgerToggle}>

            {/* <li>
              <NavLink to="/">Accueil</NavLink>
            </li> */}
            <li>
              <NavLink to="/Produits">Catalogue</NavLink>
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
            {/* <span>
              <a href={link1} target="_blank" rel="noopener noreferrer">
                <img
                  src="https://img.icons8.com/?size=64&id=52539&format=png"
                  alt="github"
                />
              </a>
              
            </span> */}
          </ul>
          <div className="header__burgerMenu" onClick={burgerToggle}></div>
        </nav>
      </div>
    </>
  );
}

export default Header;
