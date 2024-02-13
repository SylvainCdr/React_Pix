import React from 'react';
import './style.scss';
import AdminProductForm from '../../../Components/AdminProductForm/AdminProductForm';

export default function EditProduct() {


    return (
        <div className="edit-product">
            <h1>ADMINISTRATION</h1>
            <h2>Modifier un produit</h2>
            <AdminProductForm />
        </div>
    );
}
