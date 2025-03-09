import React, { useState, useEffect } from 'react';
import { UserCircle2, Sun, Moon, LogOut , BellRing, House} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';  
import { logout } from '../features/AuthSlice';
import '../style/Navbar.css';
import UserAvatar from '../assets/UserAvatar.png'

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const isConnected = !!currentUser;

  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Nouveau cours disponible", time: "Il y a 5 minutes", read: false },
    { id: 2, message: "Résultats de votre test", time: "Il y a 1 heure", read: false },
    { id: 3, message: "Rappel: Session de coaching", time: "Il y a 3 heures", read: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token && currentUser) dispatch(logout());
  }, [currentUser, dispatch]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
    navigate('/signin');
  };
  const getTitle = (name) => {
    const femaleNames = ["Marie", "Sophie"];
    const firstName = name?.split(" ")[0] || "";
    return femaleNames.includes(firstName) ? "Madame" : "Monsieur";
  };
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  const toggleNotificationsMenu = () => {
    setShowNotifications(prev => !prev);
    setShowProfileMenu(false);
  };
  const toggleProfileDropdown = () => {
    setShowProfileMenu(prev => !prev);
    setShowNotifications(false);
  };
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <h1>
        {isConnected && currentUser ? (
          `Bienvenue ${getTitle(currentUser.name)}, ${currentUser.name || currentUser.username || 'Utilisateur'} !`
        ) : (
          'Bienvenue'
        )}
      </h1>
      <div className="navbar-center">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
           
          </div>
        </form>
      </div>
      <div className="navbar-actions">
        <button onClick={toggleDarkMode} className="mode-toggle" aria-label="Toggle dark mode">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <a href='/' className="accueil">
            <House />
        </a>

        <div className="notification-container">
          <button className="notification-btn" onClick={toggleNotificationsMenu}>
            <BellRing/>
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button className="mark-all-read" onClick={markAllAsRead}>
                    Tout marquer comme lu
                  </button>
                )}
              </div>
              <div className="notifications-list">
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      className={`notification-item ${!n.read ? 'unread' : ''}`}
                      onClick={() => markAsRead(n.id)}
                    >
                      <div className="notification-content">
                        <div className="notification-message">{n.message}</div>
                        <div className="notification-time">{n.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-notifications">Aucune notification</div>
                )}
              </div>
              <div className="notifications-footer">
                <a href="#/all-notifications">Voir toutes les notifications</a>
              </div>
            </div>
          )}
        </div>

        <div className="profile-container">
            <button className="profile-avatar" onClick={toggleProfileDropdown}>
              <img src={UserAvatar} alt="Profile"  width={50}/>
            </button>
          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <div className="profile-avatar large">
                  <img src={UserAvatar} alt="Profile"  width={50}/>
                </div>
                <div className="profile-info">
                  <h4>Elite User</h4>
                  <p>Étudiant</p>
                </div>
              </div>
              <div className="profile-menu">
                <a href="#/profile" className="profile-menu-item">
                  <i className="fas fa-user"></i> <span>Mon profil</span>
                </a>
                <a href="#/settings" className="profile-menu-item">
                  <i className="fas fa-cog"></i> <span>Paramètres</span>
                </a>
                <a href="#/dashboard" className="profile-menu-item">
                  <i className="fas fa-tachometer-alt"></i> <span>Tableau de bord</span>
                </a>
                <div className='profile-menu-item'>
                  {isConnected ? (
                    <div className="auth-action">
                      <button onClick={handleLogout} className="auth-btn">
                        <LogOut size={20} /> Déconnexion
                      </button>
                    </div>
                  ) : (
                    <div className="auth-action">
                      <Link to="/SignIn" className="auth-btn">
                        <UserCircle2 size={20} /> Connexion
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;