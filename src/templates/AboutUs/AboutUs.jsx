import styles from "./style.module.scss";
import { useEffect } from "react";
import Aos from "aos";

export default function AboutUs() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className={styles["aboutUs-container"]}>
      <div className={styles["section-1"]}>
        <h1>Qui sommes-nous ?</h1>
        <p>
          Des ingénieurs avant tout. Des ingénieurs 3.0 même. Digital natives,
          branchés BTP, réseaux, technologies appliquées aux bâtiments, veille
          technologique... Bref, de vrais dealers de solutions de sureté prêts à
          tout pour trouver les bons produits adaptés à vos besoins.
        </p>
      </div>

      <div className={styles["section-2"]}>
        <div
          className={styles["card-about"]}
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <div className={styles.top}>
            <img
              src="https://as2.ftcdn.net/v2/jpg/05/73/57/23/1000_F_573572330_EFcB1C8z5wcthD2H8MjUKFVmBrN9wVdT.jpg"
              alt=""
            />
          </div>
          <h2>BTP</h2>
          <p>
            Avec des ingénieurs de formation génie civil, Pixecurity conserve un
            ADN travaux, chantier, qui reste l'essence même de notre métier.
          </p>
        </div>
        <div
          className={styles["card-about"]}
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <div className={styles.top}>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <h2>Électronique appliquée</h2>
          <p>
            En complément du génie civil, nos ingénieurs cadres sont formés en
            électronique appliquée : domotique, vidéoprotection, contrôle
            d'accès...
          </p>
        </div>
        <div
          className={styles["card-about"]}
          data-aos="fade-up"
          data-aos-duration="2500"
        >
          <div className={styles.top}>
            <img
              src="https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <h2>IT</h2>
          <p>
            Pixecurity complète son équipe par des ingénieurs réseaux certifiés,
            systèmes, SI...
          </p>
        </div>
      </div>
      <div className={styles["section-3"]}>
        <h3>
          "Notre but ? Répondre aux exigences et anticiper les besoins de nos
          clients. <br />
          Simplifier la compréhension de la sécurité "
        </h3>
        <p>Yann Duchet, CEO Pixecurity</p>
      </div>

      <div className={styles["section-4"]}>
        <h1>L'équipe</h1>
        <ul className={styles["auto-grid"]} role="list">
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Yann DUCHET</h2>
              <p>CEO</p>
              <img
                alt="Yann DUCHET"
                src="https://www.pixecurity.com/wp-content/uploads/2022/04/Yann.png"
              />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Kenza GAUTIAM</h2>
              <p>Commerciale</p>
              <img alt="Kenza GAUTIAM" src="assets/team/KENZA_.jpeg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Fabien THOMAS</h2>
              <p>Commerciale</p>
              <img alt="Fabien THOMAS" src="assets/team/FABIEN_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Fabrice VALLEE</h2>
              <p>Commercial grands comptes</p>
              <img alt="Fabrice VALLEE" src="assets/team/FABRICE_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Yanis MEBARKI</h2>
              <p>Commercial</p>
              <img alt="Yanis MEBARKI" src="assets/team/YANNIS_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Adrien JOANNY</h2>
              <p>Ingénieur Systèmes & Réseaux</p>
              <img
                alt="Adrien JOANNY"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Adri-J.png"
              />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Adrien DESDOITS</h2>
              <p>Technicien Systèmes & Réseaux</p>
              <img
                alt="Adrien DESDOITS"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Adri-D.png"
              />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Mathieu PACREAU</h2>
              <p>Technicien supérieur Systèmes & Réseaux</p>
              <img
                alt="Mathieu PACREAU"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Mathieu.png"
              />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Aziz ARJDAL</h2>
              <p>Technicien Systèmes & Réseaux</p>
              <img
                alt="Aziz ARJDAL"
                src="https://www.pixecurity.com/wp-content/uploads/2023/02/Aziz.png"
              />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Élodie TENEUR</h2>
              <p>Technicienne supérieure Systèmes & Réseaux</p>
              <img alt="Élodie TENEUR" src="assets/team/ELODIE_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Anaelle SOUHAUT</h2>
              <p>Chargée d'affaires</p>
              <img
                alt="Anaelle SOUHAUT"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Anaelle.png"
              />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Dyhia LAGA</h2>
              <p>Chargée d'étude avant-vente</p>
              <img alt="Dyhia LAGA" src="assets/team/DYHIA_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Jessica FILIALI</h2>
              <p>Assistante de direction</p>
              <img alt="Jessica FILIALI" src="assets/team/JESSICA_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Alexis OTTINA</h2>
              <p>Développeur</p>
              <img alt="Alexis OTTINA" src="assets/team/ALEXIS_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Augustin MAHIEU</h2>
              <p>Développeur</p>
              <img alt="Augustin MAHIEU" src="assets/team/AUGUSTIN_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Nathalie JANNOT</h2>
              <p>Assistante de direction</p>
              <img alt="Nathalie JANNOT" src="assets/team/NATHALIE_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Yasmina AOUAM</h2>
              <p>Chargée d'étude avant-vente</p>
              <img alt="Yasmina AOUAM" src="assets/team/YASMINA_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Alex HUBERT</h2>
              <p>Développeur</p>
              <img alt="Alex HUBERT" src="assets/team/ALEX_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Sylvain CADORET</h2>
              <p>Technicien Systèmes & Réseaux</p>
              <img alt="Sylvain CADORET" src="assets/team/SYLVAIN_.jpg" />
            </div>
          </li>
          <li>
            <div className={styles.profile}>
              <h2 className={styles["profile__name"]}>Abdulrhaman SHOUGRI</h2>
              <p>Commercial</p>
              <img
                alt="Abdulrhaman SHOUGRI"
                src="assets/team/ABDULRAHMAN_.jpg"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
