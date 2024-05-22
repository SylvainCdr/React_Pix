import React from "react";
import "./style.scss";

export default function AdminNav() {
  return (
    <div className="adminNav-container">
      <article className="orders">
        <p>Commandes</p>
        <a href="/admin/commandes">Listing des Commandes </a>
      </article>

      <article className="products">
        <p>Produits</p>
        <a href="/admin/produits">Liste des Produits </a>
        <a href="/admin/produits/ajout"> Ajouter un Produit </a>
      </article>

      <article className="promotions">
        <p>Opérations commerciales</p>
        <a href="#">Liste des opérations </a>
        <a href="#">Créer une opération </a>
      </article>

      <article className="users">
        <p>Utilisateurs</p>
        <a href="/admin/utilisateurs">Liste des Utilisateurs </a>
      </article>
    </div>
  );
}
