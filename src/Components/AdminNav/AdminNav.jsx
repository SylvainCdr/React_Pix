import React from "react";
import styles from "./style.module.scss";

export default function AdminNav() {
  return (
    <div className={styles["adminNav-container"]}>
      <article className={styles["cart-orders"]}>
        <p>Commandes & Panier</p>
        <a href="/admin/commandes">Liste des commandes </a>
        <a href="/admin/paniers"> Liste des paniers en cours </a>
      </article>

      <article className={styles.products}>
        <p>Produits</p>
        <a href="/admin/produits">Liste des produits </a>
        <a href="/admin/produits/ajout"> Ajouter un produit </a>
      </article>

      <article className={styles.promotions}>
        <p>Opérations commerciales</p>
        <a href="#">Liste des opérations </a>
        <a href="#">Créer une opération </a>
      </article>

      <article className={styles.users}>
        <p>Utilisateurs</p>
        <a href="/admin/utilisateurs">Liste des utilisateurs </a>
      </article>
    </div>
  );
}
