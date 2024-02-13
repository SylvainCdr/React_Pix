import React from 'react';
import "./style.scss";
import AdminProductForm from "../../../Components/AdminProductForm/AdminProductForm";

function AddProduct() {
  
    // Fonction pour ajouter un produit
    const handleAddProduct = async (product) => {
        try {
            // Appel à l'API pour ajouter un produit
            const response = await fetch("http://localhost:3001/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            // Vérifier si la requête a réussi
            if (response.ok) {
                // Rediriger l'utilisateur vers la liste des produits
                window.location.href = "/admin/products";
            } else {
                // Afficher une alerte si la requête a échoué
                alert("Erreur lors de l'ajout du produit");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
        }
    };
    

    return (
        <div className="add-product">
            <h1>ADMINISTRATION</h1>
            <h2>Ajouter un produit</h2>
            {/* Utilisation du composant AdminProductForm pour l'ajout */}
            <AdminProductForm onSubmit={handleAddProduct} />
        </div>
    );
}

export default AddProduct;
