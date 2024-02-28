import React from "react";

export default function AdminNav() {
  return (
    <aside class="col-3">
      <article class="card mb-3 bg-dark">
        <div class="card-header bg-dark">Commandes</div>
        <div class="card-body bg-dark">
          <p>
            <a href="#">Commandes en cours </a>
          </p>
          <p>
            <a href="#">Commandes finalisées</a>
          </p>
        </div>
      </article>

      <article class="card mb-3 bg-dark">
        <div class="card-header bg-dark">Produits</div>
        <div class="card-body bg-dark">
          <p>
            <a href="/admin/products">Liste des Produits </a>
          </p>
          <p>
            <a href="/admin/add-product"> Ajouter un Produit </a>
          </p>
        </div>
      </article>

      <article class="card mb-3 bg-dark">
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

      <article class="card mb-3 bg-dark">
        <div class="card-header">Utilisateurs</div>
        <div class="card-body">
          <p>
            <a href="/admin/users">Liste des Utilisateurs </a>
          </p>
          {/* <p><a href="#">Articles suivis par utilisateur</a></p> */}
        </div>
      </article>
    </aside>
  );
}
