import React, { useState, useEffect } from "react";
import "./style.scss";

export default function AdminProductForm({ onSubmit, productToEdit }) {
  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  // Effet pour remplir le formulaire avec les données du produit à éditer
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setRef(productToEdit.ref || "");
      setDescription(productToEdit.description || "");
      setCategory(productToEdit.category || "");
      setSubcategory(productToEdit.subcategory || "");
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
      category: category === "newCategory" ? newCategory : category,
      subcategory: subcategory === "newSubcategory" ? newSubcategory : subcategory,
      brand: brand === "newBrand" ? newBrand : brand,
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="ref">Référence</label>
      <input
        type="text"
        name="ref"
        id="ref"
        value={ref}
        onChange={(e) => setRef(e.target.value)}
      />

      {/*------------------  DEBUT SELECT CATEGORIE  --------------------*/}
      <label htmlFor="category">Catégorie</label>
      <select
        name="category"
        id="category"
        value={selectedCategory || category}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setCategory(e.target.value);
          if (e.target.value !== "newCategory") {
            setNewCategory(""); // Réinitialisez newCategory si une catégorie existante est sélectionnée
          }
        }}
      >
        {/* Options pour choisir une catégorie existante */}
        <option value="Caméras">Caméras</option>
        <option value="Réseau">Réseau</option>
        <option value="Logiciels">Logiciels</option>
        <option value="Autres">Autres</option>

        {/* Option pour écrire une nouvelle catégorie */}
        <option value="newCategory">Saisir une nouvelle catégorie</option>
      </select>
      {/* Si "newCategory" est sélectionné, affichez le champ de texte pour la nouvelle catégorie */}
      {selectedCategory === "newCategory" && (
        <div>
          <label htmlFor="newCategoryInput">Nouvelle catégorie</label>
          <input
            type="text"
            name="newCategoryInput"
            id="newCategoryInput"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>
      )}
      {/*------------------  FIN SELECT CATEGORIE  --------------------*/}
      {/*------------------  DEBUT SELECT SOUS CATEGORIE  --------------------*/}
      <label htmlFor="subcategory">Sous-catégorie</label>
      <select
        name="subcategory"
        id="subcategory"
        value={selectedSubcategory || subcategory}
        onChange={(e) => {
          setSelectedSubcategory(e.target.value);
          setSubcategory(e.target.value);
          if (e.target.value !== "newSubcategory") {
            setNewSubcategory(""); // Réinitialisez newSubcategory si une sous-catégorie existante est sélectionnée
          }
        }}
      >
        {/* Si la catégorie est "Réseau", affichez les options suivantes */}
        {category === "Caméras" && (
          <>
            <option value="Dôme">Dôme</option>
            <option value="Bullet">Bullet</option>
            <option value="PTZ">PTZ</option>
            <option value="Multicapteurs">Multicapteurs</option>
            <option value="Fisheye">Fisheye</option>
            <option value="Discrète">Discrète</option>
            <option value="Panoramique">Panoramique</option>
            <option value="Angle">Angle</option>
            <option value="Comptage">Comptage</option>
          </>
        )}

        {/* Si la catégorie est "Réseau", affichez les options suivantes */}
        {category === "Réseau" && (
          <>
            <option value="Switchs">Switchs</option>
            <option value="Firewall">Firewall</option>
          </>
        )}

        {/* Si la catégorie est "Logiciels", affichez les options suivantes */}
        {category === "Logiciels" && (
          <>
            <option value="Milestone">Milestone</option>
            <option value="Briefcam">Briefcam</option>
            <option value="Technoaware">Technoaware</option>
            <option value="Nx Witness">Nx Witness</option>
          </>
        )}

        {/* Si la catégorie est "Autres", affichez les options suivantes */}
        {category === "Autres" && (
          <>
            <option value="Supports">Supports</option>
            <option value="Alimentation">Alimentation</option>
            <option value="Modules Wifi">Modules Wifi</option>
          </>
        )}

        {/* Option pour écrire une nouvelle sous-catégorie */}
        <option value="newSubcategory">
          Saisir une nouvelle sous-catégorie
        </option>
      </select>
      {/* Si "newSubcategory" est sélectionné, affichez le champ de texte pour la nouvelle sous-catégorie */}
      {selectedSubcategory === "newSubcategory" && (
        <div>
          <label htmlFor="newSubcategoryInput">Nouvelle sous-catégorie</label>
          <input
            type="text"
            name="newSubcategoryInput"
            id="newSubcategoryInput"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
          />
        </div>
      )}
      {/*------------------  FIN SELECT SOUS CATEGORIE  --------------------*/}
      {/*------------------  DEBUT SELECT MARQUE  --------------------*/}
      <label htmlFor="brand">Marque</label>
      <select
        name="brand"
        id="brand"
        value={selectedBrand || brand}
        onChange={(e) => {
          setSelectedBrand(e.target.value);
          setBrand(e.target.value);
          if (e.target.value !== "newBrand") {
            setNewBrand(""); // Réinitialisez newBrand si une catégorie existante est sélectionnée
          }
        }}
      >


          <>
            <option value="Bosch">Bosch</option>
            <option value="I-Pro">I-Pro</option>
            <option value="Vivotek">Vivotek</option>
            <option value="Zyxel">Zyxel</option>
            <option value="Cisco">Cisco</option>
            <option value="Milestone">Millestone</option>
            <option value="Briefcam">Briefcam</option>
            <option value="Technoaware">Technoaware</option>
            <option value="Nx Witness">Nx Witness</option>
            <option value="Non spécifié">Non spécifié</option>
            <option value="Zyxel">Zyxel</option>
        
          </>
        

      
        

     
       

        

        {/* Option pour écrire une nouvelle catégorie */}
        <option value="newBrand">Saisir une nouvelle marque</option>
      </select>
      {/* Si "newCategory" est sélectionné, affichez le champ de texte pour la nouvelle catégorie */}
      {selectedBrand === "newBrand" && (
        <div>
          <label htmlFor="newBrandInput">Nouvelle marque</label>
          <input
            type="text"
            name="newBrandInput"
            id="newBrandInput"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
          />
        </div>
      )}
      {/*------------------  FIN SELECT MARQUE  --------------------*/}
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="price">Prix</label>
      <input
        type="number"
        name="price"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor="image">URL de l'image</label>
      <input
        type="text"
        name="image"
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">{productToEdit ? "Modifier" : "Ajouter"}</button>{" "}
    </form>
  );
}
