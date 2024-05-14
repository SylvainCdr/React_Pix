import React, { useState, useEffect } from 'react';
import './style.scss';

export default function ShopAside({ setFilteredProducts, subcategory }) {
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [filteredProducts, setFilteredProductsByBrand] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchProductsAndBrands = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products?subcategory=${encodeURIComponent(subcategory)}`);
                const data = await response.json();
                const uniqueBrands = [...new Set(data.map((product) => product.brand))];
                setBrands(uniqueBrands);
                setFilteredProductsByBrand(data);
                // Calculer le prix minimum et maximum
                const min = Math.min(...data.map((product) => product.price));
                const max = Math.max(...data.map((product) => product.price));
                setPriceRange({ min, max });
                // Réinitialiser les filtres de marque et de prix
                setSelectedBrands([]);
                setPrice(0);
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

    // Filtrer les produits par prix
    const handlePriceRangeChange = (event) => {
        const selectedPrice = parseInt(event.target.value);
        setPrice(selectedPrice);
        const filtered = filteredProducts.filter((product) => product.price <= selectedPrice);
        setFilteredProducts(filtered);
    };

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

            <h2>Prix</h2>
            <input
                type="range"
                min={priceRange.min}
                max={priceRange.max + 1}
                value={price}
                onChange={handlePriceRangeChange}
            />
            <span>{price} €</span>
            
        </aside>
    );
}
