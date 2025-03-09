import React from 'react';
import { Users, Book ,ChartNoAxesCombined} from 'lucide-react';
import '../style/StatsCard.css';

const StatsCard = () => {
  return (
    <div className="stats-card">
      <h2><ChartNoAxesCombined className="icon" /> Statistiques</h2>
      <div className="stats-content">
        <div className="stat-item">
          <Users className="icon" />
          <span className="stat-number">150</span>
          <span>Étudiants</span>
        </div>
        <div className="stat-item">
          <Book className="icon" />
          <span className="stat-number">25</span>
          <span>Formations</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;