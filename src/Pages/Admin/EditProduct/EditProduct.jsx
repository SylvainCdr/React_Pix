import React, { useState, useEffect } from 'react';
import "./style.scss";
import AdminProductForm from "../../../Components/AdminProductForm/AdminProductForm";
import Swal from "sweetalert2";

function EditProduct() {
    const [productToEdit, setProductToEdit] = useState(null);

    useEffect(() => {
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

        fetchProductToEdit();
    }, []);

    const handleEditProduct = async (product) => {
        try {
            const response = await fetch(`http://localhost:3001/products/${product._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Modifié!",
                    text: "Le produit a été modifié avec succès.",
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
                    text: "Erreur lors de la modification du produit.",
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Erreur lors de la modification du produit :", error);
            Swal.fire({
                title: "Erreur!",
                text: "Erreur lors de la modification du produit.",
                icon: "error",
                timer: 2000,
                timerProgressBar: true,
            });
        }
    };

    return (
        <div className="edit-product">
            <h1>ADMINISTRATION</h1>
            <h2>Modifier un produit</h2>
            <AdminProductForm
                productToEdit={productToEdit}
                onSubmit={(editedProduct) => handleEditProduct(editedProduct)}
            />
        </div>
    );
}

export default EditProduct;
