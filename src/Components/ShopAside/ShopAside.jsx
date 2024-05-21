import React, { useState, useEffect } from "react";
import "./style.scss";

export default function ShopAside({ setFilteredProducts, subcategory, category}) {
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [price, setPrice] = useState(0);
  const [megapixelsValues, setMegapixelsValues] = useState([]);
  const [selectedMegapixels, setSelectedMegapixels] = useState([]);
  const [imgSecValues, setImgSecValues] = useState([]);
  const [selectedImgSec, setSelectedImgSec] = useState([]);
  const [colorValues, setColorValues] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [infrarougeValues, setInfrarougeValues] = useState([]);
  const [selectedInfrarouge, setSelectedInfrarouge] = useState([]);
  const [distanceInfrarougeValues, setDistanceInfrarougeValues] = useState([]);
  const [selectedDistanceInfrarouge, setSelectedDistanceInfrarouge] = useState([]);
  const [installationExtValues, setInstallationExtValues] = useState([]);
  const [selectedInstallationExt, setSelectedInstallationExt] = useState([]);

  // Récupération des produits et des marques
  useEffect(() => {
    const fetchProductsAndBrands = async () => {
      try {
        let url = `http://localhost:3001/products?`;
        if (subcategory) {
          url += `subcategory=${encodeURIComponent(subcategory)}&`;
        }
        if (category) {
          url += `category=${encodeURIComponent(category)}&`;
        }
  
        const response = await fetch(url);
        const data = await response.json();
  
        if (!data.length) {
          return; // Si aucun produit n'est retourné, ne rien faire
        }
        

        const uniqueBrands = [...new Set(data.map((product) => product.brand))];
        setBrands(uniqueBrands);
        setAllProducts(data);

        const minPrice = Math.min(...data.map((product) => product.price));
        const maxPrice = Math.max(...data.map((product) => product.price));
        setPriceRange({ min: minPrice, max: maxPrice });
        setPrice(maxPrice);

        const megapixels = data
          .map((product) => getProductMegapixels(product))
          .filter((value) => value);
        const uniqueMegapixels = Array.from(new Set(megapixels)).sort(
          (a, b) => a - b
        );
        setMegapixelsValues(uniqueMegapixels);

        const imgSec = data
          .map((product) => getProductsImgSec(product))
          .filter((value) => value);
        const uniqueImgSec = Array.from(new Set(imgSec)).sort((a, b) => a - b);
        setImgSecValues(uniqueImgSec);

        const colors = data
          .map((product) => getColor(product).trim())
          .filter((value) => value);
        const uniqueColors = Array.from(new Set(colors)).sort();
        setColorValues(uniqueColors);

        const infrarouge = data
          .map((product) => getProductsInfrarouge(product).trim())
          .filter((value) => value);
        const uniqueInfrarouge = Array.from(new Set(infrarouge)).sort(
          (a, b) => a - b
        );
        setInfrarougeValues(uniqueInfrarouge);

        const distanceInfrarouge = data
          .map((product) => getProductsDistanceInfrarouge(product))
          .filter((value) => value);
        const uniqueDistanceInfrarouge = Array.from(new Set(distanceInfrarouge)).sort(
          (a, b) => a - b
        );
        setDistanceInfrarougeValues(uniqueDistanceInfrarouge);

        const installationExt = data
          .map((product) => getProductsInstallationExt(product).trim())
          .filter((value) => value);
        const uniqueInstallationExt = Array.from(new Set(installationExt)).sort(
          (a, b) => a - b
        );
        setInstallationExtValues(uniqueInstallationExt);

        

        setSelectedBrands([]);
        setSelectedMegapixels([]);
        setSelectedImgSec([]);
        setSelectedColor([]);
        setSelectedInfrarouge([]);
        setSelectedDistanceInfrarouge([]);
        setSelectedInstallationExt([]);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProductsAndBrands();
  }, [subcategory, category]);

  useEffect(() => {
    let filtered = allProducts;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (price > 0) {
      filtered = filtered.filter((product) => product.price <= price);
    }

    if (selectedMegapixels.length > 0) {
      filtered = filtered.filter((product) =>
        selectedMegapixels.includes(getProductMegapixels(product))
      );
    }

    if (selectedImgSec.length > 0) {
      filtered = filtered.filter((product) =>
        selectedImgSec.includes(getProductsImgSec(product))
      );
    }

    if (selectedColor.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColor.includes(getColor(product).trim())
      );
    }

    if (selectedInfrarouge.length > 0) {
      filtered = filtered.filter((product) =>
        selectedInfrarouge.includes(getProductsInfrarouge(product).trim())
      );
    }

    if (selectedDistanceInfrarouge.length > 0) {
      filtered = filtered.filter((product) =>
        selectedDistanceInfrarouge.includes(getProductsDistanceInfrarouge(product))
      );
    }

    if (selectedInstallationExt.length > 0) {
      filtered = filtered.filter((product) =>
        selectedInstallationExt.includes(getProductsInstallationExt(product).trim())
      );
    }

    setFilteredProducts(filtered);
  }, [
    selectedBrands,
    price,
    selectedMegapixels,
    selectedImgSec,
    selectedColor,
    selectedInfrarouge,
    selectedDistanceInfrarouge,
    selectedInstallationExt,
    allProducts,
    setFilteredProducts,
  ]);

  const handleBrandFilterChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brand)
      );
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handlePriceRangeChange = (event) => {
    const selectedPrice = parseInt(event.target.value);
    setPrice(selectedPrice);
  };

  const handleMegapixelsChange = (event) => {
    const megapixelsValue = parseInt(event.target.value);
    if (selectedMegapixels.includes(megapixelsValue)) {
      setSelectedMegapixels(
        selectedMegapixels.filter((value) => value !== megapixelsValue)
      );
    } else {
      setSelectedMegapixels([...selectedMegapixels, megapixelsValue]);
    }
  };

  const getProductMegapixels = (product) => {
    return parseInt(product.details?.megapixels || 0);
  };

  const handleImgSecChange = (event) => {
    const imgSecValue = parseInt(event.target.value);
    if (selectedImgSec.includes(imgSecValue)) {
      setSelectedImgSec(
        selectedImgSec.filter((value) => value !== imgSecValue)
      );
    } else {
      setSelectedImgSec([...selectedImgSec, imgSecValue]);
    }
  };

  const getProductsImgSec = (product) => {
    return parseInt(product.details?.imgSec || 0);
  };

  const handleColorChange = (event) => {
    const colorValue = event.target.value;
    if (selectedColor.includes(colorValue)) {
      setSelectedColor(selectedColor.filter((value) => value !== colorValue));
    } else {
      setSelectedColor([...selectedColor, colorValue]);
    }
  };

  const getColor = (product) => {
    return product.details?.couleur || "";
  };

  const handleInfrarougeChange = (event) => {
    const infrarougeValue = event.target.value;
    if (selectedInfrarouge.includes(infrarougeValue)) {
      setSelectedInfrarouge(
        selectedInfrarouge.filter((value) => value !== infrarougeValue)
      );
    } else {
      setSelectedInfrarouge([...selectedInfrarouge, infrarougeValue]);
    }
  };

  const getProductsInfrarouge = (product) => {
    return product.details?.infrarouge || "";
  };

  const handleDistanceInfrarougeChange = (event) => {
    const distanceInfrarougeValue = parseInt(event.target.value);
    if (selectedDistanceInfrarouge.includes(distanceInfrarougeValue)) {
      setSelectedDistanceInfrarouge(
        selectedDistanceInfrarouge.filter((value) => value !== distanceInfrarougeValue)
      );
    } else {
      setSelectedDistanceInfrarouge([...selectedDistanceInfrarouge, distanceInfrarougeValue]);
    }
  };

  const getProductsDistanceInfrarouge = (product) => {
    return parseInt(product.details?.distanceInfrarouge || 0);
  };

  const handleInstallationExtChange = (event) => {
    const installationExtValue = event.target.value;
    if (selectedInstallationExt.includes(installationExtValue)) {
      setSelectedInstallationExt(
        selectedInstallationExt.filter((value) => value !== installationExtValue)
      );
    } else {
      setSelectedInstallationExt([...selectedInstallationExt, installationExtValue]);
    }
  };

  const getProductsInstallationExt = (product) => {
    return product.details?.installationExt || "";
  };

  return (
    <aside className="shopAside-container">
      {brands.length > 0 && (
        <div className="brand-filter">
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
        </div>
      )}

      <div className="price-filter">
        <h2>Prix</h2>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={price}
          onChange={handlePriceRangeChange}
        />
        <span>{price} € HT</span>
      </div>

      {megapixelsValues.length > 0 && (
        <div className="megapixels-filter">
          <h2>Mégapixels</h2>
          <ul>
            {megapixelsValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleMegapixelsChange}
                    checked={selectedMegapixels.includes(value)}
                  />
                  {value}
                </label>{" "}
                MP
              </li>
            ))}
          </ul>
        </div>
      )}

      {imgSecValues.length > 0 && (
        <div className="imgSec-filter">
          <h2>Images par seconde</h2>
          <ul>
            {imgSecValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleImgSecChange}
                    checked={selectedImgSec.includes(value)}
                  />
                  {value}
                </label>{" "}
                FPS
              </li>
            ))}
          </ul>
        </div>
      )}

      {colorValues.length > 0 && (
        <div className="color-filter">
          <h2>Couleur</h2>
          <ul>
            {colorValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleColorChange}
                    checked={selectedColor.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {infrarougeValues.length > 0 && (
        <div className="infrarouge-filter">
          <h2>Infrarouge</h2>
          <ul>
            {infrarougeValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleInfrarougeChange}
                    checked={selectedInfrarouge.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {distanceInfrarougeValues.length > 0 && (
        <div className="distanceInfrarouge-filter">
          <h2>Distance infrarouge</h2>
          <ul>
            {distanceInfrarougeValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleDistanceInfrarougeChange}
                    checked={selectedDistanceInfrarouge.includes(value)}
                  />
                  {value}
                </label> m
              </li>
            ))}
          </ul>
        </div>
      )}

      {installationExtValues.length > 0 && (
        <div className="installationExt-filter">
          <h2>Installation extérieure</h2>
          <ul>
            {installationExtValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleInstallationExtChange}
                    checked={selectedInstallationExt.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

    </aside>
  );
}
