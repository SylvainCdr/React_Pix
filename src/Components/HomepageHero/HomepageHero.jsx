import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AOS from "aos";

export default function HomepageHero() {
  const videoRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className={styles["homepageHero-container"]}>
      <div className={styles["hero-left"]}>
        <h2
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          Smarter. <br /> Safer.
        </h2>
      </div>

      <div className={styles["hero-right"]}>
        <h1 data-aos="fade-up" data-aos-duration="3000">
          Pixecurity : Votre partenaire en sécurité intelligente
        </h1>
        <Link href="/boutique">
          <button>Visiter la boutique</button>
        </Link>
      </div>
    </div>
  );
}
