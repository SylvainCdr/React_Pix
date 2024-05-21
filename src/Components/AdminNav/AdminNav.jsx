import React from "react";
import "./style.scss";

export default function AdminNav() {
  return (
    <aside class="col-2">
      <article class="card mb-5 bg-dark">
        <div class="card-header bg-dark">Commandes</div>
        <div class="card-body bg-dark">
          <p>
            <a href="/admin/commandes">Listing des Commandes  </a>
          </p>
        
        </div>
      </article>

      <article class="card mb-5 bg-dark">
        <div class="card-header bg-dark">Produits</div>
        <div class="card-body bg-dark">
          <p>
            <a href="/admin/produits">Liste des Produits </a>
          </p>
          <p>
            <a href="/admin/produits/ajout"> Ajouter un Produit </a>
          </p>
        </div>
      </article>

      <article class="card mb-5 bg-dark">
        <div class="card-header bg-dark">Opérations commerciales</div>
        <div class="card-body bg-dark">
          <p>
            <a href="#">Liste des opérations </a>
          </p>
          <p>
            <a href="#">Créer une opération </a>
          </p>
        </div>
      </article>

      <article class="card mb-5 bg-dark">
        <div class="card-header">Utilisateurs</div>
        <div class="card-body">
          <p>
            <a href="/admin/utilisateurs">Liste des Utilisateurs </a>
          </p>
          {/* <p><a href="#">Articles suivis par utilisateur</a></p> */}
        </div>
      </article>
    </aside>
  );
}
