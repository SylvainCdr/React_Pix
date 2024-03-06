import React, { useEffect, useState } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import useFavorites from "../../../Components/useFavorites";


export default function UserAccount() {



  return (
    <>
      <h1>Mon compte</h1>
      <p>Bienvenue sur votre compte</p>

      <div className="user-account-container">
        <div className="user-menu">
          <aside className="user-account-nav">
            <h2>MENU</h2>
            <ul>
              <li>
                <NavLink to="/mon-compte" end activeClassName="active">
                  Mes informations
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/mon-compte/produits-favoris"
                  activeClassName="active"
                >
                  Mes Produits Favoris
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/mon-compte/mes-commandes"
                  activeClassName="active"
                >
                  Mes commandes
                </NavLink>
              </li>
            </ul>
          </aside>
        </div>

        <div className="user-dashboard">


        







        </div>
      </div>
    </>
  );
}
