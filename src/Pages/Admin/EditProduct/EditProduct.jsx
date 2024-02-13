import React, { useState, useEffect } from 'react';
import "./style.scss";
import AdminProductForm from "../../../Components/AdminProductForm/AdminProductForm";
import Swal from "sweetalert2";

function EditProduct() {
    // État pour stocker les données du produit à éditer
    const [productToEdit, setProductToEdit] = useState(null);

    // Effet pour récupérer les données du produit à éditer lors du chargement du composant
    useEffect(() => {
  
        // Remplacez avec votre logique pour récupérer les données du produit depuis le serveur
      const fetchProductToEdit = async () => {
    try {
        const productId = window.location.pathname.split("/").pop();
        const response = await fetch(`http://localhost:3001/products/${productId}`);
        const productData = await response.json();
        console.log("productData:", productData);
        setProductToEdit(productData);
    } catch (error) {
        console.error("Erreur lors de la récupération du produit à éditer :", error);
    }
};

        // Appelez la fonction pour récupérer les données du produit à éditer
        fetchProductToEdit();
    }, []); // L'effet s'exécute une seule fois lors du chargement du composant

    // Fonction pour éditer un produit
    const handleEditProduct = async (product) => {
        try {
            const response = await fetch(`http://localhost:3001/products/${product._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            // Vérifier si la requête a réussi
            if (response.ok) {

    // on diffuse un message success
    Swal.fire({
        title: "Modifié!",
        text: "Le produit a été modifié avec succès.",
        icon: "success",
        showConfirmButton: false,
        timer: 1800, // Définissez ici le même délai que pour le timer initial
        timerProgressBar: true,
      
    });
  

} else {
    // Afficher une alerte si la requête a échoué
    alert("Erreur lors de la modification du produit");
}
} catch (error) {
    console.error("Erreur lors de la modification du produit :", error);
}
// Rediriger l'utilisateur vers la liste des produits
window.location.href = "/admin/products";
    };

    return (
        <div className="edit-product">
            <h1>ADMINISTRATION</h1>
            <h2>Modifier un produit</h2>
            {/* Utilisation du composant AdminProductForm pour l'édition */}
            <AdminProductForm
                productToEdit={productToEdit}
                onSubmit={(editedProduct) => handleEditProduct(editedProduct)}
            />
        </div>
    );
}

export default EditProduct;
