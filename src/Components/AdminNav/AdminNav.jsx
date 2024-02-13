import React from 'react';

export default function AdminNav() {

    return (


<aside class="col-3">

<article class="card mb-3 bg-dark">
<div class="card-header bg-dark" >
Catégories
</div>
<div class="card-body bg-dark">
<p><a href="#">Liste des Catégories </a></p>
<p><a href="#">Ajouter une Catégorie </a></p>
</div>
</article>

<article class="card mb-3 bg-dark">
<div class="card-header bg-dark">
Produits
</div>
<div class="card-body bg-dark">
<p><a href="/admin/products">Liste des Produits </a></p>
<p><a href="/admin/add-product"> Ajouter un Produit </a></p>
{/* on ajoute un lien pour ajouter un produit */}



</div>
</article>

<article class="card mb-3 bg-dark">
<div class="card-header">
Utilisateurs
</div>
<div class="card-body">
<p><a href="#">Liste des Utilisateurs </a></p>
<p><a href="#"> Ajouter un Utilisateur </a></p>
</div>
</article>


</aside>

    );
}
