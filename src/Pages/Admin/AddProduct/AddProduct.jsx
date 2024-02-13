import React from 'react';
import "./style.scss";
import AdminProductForm from "../../../Components/AdminProductForm/AdminProductForm";
import Swal from "sweetalert2";

function AddProduct() {
  
    const handleAddProduct = async (product) => {
        try {
            const response = await fetch("http://localhost:3001/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Ajouté!",
                    text: "Le produit a été ajouté avec succès.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    window.location.href = "/admin/products";
                });
            } else {
                Swal.fire({
                    title: "Erreur!",
                    text: "Erreur lors de l'ajout du produit.",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout du produit :", error);
            Swal.fire({
                title: "Erreur!",
                text: "Erreur lors de l'ajout du produit.",
                icon: "error",
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div className="add-product">
            <h1>ADMINISTRATION</h1>
            <h2>Ajouter un produit</h2>
            <AdminProductForm onSubmit={handleAddProduct} />
        </div>
    );
}

export default AddProduct;
