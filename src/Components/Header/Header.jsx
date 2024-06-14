import React from "react";
import styles from "./style.module.scss";
import  Link from "next/link";
import { useUser } from "../../templates/appContext";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname()


  return (
    <div className={styles.header_container}>
      <nav className={styles.header__nav}>
        <div className={styles.header__logo}>
          <Link href="/">
            <img src="/assets/logo-dark.svg" alt="logo" />
          </Link>
        </div>

        <ul>
          <li
            className={pathname === "/boutique" ? styles.active : ""}
          >
            <Link
              href="/boutique"
              className={styles.shop}
              onClick={handleLinkClick}
            >
              Boutique
            </Link>
          </li>
          <li
            className={
              pathname === "/notre-expertise" ? styles.active : ""
            }
          >
            <Link href="/notre-expertise" onClick={handleLinkClick}>
              Notre expertise
            </Link>
          </li>
          <li
            className={pathname === "/a-propos" ? styles.active : ""}
          >
            <Link href="/a-propos" onClick={handleLinkClick}>
              Qui sommes-nous ?
            </Link>
          </li>
          <li className={pathname === "/contact" ? styles.active : ""}>
            <Link href="/contact" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
          {!user && (
            <li
              className={
                pathname === "/inscription" ||
                pathname === "/connexion"
                  ? styles.active
                  : ""
              }
            >
              <Link href="/inscription" onClick={handleLinkClick}>
                Connexion
              </Link>
            </li>
          )}
          {user?.role === "user" && (
            <li
              className={
                pathname === "/mon-compte" ? styles.active : ""
              }
            >
              <Link href="/mon-compte" onClick={handleLinkClick}>
                Mon compte
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li
              className={
                pathname === "/admin/dashboard" ? styles.active : ""
              }
            >
              <Link href="/admin/dashboard" onClick={handleLinkClick}>
                Administration
              </Link>
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
            <Link href="/panier">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
