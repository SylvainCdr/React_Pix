import { useState } from "react";
import "./style.scss";
import AdminProductForm from "../../../Components/AdminProductForm/AdminProductForm";

function AddProduct() {

  return (
    <div className="add-product">
        <h1>ADMINISTRATION</h1>
        <h2>Ajouter un produit</h2>
      <AdminProductForm />
    </div>
  );
}

export default AddProduct;
