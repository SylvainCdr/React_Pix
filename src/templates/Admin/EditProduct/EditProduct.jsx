import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import AdminProductForm from "@/Components/AdminProductForm/AdminProductForm";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

function EditProduct() {
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    const fetchProductToEdit = async () => {
      try {
        const productId = window.location.pathname.split("/").pop();
        const response = await fetch(`${BASE_URL}/products/${productId}`);
        const productData = await response.json();
        console.log("productData:", productData);
        setProductToEdit(productData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du produit à éditer :",
          error
        );
      }
    };

    fetchProductToEdit();
  }, []);

  const handleEditProduct = async (product) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${product._id}`, {
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
          window.location.href = "/admin/produits";
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
    <div className={styles["edit-product"]}>
      <h1>
        ADMINISTRATION -<span> Modifier un produit</span>
      </h1>
      <AdminProductForm
        productToEdit={productToEdit}
        onSubmit={(editedProduct) => handleEditProduct(editedProduct)}
      />
    </div>
  );
}

export default EditProduct;
