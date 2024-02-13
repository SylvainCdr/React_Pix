import React, { useState, useEffect } from "react";
import "./style.scss";
import Swal from "sweetalert2";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.reverse()));
  }, []);

  const deleteProduct = (id) => {
    if (!id) {
      console.error("ID is undefined or null");
      return;
    }

    // Utiliser SweetAlert2 pour demander une confirmation avant la suppression
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas récupérer ce produit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler", // Définissez le texte du bouton d'annulation ici
      confirmButtonText: "Oui",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur clique sur "Oui, supprimer", effectuez la suppression
        fetch(`http://localhost:3001/products/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product._id !== id)
            );
          })
          .catch((error) =>
            console.log("Erreur lors de la suppression :", error)
          );
        
        // Affiche une alerte SweetAlert2 pour indiquer que la suppression a réussi
      Swal.fire({
        title: "Supprimé!",
        text: "Le produit a été supprimé avec succès.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500, // Définissez ici le même délai que pour le timer initial
        timerProgressBar: true,
      
    });
  }
}
  )};

  return (
    <div className="admin-products">
      <h1>ADMINISTRATION</h1>
      <h2>Produits</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Photo</th>
            <th scope="col">Nom</th>
            <th scope="col">Ref</th>
            <th scope="col">Marque</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Prix</th>
            <th scope="col">Actions</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="img-td">
                <img src={product.image} alt="" />
              </td>
              <td>{product.name}</td>
              <td>{product.ref}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>{product.price} €</td>
              <td>
                <button className="btn btn-primary">Modifier</button>
              </td>
              <td>
                <button
                  onClick={() => {
                    deleteProduct(product._id);
                  }}
                  className="btn btn-danger"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
