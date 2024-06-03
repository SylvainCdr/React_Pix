import React, { useEffect } from "react";
import "./style.scss";

export default function HomepageCountUp() {
  const animationDuration = 5000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(animationDuration / frameDuration);
  const easeOutQuad = (t) => t * (2 - t);

  const animateCountUp = (el) => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);

    const counter = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentCount = Math.round(countTo * progress);

      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCountUp(entry.target);
            observer.unobserve(entry.target); // Arrêter d'observer une fois animé
          }
        });
      },
      { threshold: 0.5 } // Déclencher quand 50% de l'élément est visible
    );
        // Ajouter chaque élément .timer à observer
        const countupEls = document.querySelectorAll(".timer");
        countupEls.forEach((el) => {
          observer.observe(el);
        });
    
        // Nettoyage de l'effet
        return () => countupEls.forEach((el) => observer.unobserve(el));
      }, []);

  return (
    <div className="counter_wrapper">
      <div  className="container">
        <div className="row">
          <div data-aos="flip-down"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="1000" className="col-4">
            <div className="count_box box_hover">
              <h3>
                <span className="timer">23</span>
              </h3>
              <h4>Partenaires</h4>
            </div>
          </div>
          <div data-aos="flip-down"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000" className="col-4">
            <div className="count_box box_center">
              <h3>
                <span className="timer">63</span>
              </h3>
              <h4>Projets</h4>
            </div>
          </div>
          <div data-aos="flip-down"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="3000" className="col-4">
            <div className="count_box box_hover">
              <h3>
                <span className="timer">48</span>
              </h3>
              <h4>Clients </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
