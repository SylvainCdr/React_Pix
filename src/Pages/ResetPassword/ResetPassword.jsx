import React from "react";
import { useState, useEffect } from "react";
import Aos from "aos";
import "./style.scss";

export default function ResetPassword() {

    useEffect(() => {
    Aos.init({ duration: 2000 });
    }, []);


  return (
    <div className="resetPassword-container">
      <div data-aos="fade-right" className="section-1">
        <img src="./../../assets/logo-dark.svg" alt="" />
      </div>
      <div data-aos="fade-left" className="section-2">
        <h1> Réinitialisation <br />du mot de passe </h1>

        <form>
          <label htmlFor="email">Email</label>

          <input type="email" name="email" id="email" />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" id="password" />
          <button>Définir le nouveau de passe</button>
        </form>
      </div>
    </div>
  );
}
