import React, { useState, useEffect } from 'react';
import "./style.scss";

export default function AdminProductForm({ onSubmit, productToEdit }) {
    const [name, setName] = useState("");
    const [ref, setRef] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    // Effet pour remplir le formulaire avec les données du produit à éditer
    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name || "");
            setRef(productToEdit.ref || "");
            setDescription(productToEdit.description || "");
            setCategory(productToEdit.category || "");
            setBrand(productToEdit.brand || "");
            setPrice(productToEdit.price || 0);
            setImage(productToEdit.image || "");
        }
    }, [productToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construire l'objet produit
        let product = {
            name,
            ref,
            description,
            category,
            brand,
            price,
            image,
            
        };

         // Ajouter l'identifiant du produit si disponible
         if (productToEdit && productToEdit._id) {
            product._id = productToEdit._id;
        }

        // Appeler la fonction de soumission fournie par le parent
        onSubmit(product);
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nom</label>
            <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="ref">Référence</label>
            <input
                type="text"
                name="ref"
                id="ref"
                onChange={(e) => setRef(e.target.value)}
            />
            <label htmlFor="category">Catégorie</label>
            <input
                type="text"
                name="category"
                id="category"
                onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="brand">Marque</label>
            <input
                type="text"
                name="brand"
                id="brand"
                onChange={(e) => setBrand(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="price">Prix</label>
            <input
                type="number"
                name="price"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
            />
            <label htmlFor="image">URL de l'image</label>
            <input
                type="text"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.value)}
            />
            <button type="submit">{productToEdit ? "Modifier" : "Ajouter"}</button>        </form>

    );
}
      