import React from "react";
import styles from "./style.module.scss";
import AdminProductForm from "@/Components/AdminProductForm/AdminProductForm";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";

function AddProduct() {
  const handleAddProduct = async (product) => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
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
          window.location.href = "/admin/produits";
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
    <div className={styles["add-product-container"]}>
      <h1>
        ADMINISTRATION -<span> Ajouter un produit</span>{" "}
      </h1>
      <AdminProductForm onSubmit={handleAddProduct} />
    </div>
  );
}

export default AddProduct;
