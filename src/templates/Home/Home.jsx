import React, { useEffect } from "react";
import styles from "./style.module.scss";
import HomepageCustomersSlider from "../../Components/HomepageCustomersSlider/HomepageCustomersSlider";
import Hero from "@/Components/HomepageHero/HomepageHero";
import Link from "next/link";
import AOS from "aos";
import HomepageCountUp from "../../Components/HomepageCountUp/HomepageCountUp";
import HomepagePartners from "../../Components/HomepagePartners/HomepagePartners";
import HomepageSkills from "../../Components/HomepageSkills/HomepageSkills";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className={styles["homepage-container"]}>
      <Hero />

      <div className={styles["section1-intro"]}>
        <div className={styles["section1-img"]}></div>

        <div className={styles["section1-text"]}>
          <p>
            La <strong>sécurité</strong> ne dépend plus de la force brute, mais
            de <strong>l'intelligence</strong>. <br /> Chez{" "}
            <strong>Pixecurity</strong>, nous sommes les fournisseurs de
            systèmes de <strong>sûreté</strong> intelligents. <br />
            Notre <strong>mission</strong> : vous accompagner avec les{" "}
            <strong>meilleurs</strong> produits et des{" "}
            <strong>solutions</strong> sur-mesure, repensant la sécurité selon
            vos besoins.
          </p>
          <div data-aos="zoom-in" className={styles.icons}>
            <img src="../assets/icons/ico3.png" alt="" />
            <img src="../assets/icons/ico2.png" alt="" />
            <img src="../assets/icons/ico1.png" alt="" />
            <img src="../assets/icons/ico4.png" alt="" />
          </div>
        </div>
      </div>

      <div className={styles["section2-offer"]}>
        <h2>Une offre pensée autrement</h2>
        <p>
          La protection de vos données personnelles certifiée Pixecurity c'est :
          la fourniture d'outils électroniques, une plateforme de gestion de
          projets réalisée en propre pour faciliter l'interaction avec nos
          experts, des développements spécifiques et sur mesure, la mise en
          place de solutions cyber. <br />
          Des certifications de conformités delivrées par nos consultants sur du
          compliance : Pixecurity couvre toute la haute chaine de valeur de la
          sureté. Pixecurity est le fournisseur de solutions de sureté 3.0
        </p>
      </div>

      <HomepageSkills />

      <div className={styles["section4-aboutUs"]}>
        <div className={styles["section4-text"]}>
          <h2>Qui sommes nous ?</h2>
          <p>
            Des ingénieurs avant-gardistes. Des experts 3.0, natifs du
            numérique, spécialisés dans le BTP, les réseaux, les technologies du
            bâtiment, et toujours à l'affût des dernières avancées
            technologiques. Ce sont de véritables artisans de la sûreté,
            déterminés à dénicher les solutions les plus adaptées à vos
            exigences.
          </p>
          <Link href="/a-propos">
            <button>Notre équipe</button>
          </Link>
        </div>
        <div className={styles["section4-img"]}></div>
      </div>

      <HomepageCountUp />

      <HomepagePartners />

      <HomepageCustomersSlider />
    </div>
  );
}
