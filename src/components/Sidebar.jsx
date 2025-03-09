import React, { useState } from 'react';
import { Home, BookOpen, Lightbulb, User, X, Menu,BookCheck } from 'lucide-react'; 
import '../style/Sidebar.css';
import LogoElite from '../assets/LogoElite.png'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = (e) => {
    e.preventDefault(); 
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={LogoElite} alt="Logo" className='LogoElite'/> 
          <h2>ELITE TALENTS</h2>
          <a href="#" className="sidebar-toggle" onClick={toggleSidebar}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </a>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="#dashboard">
              <Home className="icon" /> Tableau de bord
            </a>
          </li>
          <li>
            <Link to="/formation">
              <BookOpen className="icon" /> Formations
            </Link>
          </li>
          <li>
            <a href="#formations">
              <BookCheck className="icon" /> Tests
            </a>
          </li>
          <li>
            <a href="#conseils">
              <Lightbulb className="icon" /> Conseils
            </a>
          </li>
          <li>
            <a href="#profil">
              <User className="icon" /> Profil
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;