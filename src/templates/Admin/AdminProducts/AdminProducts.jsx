import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import AdminProductForm from "../../../Components/AdminProductForm/AdminProductForm";
import { BASE_URL } from "../../../url";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [subcategoryFilter, setSubcategoryFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.reverse()));
  }, []);

  const deleteProduct = (id) => {
    if (!id) {
      console.error("ID is undefined or null");
      return;
    }

    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas récupérer ce produit!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Annuler",
      confirmButtonText: "Oui",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/products/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            setProducts((prevProducts) =>
              prevProducts.filter((product) => product._id !== id),
            );
          })
          .then(() => {
            // Ajoute une alerte SweetAlert2 pour indiquer que la suppression a réussi
            Swal.fire({
              title: "Supprimé!",
              text: "Le produit a été supprimé avec succès.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          })
          .catch((error) =>
            console.log("Erreur lors de la suppression :", error),
          );
      }
    });
  };

  const editProduct = (id) => {
    if (!id) {
      console.error("ID is undefined or null");
      return;
    }
    window.location.href = `/admin/produits/modification/${id}`;
  };

  // Fonction pour mettre à jour les filtres de catégorie et sous-catégorie
  const handleCategoryFilterChange = (category) => {
    const updatedCategoryFilter = [...categoryFilter];
    if (updatedCategoryFilter.includes(category)) {
      // Si la catégorie est déjà dans le filtre, la retirer
      updatedCategoryFilter.splice(updatedCategoryFilter.indexOf(category), 1);
    } else {
      // Sinon, l'ajouter au filtre
      updatedCategoryFilter.push(category);
    }
    setCategoryFilter(updatedCategoryFilter);
  };

  const handleSubcategoryFilterChange = (subcategory) => {
    const updatedSubcategoryFilter = [...subcategoryFilter];
    if (updatedSubcategoryFilter.includes(subcategory)) {
      // Si la sous-catégorie est déjà dans le filtre, la retirer
      updatedSubcategoryFilter.splice(
        updatedSubcategoryFilter.indexOf(subcategory),
        1,
      );
    } else {
      // Sinon, l'ajouter au filtre
      updatedSubcategoryFilter.push(subcategory);
    }
    setSubcategoryFilter(updatedSubcategoryFilter);
  };

  const handleBrandFilterChange = (brand) => {
    const updatedBrandFilter = [...brandFilter];
    if (updatedBrandFilter.includes(brand)) {
      // Si la marque est déjà dans le filtre, la retirer
      updatedBrandFilter.splice(updatedBrandFilter.indexOf(brand), 1);
    } else {
      // Sinon, l'ajouter au filtre
      updatedBrandFilter.push(brand);
    }
    setBrandFilter(updatedBrandFilter);
  };

  // Filtrer les produits en fonction des filtres sélectionnés
  const filteredProducts = products.filter((product) => {
    // Si aucun filtre n'est sélectionné, afficher tous les produits
    if (
      categoryFilter.length === 0 &&
      subcategoryFilter.length === 0 &&
      brandFilter.length === 0
    ) {
      return true;
    }

    // Vérifier si la catégorie du produit est dans le filtre de catégorie
    const categoryMatch =
      categoryFilter.length === 0 || categoryFilter.includes(product.category);

    // Vérifier si la sous-catégorie du produit est dans le filtre de sous-catégorie
    const subcategoryMatch =
      subcategoryFilter.length === 0 ||
      subcategoryFilter.includes(product.subcategory);

    // Vérifier si la marque du produit est dans le filtre de marque
    const brandMatch =
      brandFilter.length === 0 || brandFilter.includes(product.brand);

    return categoryMatch && subcategoryMatch && brandMatch;
  });

  return (
    <div className={styles["admin-products"]}>
      <h1>
        ADMINISTRATION -<span> Produits </span>
      </h1>

      <div className={styles["admin-products-dashboard"]}>
        <div className={styles["admin-products-aside"]}>
          <h3>Filtrer par Catégorie</h3>
          {Array.from(new Set(products.map((product) => product.category))).map(
            (category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={categoryFilter.includes(category)}
                  onChange={() => handleCategoryFilterChange(category)}
                />
                <label htmlFor={`category-${category}`}>{category}</label>
              </div>
            ),
          )}

          <h3>Filtrer par Sous-catégorie</h3>
          {Array.from(
            new Set(
              products
                .filter((product) =>
                  categoryFilter.length === 0
                    ? true
                    : categoryFilter.includes(product.category),
                )
                .map((product) => product.subcategory),
            ),
          ).map((subcategory) => (
            <div key={subcategory}>
              <input
                type="checkbox"
                id={`subcategory-${subcategory}`}
                checked={subcategoryFilter.includes(subcategory)}
                onChange={() => handleSubcategoryFilterChange(subcategory)}
              />
              <label htmlFor={`subcategory-${subcategory}`}>
                {subcategory}
              </label>
            </div>
          ))}

          <h3>Filtrer par Marque</h3>
          {Array.from(new Set(products.map((product) => product.brand))).map(
            (brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={brandFilter.includes(brand)}
                  onChange={() => handleBrandFilterChange(brand)}
                />
                <label htmlFor={`brand-${brand}`}>{brand}</label>
              </div>
            ),
          )}
        </div>

        <div className={styles["admin-products-display"]}>
          {selectedProduct ? (
            <AdminProductForm
              productToEdit={selectedProduct}
              onSubmit={() => {
                setSelectedProduct(null);
              }}
            />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Photo</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Réf</th>
                  <th scope="col">Catégorie</th>
                  <th scope="col">Sous-catégorie</th>
                  <th scope="col">Marque</th>
                  <th scope="col">Prix</th>
                  <th scope="col">updated</th>
                  <th scope="col">Actions</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>
                      {/* on affiche soit l'image stockée sur le serveur, soit l'url de l'image si elle est stockée sur un site externe */}
                      {product.image.startsWith("http") ? (
                        <img src={product.image} alt="" />
                      ) : (
                        <img src={`${BASE_URL}${product.image}`} alt="" />
                      )}
                    </td>
                    {/* <td>{product.name}</td>
                  // lien vers la page produit */}
                    <td>
                      <a href={`${BASE_URL}/boutique/produit/${product._id}`}>
                        {product.name}
                      </a>
                    </td>
                    <td>{product.ref}</td>
                    <td>{product.category}</td>
                    <td>{product.subcategory}</td>
                    <td>{product.brand}</td>
                    <td>{product.price} €</td>
                    <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => {
                          editProduct(product._id);
                        }}
                        className={styles["modify-btn"]}
                      >
                        Modifier
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteProduct(product._id);
                        }}
                        className={styles["delete-btn"]}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
