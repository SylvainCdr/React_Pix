import "./style.scss";

export default function AboutUs() {
  return (
    <div className="aboutUs-container">
      <div className="section-1">
        <h1>Qui sommes-nous ?</h1>

        <p>
          Des ingénieurs avant tout. Des ingénieurs 3.0 même. Digital natives,
          branchés BTP, réseaux, technologies appliquées aux batiments, veille
          technologique... Bref, de vrais dealers de solutions de sureté prêts à
          tout pour trouver les bons produits adaptés à vos besoins.
        </p>
      </div>

      <div className="section-2">
        <div className="card-about" data-aos="fade-up"
     data-aos-duration="1500">
          <div className="top">
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
        <div className="card-about" data-aos="fade-up"
     data-aos-duration="2000">
          <div className="top">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <h2>Electronique appliquée</h2>
          <p>
            En complément du génie civil, nos ingénieurs cadres sont formés en
            électronique appliquée : domotique, vidéoprotection, contrôle
            d'accès...
          </p>
        </div>
        <div className="card-about" data-aos="fade-up"
     data-aos-duration="2500">
          <div className="top">
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
      <div className="section-3">
       
          <h3>
            "Notre but ? Répondre aux exigences et anticiper les besoins de nos
            clients. <br />Simplifier la compréhension de la sécurité ”
          </h3>
          <p>Yann Duchet, CEO Pixecurity</p>
        
      </div>

      <div className="section-4">
        <h1>L'équipe</h1>
        <ul className="auto-grid" role="list">
          <li>
            <div className="profile">
              <h2 className="profile__name">Yann DUCHET</h2>
              <p>CEO</p>
              <img
                alt="Anita Simmons"
                src="https://www.pixecurity.com/wp-content/uploads/2022/04/Yann.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Kenza GAUTHIAM</h2>
              <p>Commerciale</p>
              <img
                alt="Profile shot for Celina Harris"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Kenza.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Fabrice VALLEE</h2>
              <p>Commercial grands comptes</p>
              <img
                alt="Profile shot for Ruby Morris"
                src="https://www.pixecurity.com/wp-content/uploads/2023/02/Fabrice.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Yanis MEBARKI</h2>
              <p>Commercial</p>
              <img
                alt="Profile shot for Nicholas Castro"
                src="https://www.pixecurity.com/wp-content/uploads/2022/06/Yanis.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Adrien JOANNY</h2>
              <p>Ingénieur Systèmes & Réseaux</p>
              <img
                alt="Profile shot for Marc Dixon"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Adri-J.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Adrien DESDOITS</h2>
              <p>Technicien Systèmes & Réseaux</p>
              <img
                alt="Profile shot for Chad"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Adri-D.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Mathieu PACREAU</h2>
              <p>Technicien supérieur Systèmes & Réseaux</p>
              <img
                alt="Profile shot for Chad"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Mathieu.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Aziz ARJDAL</h2>
              <p>Technicien Systèmes & Réseaux</p>
              <img
                alt="Profile shot for Chad"
                src="https://www.pixecurity.com/wp-content/uploads/2023/02/Aziz.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Élodie TENEUR</h2>
              <p>Technicienne supérieur Systèmes & Réseaux</p>
              <img
                alt="Profile shot for Chad"
                src="https://www.pixecurity.com/wp-content/uploads/2022/11/Elodie.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Anaelle SOUHAUT</h2>
              <p>Chargée d'affaires</p>
              <img
                alt="Profile shot for Chad"
                src="https://www.pixecurity.com/wp-content/uploads/2022/03/Anaelle.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Dyhia LAGA</h2>
              <p>Chargée d'étude avant-vente</p>
              <img
                alt="Profile shot for Chad"
                src="https://www.pixecurity.com/wp-content/uploads/2023/02/Dyhia.png"
              />
            </div>
          </li>
          <li>
            <div className="profile">
              <h2 className="profile__name">Jessica FILIALI</h2>
              <p>Assistante de direction</p>
              <img
                alt="Profile shot for Chad"
                src="https://www.pixecurity.com/wp-content/uploads/2022/11/Jessica.png"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
