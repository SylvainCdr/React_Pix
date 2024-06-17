import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function AdminNav() {
  return (
    <div className={styles["adminNav-container"]}>
      <article className={styles["cart-orders"]}>
        <p>Commandes & Panier</p>
        <Link href="/admin/commandes">Liste des commandes </Link>
        <Link href="/admin/paniers"> Liste des paniers en cours </Link>
      </article>

      <article className={styles.products}>
        <p>Produits</p>
        <Link href="/admin/produits">Liste des produits </Link>
        <Link href="/admin/produits/ajout"> Ajouter un produit </Link>
      </article>

      <article className={styles.promotions}>
        <p>Opérations commerciales</p>
        <Link href="#">Liste des opérations </Link>
        <Link href="#">Créer une opération </Link>
      </article>

      <article className={styles.users}>
        <p>Utilisateurs</p>
        <Link href="/admin/utilisateurs">Liste des utilisateurs </Link>
      </article>
    </div>
  );
}
