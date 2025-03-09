import React from 'react';
import { Lightbulb } from 'lucide-react';
import '../style/AdviceCard.css';

const AdviceCard = () => {
  return (
    <div className="advice-card">
      <h2>
        <Lightbulb className="icon" /> Conseil du jour
      </h2>
      <p>"Explorez vos passions pour trouver votre voie."</p>
    </div>
  );
};

export default AdviceCard;