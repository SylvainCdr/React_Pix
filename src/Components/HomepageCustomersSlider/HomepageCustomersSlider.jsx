import React from "react";
import styles from "./style.module.scss";

const images = [
  "aphp.png",
  "argenteuil.png",
  "channel.png",
  "coquide.png",
  "dps.png",
  "foliateam.png",
  "foncia.png",
  "genelec.png",
  "itq.png",
  "ministere-aff.png",
  "ministere-int.png",
  "ministere-just.png",
  "onet.png",
  "pml.png",
  "primion.png",
  "securitas.png",
  "terideal.png",
];

export default function HomepageCustomersSlider() {
  return (
    <div className={styles.slider}>
      <h1>Ils nous ont fait confiance :</h1>
      <div className={styles.slide_track}>
        {images.map((image, index) => (
          <div className={styles.slide} key={index}>
            <img src={`assets/customersSlider/${image}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
