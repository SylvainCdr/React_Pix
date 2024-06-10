import React, { useEffect } from 'react';
import './style.scss'; 
import Aos from 'aos';

export default function DeliveryTimeline({ status }) {

//aos
useEffect(() => {
    Aos.init({ duration: 2000 });
}
, []);

    return (
        <div data-aos="flip-down" className="delivery-timeline">
            <div className={`timeline-item ${status === 'pending' ? 'active' : ''}`}>
                <div className="timeline-circle">1</div>
                <div className="timeline-content">
                    <h4>En attente</h4>
                    <p>Votre commande est en attente de traitement</p>
                </div>
            </div>
            <div className={`timeline-item ${status === 'shipped' ? 'active' : ''}`}>
                <div className="timeline-circle">2</div>
                <div className="timeline-content">
                    <h4>Expédiée</h4>
                    <p>Votre commande a été expédiée</p>
                </div>
            </div>
            <div className={`timeline-item ${status === 'delivered' ? 'active' : ''}`}>
                <div className="timeline-circle">3</div>
                <div className="timeline-content">
                    <h4>Livrée</h4>
                    <p>Votre commande a été livrée avec succès</p>
                </div>
            </div>
        </div>
    );
}
