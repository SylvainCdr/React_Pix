import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { BASE_URL } from "../../url";

export default function AdminProductForm({ onSubmit, productToEdit }) {
  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [presentation, setPresentation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("defaultCategory");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] =
    useState("defaultSubcategory");
  const [brand, setBrand] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("defaultBrand");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null); // Ajout d'un état pour le fichier d'image
  const [pdf, setPdf] = useState("");

  // Caractéristiques 2ndaires
  const [detailsDimensions, setDetailsDimensions] = useState("");
  const [detailsPoids, setDetailsPoids] = useState("");
  const [detailsTemp, setDetailsTemp] = useState("");
  const [detailsMegapixels, setDetailsMegapixels] = useState("");
  const [detailsDistanceFocale, setDetailsDistanceFocale] = useState("");
  const [detailsOuverture, setDetailsOuverture] = useState("");
  const [detailsAngleVue, setDetailsAngleVue] = useState("");
  const [detailsImgSec, setDetailsImgSec] = useState("");
  const [detailsCapteur, setDetailsCapteur] = useState("");
  const [detailsResolution, setDetailsResolution] = useState("");
  const [detailsCouleur, setDetailsCouleur] = useState("");
  const [detailsInfrarouge, setDetailsInfrarouge] = useState("");
  const [detailsDistanceInfrarouge, setDetailsDistanceInfrarouge] =
    useState("");
  const [detailsIndiceProtection, setDetailsIndiceProtection] = useState("");
  const [detailsPuissance, setDetailsPuissance] = useState("");
  const [detailsInstallationExt, setDetailsInstallationExt] = useState("");
  const [detailsNbrePorts, setDetailsNbrePorts] = useState("");
  const [detailsRackable, setDetailsRackable] = useState("");
  const [detailsManageable, setDetailsManageable] = useState("");
  const [detailsPoe, setDetailsPoe] = useState("");
  const [detailsPoePlus, setDetailsPoePlus] = useState("");
  const [detailsPoePlusPlus, setDetailsPoePlusPlus] = useState("");
  const [detailsConsommation, setDetailsConsommation] = useState("");
  const [detailsGarantie, setDetailsGarantie] = useState("");
  const [detailsInterface, setDetailsInterface] = useState("");
  const [detailsUsb, setDetailsUsb] = useState("");
  const [detailsPortConsole, setDetailsPortConsole] = useState("");
  const [detailsDebitVpn, setDetailsDebitVpn] = useState("");
  const [detailsMaxTcp, setDetailsMaxTcp] = useState("");
  const [detailsDebitFirewall, setDetailsDebitFirewall] = useState("");
  const [detailsVitesse, setDetailsVitesse] = useState("");
  const [detailsTypeWifi, setDetailsTypeWifi] = useState("");
  const [detailsAntenne, setDetailsAntenne] = useState("");
  const [detailsLan, setDetailsLan] = useState("");
  const [detailsNebula, setDetailsNebula] = useState("");

  // Effet pour remplir le formulaire avec les données du produit à éditer
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setRef(productToEdit.ref || "");
      setPresentation(productToEdit.presentation || "");
      setDescription(productToEdit.description || "");
      setCategory(productToEdit.category || "");
      setSubcategory(productToEdit.subcategory || "");
      setBrand(productToEdit.brand || "");
      setPrice(productToEdit.price || 0);
      setImage(productToEdit.image || "");
      setImageFile(null); // Réinitialisez l'image pour éviter de l'afficher à nouveau
      setPdf(productToEdit.pdf || "");
      setSelectedCategory(productToEdit.category || "defaultCategory");
      setSelectedSubcategory(productToEdit.subcategory || "defaultSubcategory");
      setSelectedBrand(productToEdit.brand || "defaultBrand");
      // Caractéristiques 2ndaires
      setDetailsDimensions(
        productToEdit.details ? productToEdit.details.dimensions || "" : "",
      );
      setDetailsPoids(
        productToEdit.details ? productToEdit.details.poids || "" : "",
      );
      setDetailsTemp(
        productToEdit.details ? productToEdit.details.temp || "" : "",
      );
      setDetailsMegapixels(
        productToEdit.details ? productToEdit.details.megapixels || "" : "",
      );
      setDetailsDistanceFocale(
        productToEdit.details ? productToEdit.details.distanceFocale || "" : "",
      );
      setDetailsOuverture(
        productToEdit.details ? productToEdit.details.ouverture || "" : "",
      );
      setDetailsAngleVue(
        productToEdit.details ? productToEdit.details.angleVue || "" : "",
      );
      setDetailsImgSec(
        productToEdit.details ? productToEdit.details.imgSec || "" : "",
      );
      setDetailsCapteur(
        productToEdit.details ? productToEdit.details.capteur || "" : "",
      );
      setDetailsResolution(
        productToEdit.details ? productToEdit.details.resolution || "" : "",
      );
      setDetailsCouleur(
        productToEdit.details ? productToEdit.details.couleur || "" : "",
      );
      setDetailsInfrarouge(
        productToEdit.details ? productToEdit.details.infrarouge || "" : "",
      );
      setDetailsDistanceInfrarouge(
        productToEdit.details
          ? productToEdit.details.distanceInfrarouge || ""
          : "",
      );
      setDetailsIndiceProtection(
        productToEdit.details
          ? productToEdit.details.indiceProtection || ""
          : "",
      );
      setDetailsPuissance(
        productToEdit.details ? productToEdit.details.puissance || "" : "",
      );
      setDetailsInstallationExt(
        productToEdit.details
          ? productToEdit.details.installationExt || ""
          : "",
      );
      setDetailsNbrePorts(
        productToEdit.details ? productToEdit.details.nbrePorts || "" : "",
      );
      setDetailsRackable(
        productToEdit.details ? productToEdit.details.rackable || "" : "",
      );
      setDetailsManageable(
        productToEdit.details ? productToEdit.details.manageable || "" : "",
      );
      setDetailsPoe(
        productToEdit.details ? productToEdit.details.poe || "" : "",
      );
      setDetailsPoePlus(
        productToEdit.details ? productToEdit.details.poePlus || "" : "",
      );
      setDetailsPoePlusPlus(
        productToEdit.details ? productToEdit.details.poePlusPlus || "" : "",
      );
      setDetailsConsommation(
        productToEdit.details ? productToEdit.details.consommation || "" : "",
      );
      setDetailsGarantie(
        productToEdit.details ? productToEdit.details.garantie || "" : "",
      );
      setDetailsInterface(
        productToEdit.details ? productToEdit.details.interface || "" : "",
      );
      setDetailsUsb(
        productToEdit.details ? productToEdit.details.usb || "" : "",
      );
      setDetailsPortConsole(
        productToEdit.details ? productToEdit.details.portConsole || "" : "",
      );
      setDetailsDebitVpn(
        productToEdit.details ? productToEdit.details.debitVpn || "" : "",
      );
      setDetailsMaxTcp(
        productToEdit.details ? productToEdit.details.maxTcp || "" : "",
      );
      setDetailsDebitFirewall(
        productToEdit.details ? productToEdit.details.debitFirewall || "" : "",
      );
      setDetailsVitesse(
        productToEdit.details ? productToEdit.details.vitesse || "" : "",
      );
      setDetailsTypeWifi(
        productToEdit.details ? productToEdit.details.typeWifi || "" : "",
      );
      setDetailsAntenne(
        productToEdit.details ? productToEdit.details.antenne || "" : "",
      );
      setDetailsLan(
        productToEdit.details ? productToEdit.details.lan || "" : "",
      );
      setDetailsNebula(
        productToEdit.details ? productToEdit.details.nebula || "" : "",
      );
    }
  }, [productToEdit]);

  // Gérer le changement de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Avant ajout nouvelle sous-catégorie :", subcategory);

    // Construire l'objet produit
    let product = {
      name,
      ref,
      presentation,
      description,
      category:
        selectedCategory === "newCategory" ? newCategory : selectedCategory,
      subcategory:
        selectedSubcategory === "newSubcategory"
          ? newSubcategory
          : selectedSubcategory,
      brand: selectedBrand === "newBrand" ? newBrand : selectedBrand,
      price,
      image,
      imageFile,
      pdf,
      dimensions: detailsDimensions,
      poids: detailsPoids,
      temp: detailsTemp,
      megapixels: detailsMegapixels,
      distanceFocale: detailsDistanceFocale,
      ouverture: detailsOuverture,
      angleVue: detailsAngleVue,
      imgSec: detailsImgSec,
      capteur: detailsCapteur,
      resolution: detailsResolution,
      couleur: detailsCouleur,
      infrarouge: detailsInfrarouge,
      distanceInfrarouge: detailsDistanceInfrarouge,
      indiceProtection: detailsIndiceProtection,
      puissance: detailsPuissance,
      installationExt: detailsInstallationExt,
      nbrePorts: detailsNbrePorts,
      rackable: detailsRackable,
      manageable: detailsManageable,
      poe: detailsPoe,
      poePlus: detailsPoePlus,
      poePlusPlus: detailsPoePlusPlus,
      consommation: detailsConsommation,
      garantie: detailsGarantie,
      interface: detailsInterface,
      usb: detailsUsb,
      portConsole: detailsPortConsole,
      debitVpn: detailsDebitVpn,
      maxTcp: detailsMaxTcp,
      debitFirewall: detailsDebitFirewall,
      vitesse: detailsVitesse,
      typeWifi: detailsTypeWifi,
      antenne: detailsAntenne,
      lan: detailsLan,
      nebula: detailsNebula,
    };

    console.log("Après ajout nouvelle sous-catégorie :", product.subcategory);

    // Télécharger l'image si un fichier est sélectionné
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("fileName", imageFile.name); // Utilisez `imageFile.name` comme nom de fichier
      console.log(imageFile.name);

      try {
        const response = await fetch(`${BASE_URL}/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        product.image = data.url;
      } catch (error) {
        console.error("Erreur lors de l'upload de l'image:", error);
        return;
      }
    }

    // Ajouter l'identifiant du produit si disponible
    if (productToEdit && productToEdit._id) {
      product._id = productToEdit._id;
    }

    // Appeler la fonction de soumission fournie par le parent
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["admin-product-form"]}>
        <div className={styles["main-details"]}>
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
            <option value="defaultCategory" disabled hidden>
              Sélectionnez une catégorie
            </option>
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
            value={selectedSubcategory}
            onChange={(e) => {
              setSelectedSubcategory(e.target.value);
              if (e.target.value !== "newSubcategory") {
                setSubcategory(e.target.value);
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
                <option value="Modules Wifi">Modules Wifi</option>
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
              </>
            )}

            {/* Option pour écrire une nouvelle sous-catégorie */}
            <option value="defaultSubcategory" disabled hidden>
              Sélectionnez une sous-catégorie
            </option>
            <option value="newSubcategory">
              Saisir une nouvelle sous-catégorie
            </option>
          </select>
          {selectedSubcategory === "newSubcategory" && (
            <div>
              <label htmlFor="newSubcategoryInput">
                Nouvelle sous-catégorie
              </label>
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
            {/* Si la catégorie est "Cameras", affichez les options suivantes */}
            {category === "Caméras" && (
              <>
                <option value="Bosch">Bosch</option>
                <option value="I-Pro">I-Pro</option>
                <option value="Vivotek">Vivotek</option>
              </>
            )}
            {/* Si la catégorie est "Réseau", affichez les options suivantes */}
            {category === "Réseau" && (
              <>
                <option value="Zyxel">Zyxel</option>
                <option value="Cisco">Cisco</option>
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
            {/* Si la catégorie est "Cameras", affichez les options suivantes */}
            {category === "Autres" && (
              <>
                <option value="Non spécifié">Non spécifié</option>
                <option value="Zyxel">Zyxel</option>
              </>
            )}

            {/* Option pour écrire une nouvelle catégorie */}
            <option value="defaultBrand" disabled hidden>
              Sélectionnez une marque
            </option>
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
          <label htmlFor="presentation">Présentation</label>
          <input
            type="text"
            name="presentation"
            id="presentation"
            value={presentation}
            onChange={(e) => setPresentation(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text-area"
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
          <label htmlFor="imageFile">Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <label htmlFor="image">URL de l'image</label>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className={styles["image-preview"]}
            />
          )}

          <label htmlFor="pdf">URL du PDF</label>
          <input
            type="text"
            name="pdf"
            id="pdf"
            value={pdf}
            onChange={(e) => setPdf(e.target.value)}
          />
        </div>
        <div className={styles["details-1"]}>
          <label htmlFor="detailsDimensions">Dimensions</label>
          <input
            type="text"
            name="detailsDimensions"
            id="detailsDimensions"
            value={detailsDimensions}
            onChange={(e) => setDetailsDimensions(e.target.value)}
          />
          <label htmlFor="detailsPoids">Poids</label>
          <input
            type="text"
            name="detailsPoids"
            id="detailsPoids"
            value={detailsPoids}
            onChange={(e) => setDetailsPoids(e.target.value)}
          />
          <label htmlFor="detailsTemp">Températures de fonctionnement</label>
          <input
            type="text"
            name="detailsTemp"
            id="detailsTemp"
            value={detailsTemp}
            onChange={(e) => setDetailsTemp(e.target.value)}
          />

          <label htmlFor="detailsmegapixels">Mégapixels</label>
          <input
            type="text"
            name="detailsmegapixels"
            id="detailsmegapixels"
            value={detailsMegapixels}
            onChange={(e) => setDetailsMegapixels(e.target.value)}
          />
          <label htmlFor="detailsDistanceFocale">Distance focale</label>
          <input
            type="text"
            name="detailsDistanceFocale"
            id="detailsDistanceFocale"
            value={detailsDistanceFocale}
            onChange={(e) => setDetailsDistanceFocale(e.target.value)}
          />
          <label htmlFor="detailsOuverture">Ouverture</label>
          <input
            type="text"
            name="detailsOuverture"
            id="detailsOuverture"
            value={detailsOuverture}
            onChange={(e) => setDetailsOuverture(e.target.value)}
          />
          <label htmlFor="detailsAngleVue">Angle de vue</label>
          <input
            type="text"
            name="detailsAngleVue"
            id="detailsAngleVue"
            value={detailsAngleVue}
            onChange={(e) => setDetailsAngleVue(e.target.value)}
          />
          <label htmlFor="detailsImgSec">Images par seconde</label>
          <input
            type="text"
            name="detailsImgSec"
            id="detailsImgSec"
            value={detailsImgSec}
            onChange={(e) => setDetailsImgSec(e.target.value)}
          />
          <label htmlFor="detailsCapteur">Capteur</label>
          <input
            type="text"
            name="detailsCapteur"
            id="detailsCapteur"
            value={detailsCapteur}
            onChange={(e) => setDetailsCapteur(e.target.value)}
          />
          <label htmlFor="detailsResolution">Résolution</label>
          <input
            type="text"
            name="detailsResolution"
            id="detailsResolution"
            value={detailsResolution}
            onChange={(e) => setDetailsResolution(e.target.value)}
          />
          <label htmlFor="detailsCouleur">Couleur</label>
          <input
            type="text"
            name="detailsCouleur"
            id="detailsCouleur"
            value={detailsCouleur}
            onChange={(e) => setDetailsCouleur(e.target.value)}
          />
          <label htmlFor="detailsInfrarouge">Infra-rouge</label>
          <input
            type="text"
            name="detailsInfrarouge"
            id="detailsInfrarouge"
            value={detailsInfrarouge}
            onChange={(e) => setDetailsInfrarouge(e.target.value)}
          />
          <label htmlFor="detailsDistanceInfrarouge">
            Distance infra-rouge
          </label>
          <input
            type="text"
            name="detailsDistanceInfrarouge"
            id="detailsDistanceInfrarouge"
            value={detailsDistanceInfrarouge}
            onChange={(e) => setDetailsDistanceInfrarouge(e.target.value)}
          />
          <label htmlFor="detailsIndiceProtection">Indice de protection</label>
          <input
            type="text"
            name="detailsIndiceProtection"
            id="detailsIndiceProtection"
            value={detailsIndiceProtection}
            onChange={(e) => setDetailsIndiceProtection(e.target.value)}
          />
          {/* Si la categorie est Camera alors on affiche les input suivants : */}

          <label htmlFor="detailsPuissance">Puissance</label>
          <input
            type="text"
            name="detailsPuissance"
            id="detailsPuissance"
            value={detailsPuissance}
            onChange={(e) => setDetailsPuissance(e.target.value)}
          />

          <label htmlFor="detailsInstallationExt">
            Installation extérieure
          </label>
          <input
            type="text"
            name="detailsInstallationExt"
            id="detailsInstallationExt"
            value={detailsInstallationExt}
            onChange={(e) => setDetailsInstallationExt(e.target.value)}
          />

          <label htmlFor="detailsNbrePorts">Nombre de ports</label>
          <input
            type="text"
            name="detailsNbrePorts"
            id="detailsNbrePorts"
            value={detailsNbrePorts}
            onChange={(e) => setDetailsNbrePorts(e.target.value)}
          />
          <label htmlFor="detailsRackable">Rackable</label>
          <input
            type="text"
            name="detailsRackable"
            id="detailsRackable"
            value={detailsRackable}
            onChange={(e) => setDetailsRackable(e.target.value)}
          />
        </div>
        <div className={styles["details-2"]}>
          <label htmlFor="detailsManageable">Manageable</label>
          <input
            type="text"
            name="detailsManageable"
            id="detailsManageable"
            value={detailsManageable}
            onChange={(e) => setDetailsManageable(e.target.value)}
          />
          <label htmlFor="detailsPoe">PoE</label>
          <input
            type="text"
            name="detailsPoe"
            id="detailsPoe"
            value={detailsPoe}
            onChange={(e) => setDetailsPoe(e.target.value)}
          />
          <label htmlFor="detailsPoePlus">PoE+</label>
          <input
            type="text"
            name="detailsPoePlus"
            id="detailsPoePlus"
            value={detailsPoePlus}
            onChange={(e) => setDetailsPoePlus(e.target.value)}
          />
          <label htmlFor="detailsPoePlusPlus">PoE++</label>
          <input
            type="text"
            name="detailsPoePlusPlus"
            id="detailsPoePlusPlus"
            value={detailsPoePlusPlus}
            onChange={(e) => setDetailsPoePlusPlus(e.target.value)}
          />
          <label htmlFor="detailsConsommation">Consommation</label>
          <input
            type="text"
            name="detailsConsommation"
            id="detailsConsommation"
            value={detailsConsommation}
            onChange={(e) => setDetailsConsommation(e.target.value)}
          />
          <label htmlFor="detailsGarantie">Garantie</label>
          <input
            type="text"
            name="detailsGarantie"
            id="detailsGarantie"
            value={detailsGarantie}
            onChange={(e) => setDetailsGarantie(e.target.value)}
          />
          <label htmlFor="detailsInterface">Interface</label>
          <input
            type="text"
            name="detailsInterface"
            id="detailsInterface"
            value={detailsInterface}
            onChange={(e) => setDetailsInterface(e.target.value)}
          />
          <label htmlFor="detailsUsb">Ports USB 3.0</label>
          <input
            type="text"
            name="detailsUsb"
            id="detailsUsb"
            value={detailsUsb}
            onChange={(e) => setDetailsUsb(e.target.value)}
          />
          <label htmlFor="detailsPortConsole">Port console</label>
          <input
            type="text"
            name="detailsPortConsole"
            id="detailsPortConsole"
            value={detailsPortConsole}
            onChange={(e) => setDetailsPortConsole(e.target.value)}
          />
          <label htmlFor="detailsDebitVpn">Débit VPN</label>
          <input
            type="text"
            name="detailsDebitVpn"
            id="detailsDebitVpn"
            value={detailsDebitVpn}
            onChange={(e) => setDetailsDebitVpn(e.target.value)}
          />
          <label htmlFor="detailsMaxTcp">Max. sesions simultanées TCP</label>
          <input
            type="text"
            name="detailsMaxTcp"
            id="detailsMaxTcp"
            value={detailsMaxTcp}
            onChange={(e) => setDetailsMaxTcp(e.target.value)}
          />
          <label htmlFor="detailsDebitFirewall">Débit du pare-feu</label>
          <input
            type="text"
            name="detailsDebitFirewall"
            id="detailsDebitFirewall"
            value={detailsDebitFirewall}
            onChange={(e) => setDetailsDebitFirewall(e.target.value)}
          />
          <label htmlFor="detailsVitesse">Vitesse</label>
          <input
            type="text"
            name="detailsVitesse"
            id="detailsVitesse"
            value={detailsVitesse}
            onChange={(e) => setDetailsVitesse(e.target.value)}
          />
          <label htmlFor="detailsTypeWifi">Type de Wifi</label>
          <input
            type="text"
            name="detailsTypeWifi"
            id="detailsTypeWifi"
            value={detailsTypeWifi}
            onChange={(e) => setDetailsTypeWifi(e.target.value)}
          />
          <label htmlFor="detailsAntenne">Antenne</label>
          <input
            type="text"
            name="detailsAntenne"
            id="detailsAntenne"
            value={detailsAntenne}
            onChange={(e) => setDetailsAntenne(e.target.value)}
          />
          <label htmlFor="detailsLan">LAN</label>
          <input
            type="text"
            name="detailsLan"
            id="detailsLan"
            value={detailsLan}
            onChange={(e) => setDetailsLan(e.target.value)}
          />
          <label htmlFor="detailsNebula">Nebula</label>
          <input
            type="text"
            name="detailsNebula"
            id="detailsNebula"
            value={detailsNebula}
            onChange={(e) => setDetailsNebula(e.target.value)}
          />
        </div>
      </div>
      <div className={styles["form-button"]}>
        <button type="submit">{productToEdit ? "Modifier" : "Ajouter"}</button>{" "}
      </div>
    </form>
  );
}
