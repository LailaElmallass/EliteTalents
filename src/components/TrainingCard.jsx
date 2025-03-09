import React from 'react';
import { FiFileText } from 'react-icons/fi'; 
import '../style/TrainingCard.css';

const TrainingCard = () => {
  return (
    <div className="training-card">
      <h2>
        <FiFileText className="icon" /> Formations Récentes
      </h2>
      <ul className="training-list">
        <li>Orientation professionnelle</li>
        <li>Développement personnel</li>
        <li>Compétences numériques</li>
      </ul>
    </div>
  );
};

export default TrainingCard;