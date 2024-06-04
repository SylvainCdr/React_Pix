import React from "react";
import "./style.scss";

export default function AdminNav() {
  return (
    <div className="adminNav-container">
      <article className="cart-orders">
        <p>Commandes & Panier</p>
        <a href="/admin/commandes">Liste des commandes </a>
        <a href="/admin/paniers"> Liste des paniers en cours </a>
      </article>

      <article className="products">
        <p>Produits</p>
        <a href="/admin/produits">Liste des produits </a>
        <a href="/admin/produits/ajout"> Ajouter un produit </a>
      </article>

      <article className="promotions">
        <p>Opérations commerciales</p>
        <a href="#">Liste des opérations </a>
        <a href="#">Créer une opération </a>
      </article>

      <article className="users">
        <p>Utilisateurs</p>
        <a href="/admin/utilisateurs">Liste des utilisateurs </a>
      </article>
    </div>
  );
}
