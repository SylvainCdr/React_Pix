import React, {useState} from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    
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

            {/* icone user barré si pas loggé sinon icone user pour mon compte*/}
            <li>
            <NavLink to={isAuthenticated ? "/mon-compte" : "/login"}>
              <i className="fa-regular fa-user"></i>
            </NavLink>
          </li>
            {/* <li>
              
              <NavLink to="/register">
              <i class="fa-regular fa-user"></i>
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/panier">
              <i class="fa-solid fa-cart-shopping"></i>
              </NavLink>
            </li>
            
          </ul>
          <div className="header__burgerMenu" onClick={burgerToggle}></div>
        </nav>
      </div>
    
  );
}

export default Header;
