import React from "react";
import styles from "./style.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../Pages/appContext";
import Swal from "sweetalert2";


function Header() {

  const user = useUser();
  console.log(user);

  function burgerToggle() {
    const nav = document.querySelector(`.${styles.header__nav}`);
    const burgerMenu = document.querySelector(`.${styles.header__burgerMenu}`);
    nav.classList.toggle(styles.active);
    burgerMenu.classList.toggle(styles.active);
  }

  const handleLinkClick = () => {
    const nav = document.querySelector(`.${styles.header__nav}`);
    const burgerMenu = document.querySelector(`.${styles.header__burgerMenu}`);
    if (nav.classList.contains(styles.active)) {
      nav.classList.remove(styles.active);
      burgerMenu.classList.remove(styles.active);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    Swal.fire({
      title: "Déconnecté",
      icon: "success",
      text: "Pixecurity vous remercie pour votre visite !",
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const location = useLocation();

  return (
    <div className={styles.header_container}>
      <nav className={styles.header__nav}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img src="/assets/logo-dark.svg" alt="logo" />
          </Link>
        </div>

        <ul>
          <li className={location.pathname === "/boutique" ? styles.active : ""}>
            <Link to="/boutique" className={styles.shop} onClick={handleLinkClick}>Boutique</Link>
          </li>
          <li className={location.pathname === "/notre-expertise" ? styles.active : ""}>
            <Link to="/notre-expertise" onClick={handleLinkClick}>Notre expertise</Link>
          </li>
          <li className={location.pathname === "/a-propos" ? styles.active : ""}>
            <Link to="/a-propos" onClick={handleLinkClick}>Qui sommes-nous ?</Link>
          </li>
          <li className={location.pathname === "/contact" ? styles.active : ""}>
            <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
          </li>
          {!user && (
            <li className={location.pathname === "/inscription" || location.pathname === "/connexion" ? styles.active : ""}>
              <Link to="/inscription" onClick={handleLinkClick}>Connexion</Link>
            </li>
          )}
          {user?.role === "user" && (
            <li className={location.pathname === "/mon-compte" ? styles.active : ""}>
              <Link to="/mon-compte" onClick={handleLinkClick}>Mon compte</Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li className={location.pathname === "/admin/dashboard" ? styles.active : ""} >
              <Link to="/admin/dashboard" onClick={handleLinkClick}>Administration</Link>
            </li>
          )}
          {user && (
            <li>
              <a href="#" onClick={logout} className={styles.logout}>
                Déconnexion
              </a>
            </li>
          )}
        </ul>

        <div className={styles.header__burgerMenu} onClick={burgerToggle}></div>

        {user?.role === "user" && (
          <div className={styles.cart}>
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
