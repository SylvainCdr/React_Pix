import "./style.scss";

export default function AboutUs() {
  return (
    <div className="aboutUs-container">
      <div className="team">
        
          <h1>Qui sommes-nous ?</h1>

          <h2>
            Des ingénieurs avant tout. Des ingénieurs 3.0 même. Digital natives,
            branchés BTP, réseaux, technologies appliquées aux batiments, veille
            technologique... Bref, de vrais dealers de solutions de sureté prêts
            à tout pour trouver les bons produits adaptés à vos besoins.
          </h2>
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
