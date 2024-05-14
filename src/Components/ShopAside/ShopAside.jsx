import React, { useState, useEffect } from 'react';
import './style.scss';

export default function ShopAside({ setFilteredProducts, subcategory }) {
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [filteredProducts, setFilteredProductsByBrand] = useState([]);

    useEffect(() => {
        const fetchProductsAndBrands = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products?subcategory=${encodeURIComponent(subcategory)}`);
                const data = await response.json();
                const uniqueBrands = [...new Set(data.map((product) => product.brand))];
                setBrands(uniqueBrands);
                setFilteredProductsByBrand(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };

        fetchProductsAndBrands();
    }, [subcategory]);

    const handleBrandFilterChange = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((selectedBrand) => selectedBrand !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    useEffect(() => {
        // Filtrer les produits en fonction des marques sélectionnées
        if (selectedBrands.length === 0) {
            setFilteredProducts(filteredProducts);
        } else {
            const filtered = filteredProducts.filter((product) => selectedBrands.includes(product.brand));
            setFilteredProducts(filtered);
        }
    }, [selectedBrands, filteredProducts, setFilteredProducts]);

    return (
        <aside className="shopAside-container">
            <h2>Marques</h2>
            <ul>
                {brands.map((brand) => (
                    <li key={brand}>
                        <label>
                            <input
                                type="checkbox"
                                value={brand}
                                onChange={() => handleBrandFilterChange(brand)}
                                checked={selectedBrands.includes(brand)}
                            />
                            {brand}
                        </label>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
