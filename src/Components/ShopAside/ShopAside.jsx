import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { BASE_URL } from "../../url";

export default function ShopAside({
  setFilteredProducts,
  subcategory,
  category,
}) {
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
  const [selectedDistanceInfrarouge, setSelectedDistanceInfrarouge] = useState(
    [],
  );
  const [installationExtValues, setInstallationExtValues] = useState([]);
  const [selectedInstallationExt, setSelectedInstallationExt] = useState([]);
  const [nbrePortsValues, setNbrePortsValues] = useState([]);
  const [selectedNbrePorts, setSelectedNbrePorts] = useState([]);
  const [rackableValues, setRackableValues] = useState([]);
  const [selectedRackable, setSelectedRackable] = useState([]);
  const [manageableValues, setManageableValues] = useState([]);
  const [selectedManageable, setSelectedManageable] = useState([]);
  const [poeValues, setPoeValues] = useState([]);
  const [selectedPoe, setSelectedPoe] = useState([]);

  const [poePlusValues, setPoePlusValues] = useState([]);
  const [selectedPoePlus, setSelectedPoePlus] = useState([]);

  const [poePlusPlusValues, setPoePlusPlusValues] = useState([]);
  const [selectedPoePlusPlus, setSelectedPoePlusPlus] = useState([]);

  const [usbValues, setUsbValues] = useState([]);
  const [selectedUsb, setSelectedUsb] = useState([]);

  const [debitVpnValues, setDebitVpnValues] = useState([]);
  const [selectedDebitVpn, setSelectedDebitVpn] = useState([]);

  const [maxTcpValues, setMaxTcpValues] = useState([]);
  const [selectedMaxTcp, setSelectedMaxTcp] = useState([]);

  const [debitFirewallValues, setDebitFirewallValues] = useState([]);
  const [selectedDebitFirewall, setSelectedDebitFirewall] = useState([]);

  const [vitesseValues, setVitesseValues] = useState([]);
  const [selectedVitesse, setSelectedVitesse] = useState([]);
  const [typeWifiValues, setTypeWifiValues] = useState([]);
  const [selectedTypeWifi, setSelectedTypeWifi] = useState([]);
  const [antenneValues, setAntenneValues] = useState([]);
  const [selectedAntenne, setSelectedAntenne] = useState([]);
  const [lanValues, setLanValues] = useState([]);
  const [selectedLan, setSelectedLan] = useState([]);
  const [nebulaValues, setNebulaValues] = useState([]);
  const [selectedNebula, setSelectedNebula] = useState([]);

  // Récupération des produits et des marques
  useEffect(() => {
    const fetchProductsAndBrands = async () => {
      try {
        let url = `${BASE_URL}/products?`;
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
          (a, b) => a - b,
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
          (a, b) => a - b,
        );
        setInfrarougeValues(uniqueInfrarouge);

        const distanceInfrarouge = data
          .map((product) => getProductsDistanceInfrarouge(product))
          .filter((value) => value);
        const uniqueDistanceInfrarouge = Array.from(
          new Set(distanceInfrarouge),
        ).sort((a, b) => a - b);
        setDistanceInfrarougeValues(uniqueDistanceInfrarouge);

        const installationExt = data
          .map((product) => getProductsInstallationExt(product).trim())
          .filter((value) => value);
        const uniqueInstallationExt = Array.from(new Set(installationExt)).sort(
          (a, b) => a - b,
        );
        setInstallationExtValues(uniqueInstallationExt);

        const nbrePorts = data
          .map((product) => getProductsNbrePorts(product))
          .filter((value) => value);
        const uniqueNbrePorts = Array.from(new Set(nbrePorts)).sort(
          (a, b) => a - b,
        );
        setNbrePortsValues(uniqueNbrePorts);

        const rackable = data
          .map((product) => getProductsRackable(product).trim())
          .filter((value) => value);
        const uniqueRackable = Array.from(new Set(rackable)).sort(
          (a, b) => a - b,
        );
        setRackableValues(uniqueRackable);

        const manageable = data
          .map((product) => getProductsManageable(product).trim())
          .filter((value) => value);
        const uniqueManageable = Array.from(new Set(manageable)).sort(
          (a, b) => a - b,
        );
        setManageableValues(uniqueManageable);

        const poe = data
          .map((product) => getProductsPoe(product).trim())
          .filter((value) => value);
        const uniquePoe = Array.from(new Set(poe)).sort((a, b) => a - b);
        setPoeValues(uniquePoe);

        const poePlus = data
          .map((product) => getProductsPoePlus(product).trim())
          .filter((value) => value);
        const uniquePoePlus = Array.from(new Set(poePlus)).sort(
          (a, b) => a - b,
        );
        setPoePlusValues(uniquePoePlus);

        const poePlusPlus = data
          .map((product) => getProductsPoePlusPlus(product).trim())
          .filter((value) => value);
        const uniquePoePlusPlus = Array.from(new Set(poePlusPlus)).sort(
          (a, b) => a - b,
        );
        setPoePlusPlusValues(uniquePoePlusPlus);

        const usb = data
          .map((product) => getProductsUsb(product).trim())
          .filter((value) => value);
        const uniqueUsb = Array.from(new Set(usb)).sort((a, b) => a - b);
        setUsbValues(uniqueUsb);

        const debitVpn = data
          .map((product) => getProductsDebitVpn(product).trim())
          .filter((value) => value);
        const uniqueDebitVpn = Array.from(new Set(debitVpn)).sort(
          (a, b) => a - b,
        );
        setDebitVpnValues(uniqueDebitVpn);

        const maxTcp = data
          .map((product) => getProductsMaxTcp(product).trim())
          .filter((value) => value);
        const uniqueMaxTcp = Array.from(new Set(maxTcp)).sort((a, b) => a - b);
        setMaxTcpValues(uniqueMaxTcp);

        const debitFirewall = data
          .map((product) => getProductsDebitFirewall(product).trim())
          .filter((value) => value);
        const uniqueDebitFirewall = Array.from(new Set(debitFirewall)).sort(
          (a, b) => a - b,
        );
        setDebitFirewallValues(uniqueDebitFirewall);

        const vitesse = data
          .map((product) => getProductsVitesse(product).trim())
          .filter((value) => value);
        const uniqueVitesse = Array.from(new Set(vitesse)).sort(
          (a, b) => a - b,
        );
        setVitesseValues(uniqueVitesse);

        const typeWifi = data
          .map((product) => getProductsTypeWifi(product).trim())
          .filter((value) => value);
        const uniqueTypeWifi = Array.from(new Set(typeWifi)).sort(
          (a, b) => a - b,
        );
        setTypeWifiValues(uniqueTypeWifi);

        const antenne = data
          .map((product) => getProductsAntenne(product).trim())
          .filter((value) => value);
        const uniqueAntenne = Array.from(new Set(antenne)).sort(
          (a, b) => a - b,
        );
        setAntenneValues(uniqueAntenne);

        const lan = data
          .map((product) => getProductsLan(product).trim())
          .filter((value) => value);
        const uniqueLan = Array.from(new Set(lan)).sort((a, b) => a - b);
        setLanValues(uniqueLan);

        const nebula = data
          .map((product) => getProductsNebula(product).trim())
          .filter((value) => value);
        const uniqueNebula = Array.from(new Set(nebula)).sort((a, b) => a - b);
        setNebulaValues(uniqueNebula);

        setSelectedBrands([]);
        setSelectedMegapixels([]);
        setSelectedImgSec([]);
        setSelectedColor([]);
        setSelectedInfrarouge([]);
        setSelectedDistanceInfrarouge([]);
        setSelectedInstallationExt([]);
        setSelectedNbrePorts([]);
        setSelectedRackable([]);
        setSelectedManageable([]);
        setSelectedPoe([]);
        setSelectedPoePlus([]);
        setSelectedPoePlusPlus([]);
        setSelectedUsb([]);
        setSelectedDebitVpn([]);
        setSelectedMaxTcp([]);
        setSelectedDebitFirewall([]);
        setSelectedVitesse([]);
        setSelectedTypeWifi([]);
        setSelectedAntenne([]);
        setSelectedLan([]);
        setSelectedNebula([]);
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
        selectedBrands.includes(product.brand),
      );
    }

    if (price > 0) {
      filtered = filtered.filter((product) => product.price <= price);
    }

    if (selectedMegapixels.length > 0) {
      filtered = filtered.filter((product) =>
        selectedMegapixels.includes(getProductMegapixels(product)),
      );
    }

    if (selectedImgSec.length > 0) {
      filtered = filtered.filter((product) =>
        selectedImgSec.includes(getProductsImgSec(product)),
      );
    }

    if (selectedColor.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColor.includes(getColor(product).trim()),
      );
    }

    if (selectedInfrarouge.length > 0) {
      filtered = filtered.filter((product) =>
        selectedInfrarouge.includes(getProductsInfrarouge(product).trim()),
      );
    }

    if (selectedDistanceInfrarouge.length > 0) {
      filtered = filtered.filter((product) =>
        selectedDistanceInfrarouge.includes(
          getProductsDistanceInfrarouge(product),
        ),
      );
    }

    if (selectedInstallationExt.length > 0) {
      filtered = filtered.filter((product) =>
        selectedInstallationExt.includes(
          getProductsInstallationExt(product).trim(),
        ),
      );
    }

    if (selectedNbrePorts.length > 0) {
      filtered = filtered.filter((product) =>
        selectedNbrePorts.includes(getProductsNbrePorts(product)),
      );
    }

    if (selectedRackable.length > 0) {
      filtered = filtered.filter((product) =>
        selectedRackable.includes(getProductsRackable(product).trim()),
      );
    }

    if (selectedManageable.length > 0) {
      filtered = filtered.filter((product) =>
        selectedManageable.includes(getProductsManageable(product).trim()),
      );
    }

    if (selectedPoe.length > 0) {
      filtered = filtered.filter((product) =>
        selectedPoe.includes(getProductsPoe(product).trim()),
      );
    }

    if (selectedPoePlus.length > 0) {
      filtered = filtered.filter((product) =>
        selectedPoePlus.includes(getProductsPoePlus(product).trim()),
      );
    }

    if (selectedPoePlusPlus.length > 0) {
      filtered = filtered.filter((product) =>
        selectedPoePlusPlus.includes(getProductsPoePlusPlus(product).trim()),
      );
    }

    if (selectedUsb.length > 0) {
      filtered = filtered.filter((product) =>
        selectedUsb.includes(getProductsUsb(product).trim()),
      );
    }

    if (selectedDebitVpn.length > 0) {
      filtered = filtered.filter((product) =>
        selectedDebitVpn.includes(getProductsDebitVpn(product).trim()),
      );
    }

    if (selectedMaxTcp.length > 0) {
      filtered = filtered.filter((product) =>
        selectedMaxTcp.includes(getProductsMaxTcp(product).trim()),
      );
    }

    if (selectedDebitFirewall.length > 0) {
      filtered = filtered.filter((product) =>
        selectedDebitFirewall.includes(
          getProductsDebitFirewall(product).trim(),
        ),
      );
    }

    if (selectedVitesse.length > 0) {
      filtered = filtered.filter((product) =>
        selectedVitesse.includes(getProductsVitesse(product).trim()),
      );
    }

    if (selectedTypeWifi.length > 0) {
      filtered = filtered.filter((product) =>
        selectedTypeWifi.includes(getProductsTypeWifi(product).trim()),
      );
    }

    if (selectedAntenne.length > 0) {
      filtered = filtered.filter((product) =>
        selectedAntenne.includes(getProductsAntenne(product).trim()),
      );
    }

    if (selectedLan.length > 0) {
      filtered = filtered.filter((product) =>
        selectedLan.includes(getProductsLan(product).trim()),
      );
    }

    if (selectedNebula.length > 0) {
      filtered = filtered.filter((product) =>
        selectedNebula.includes(getProductsNebula(product).trim()),
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
    selectedNbrePorts,
    selectedRackable,
    selectedManageable,
    selectedPoe,
    selectedPoePlus,
    selectedPoePlusPlus,
    selectedUsb,
    selectedDebitVpn,
    selectedMaxTcp,
    selectedDebitFirewall,
    selectedVitesse,
    selectedTypeWifi,
    selectedAntenne,
    selectedLan,
    selectedNebula,
    allProducts,
    setFilteredProducts,
  ]);

  const handleBrandFilterChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(
        selectedBrands.filter((selectedBrand) => selectedBrand !== brand),
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
        selectedMegapixels.filter((value) => value !== megapixelsValue),
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
        selectedImgSec.filter((value) => value !== imgSecValue),
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
        selectedInfrarouge.filter((value) => value !== infrarougeValue),
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
        selectedDistanceInfrarouge.filter(
          (value) => value !== distanceInfrarougeValue,
        ),
      );
    } else {
      setSelectedDistanceInfrarouge([
        ...selectedDistanceInfrarouge,
        distanceInfrarougeValue,
      ]);
    }
  };

  const getProductsDistanceInfrarouge = (product) => {
    return parseInt(product.details?.distanceInfrarouge || 0);
  };

  const handleInstallationExtChange = (event) => {
    const installationExtValue = event.target.value;
    if (selectedInstallationExt.includes(installationExtValue)) {
      setSelectedInstallationExt(
        selectedInstallationExt.filter(
          (value) => value !== installationExtValue,
        ),
      );
    } else {
      setSelectedInstallationExt([
        ...selectedInstallationExt,
        installationExtValue,
      ]);
    }
  };

  const getProductsInstallationExt = (product) => {
    return product.details?.installationExt || "";
  };

  const handleNbrePortsChange = (event) => {
    const nbrePortsValue = parseInt(event.target.value);
    if (selectedNbrePorts.includes(nbrePortsValue)) {
      setSelectedNbrePorts(
        selectedNbrePorts.filter((value) => value !== nbrePortsValue),
      );
    } else {
      setSelectedNbrePorts([...selectedNbrePorts, nbrePortsValue]);
    }
  };

  const getProductsNbrePorts = (product) => {
    return parseInt(product.details?.nbrePorts || 0);
  };

  const handleRackableChange = (event) => {
    const rackableValue = event.target.value;
    if (selectedRackable.includes(rackableValue)) {
      setSelectedRackable(
        selectedRackable.filter((value) => value !== rackableValue),
      );
    } else {
      setSelectedRackable([...selectedRackable, rackableValue]);
    }
  };

  const getProductsRackable = (product) => {
    return product.details?.rackable || "";
  };

  const handleManageableChange = (event) => {
    const manageableValue = event.target.value;
    if (selectedManageable.includes(manageableValue)) {
      setSelectedManageable(
        selectedManageable.filter((value) => value !== manageableValue),
      );
    } else {
      setSelectedManageable([...selectedManageable, manageableValue]);
    }
  };

  const getProductsManageable = (product) => {
    return product.details?.manageable || "";
  };

  const handlePoeChange = (event) => {
    const poeValue = event.target.value;
    if (selectedPoe.includes(poeValue)) {
      setSelectedPoe(selectedPoe.filter((value) => value !== poeValue));
    } else {
      setSelectedPoe([...selectedPoe, poeValue]);
    }
  };

  const getProductsPoe = (product) => {
    return product.details?.poe || "";
  };

  const handlePoePlusChange = (event) => {
    const poePlusValue = event.target.value;
    if (selectedPoePlus.includes(poePlusValue)) {
      setSelectedPoePlus(
        selectedPoePlus.filter((value) => value !== poePlusValue),
      );
    } else {
      setSelectedPoePlus([...selectedPoePlus, poePlusValue]);
    }
  };

  const getProductsPoePlus = (product) => {
    return product.details?.poePlus || "";
  };

  const handlePoePlusPlusChange = (event) => {
    const poePlusPlusValue = event.target.value;
    if (selectedPoePlusPlus.includes(poePlusPlusValue)) {
      setSelectedPoePlusPlus(
        selectedPoePlusPlus.filter((value) => value !== poePlusPlusValue),
      );
    } else {
      setSelectedPoePlusPlus([...selectedPoePlusPlus, poePlusPlusValue]);
    }
  };

  const getProductsPoePlusPlus = (product) => {
    return product.details?.poePlusPlus || "";
  };

  const handleUsbChange = (event) => {
    const usbValue = event.target.value;
    if (selectedUsb.includes(usbValue)) {
      setSelectedUsb(selectedUsb.filter((value) => value !== usbValue));
    } else {
      setSelectedUsb([...selectedUsb, usbValue]);
    }
  };

  const getProductsUsb = (product) => {
    return product.details?.usb || "";
  };

  const handleDebitVpnChange = (event) => {
    const debitVpnValue = event.target.value;
    if (selectedDebitVpn.includes(debitVpnValue)) {
      setSelectedDebitVpn(
        selectedDebitVpn.filter((value) => value !== debitVpnValue),
      );
    } else {
      setSelectedDebitVpn([...selectedDebitVpn, debitVpnValue]);
    }
  };

  const getProductsDebitVpn = (product) => {
    return product.details?.debitVpn || "";
  };

  const handleMaxTcpChange = (event) => {
    const maxTcpValue = event.target.value;
    if (selectedMaxTcp.includes(maxTcpValue)) {
      setSelectedMaxTcp(
        selectedMaxTcp.filter((value) => value !== maxTcpValue),
      );
    } else {
      setSelectedMaxTcp([...selectedMaxTcp, maxTcpValue]);
    }
  };

  const getProductsMaxTcp = (product) => {
    return product.details?.maxTcp || "";
  };

  const handleDebitFirewallChange = (event) => {
    const debitFirewallValue = event.target.value;
    if (selectedDebitFirewall.includes(debitFirewallValue)) {
      setSelectedDebitFirewall(
        selectedDebitFirewall.filter((value) => value !== debitFirewallValue),
      );
    } else {
      setSelectedDebitFirewall([...selectedDebitFirewall, debitFirewallValue]);
    }
  };

  const getProductsDebitFirewall = (product) => {
    return product.details?.debitFirewall || "";
  };

  const handleVitesseChange = (event) => {
    const vitesseValue = event.target.value;
    if (selectedVitesse.includes(vitesseValue)) {
      setSelectedVitesse(
        selectedVitesse.filter((value) => value !== vitesseValue),
      );
    } else {
      setSelectedVitesse([...selectedVitesse, vitesseValue]);
    }
  };

  const getProductsVitesse = (product) => {
    return product.details?.vitesse || "";
  };

  const handleTypeWifiChange = (event) => {
    const typeWifiValue = event.target.value;
    if (selectedTypeWifi.includes(typeWifiValue)) {
      setSelectedTypeWifi(
        selectedTypeWifi.filter((value) => value !== typeWifiValue),
      );
    } else {
      setSelectedTypeWifi([...selectedTypeWifi, typeWifiValue]);
    }
  };

  const getProductsTypeWifi = (product) => {
    return product.details?.typeWifi || "";
  };

  const handleAntenneChange = (event) => {
    const antenneValue = event.target.value;
    if (selectedAntenne.includes(antenneValue)) {
      setSelectedAntenne(
        selectedAntenne.filter((value) => value !== antenneValue),
      );
    } else {
      setSelectedAntenne([...selectedAntenne, antenneValue]);
    }
  };

  const getProductsAntenne = (product) => {
    return product.details?.antenne || "";
  };

  const handleLanChange = (event) => {
    const lanValue = event.target.value;
    if (selectedLan.includes(lanValue)) {
      setSelectedLan(selectedLan.filter((value) => value !== lanValue));
    } else {
      setSelectedLan([...selectedLan, lanValue]);
    }
  };

  const getProductsLan = (product) => {
    return product.details?.lan || "";
  };

  const handleNebulaChange = (event) => {
    const nebulaValue = event.target.value;
    if (selectedNebula.includes(nebulaValue)) {
      setSelectedNebula(
        selectedNebula.filter((value) => value !== nebulaValue),
      );
    } else {
      setSelectedNebula([...selectedNebula, nebulaValue]);
    }
  };

  const getProductsNebula = (product) => {
    return product.details?.nebula || "";
  };

  return (
    <div className={styles.shopAside_container}>
      {brands.length > 0 && (
        <div className={styles.filter}>
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

      <div className={styles.filter}>
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
        <div className={styles.filter}>
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
        <div className={styles.filter}>
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
        <div className={styles.filter}>
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
        <div className={styles.filter}>
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
        <div className={styles.filter}>
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
                </label>{" "}
                m
              </li>
            ))}
          </ul>
        </div>
      )}

      {installationExtValues.length > 0 && (
        <div className={styles.filter}>
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

      {nbrePortsValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Nombre de ports</h2>
          <ul>
            {nbrePortsValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleNbrePortsChange}
                    checked={selectedNbrePorts.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {rackableValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Rackable</h2>
          <ul>
            {rackableValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleRackableChange}
                    checked={selectedRackable.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {manageableValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Manageable</h2>
          <ul>
            {manageableValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleManageableChange}
                    checked={selectedManageable.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {poeValues.length > 0 && (
        <div className={styles.filter}>
          <h2>PoE</h2>
          <ul>
            {poeValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handlePoeChange}
                    checked={selectedPoe.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {poePlusValues.length > 0 && (
        <div className={styles.filter}>
          <h2>PoE+</h2>
          <ul>
            {poePlusValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handlePoePlusChange}
                    checked={selectedPoePlus.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {poePlusPlusValues.length > 0 && (
        <div className={styles.filter}>
          <h2>PoE++</h2>
          <ul>
            {poePlusPlusValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handlePoePlusPlusChange}
                    checked={selectedPoePlusPlus.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {usbValues.length > 0 && (
        <div className={styles.filter}>
          <h2>USB</h2>
          <ul>
            {usbValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleUsbChange}
                    checked={selectedUsb.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {debitVpnValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Débit VPN</h2>
          <ul>
            {debitVpnValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleDebitVpnChange}
                    checked={selectedDebitVpn.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {maxTcpValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Débit TCP</h2>
          <ul>
            {maxTcpValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleMaxTcpChange}
                    checked={selectedMaxTcp.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {debitFirewallValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Débit Firewall</h2>
          <ul>
            {debitFirewallValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleDebitFirewallChange}
                    checked={selectedDebitFirewall.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {vitesseValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Vitesse</h2>
          <ul>
            {vitesseValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleVitesseChange}
                    checked={selectedVitesse.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {typeWifiValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Type Wifi</h2>
          <ul>
            {typeWifiValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleTypeWifiChange}
                    checked={selectedTypeWifi.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {antenneValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Antenne</h2>
          <ul>
            {antenneValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleAntenneChange}
                    checked={selectedAntenne.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lanValues.length > 0 && (
        <div className={styles.filter}>
          <h2>LAN</h2>
          <ul>
            {lanValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleLanChange}
                    checked={selectedLan.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {nebulaValues.length > 0 && (
        <div className={styles.filter}>
          <h2>Nebula</h2>
          <ul>
            {nebulaValues.map((value) => (
              <li key={value}>
                <label>
                  <input
                    type="checkbox"
                    value={value}
                    onChange={handleNebulaChange}
                    checked={selectedNebula.includes(value)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
