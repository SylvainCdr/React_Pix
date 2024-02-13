import { useState } from "react";
import "./style.scss";

function AddProduct() {
  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let product = {
      name,
      ref,
      description,
      category,
      brand,
      price,
      image,
    };

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // on redirige vers le dashboard
      window.location.href = "/admin/products";
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };


  return (
    <div className="add-product">
        <h1>ADMINISTRATION</h1>
        <h2>Ajouter un produit</h2>
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
        <button>Envoyer</button>
      </form>
    </div>
  );
}

export default AddProduct;
