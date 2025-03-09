
import React, { useState } from "react";
import { BookOpen, Clock, Filter, Search, Star, Users } from "lucide-react";
import "../style/Formation.css";
import Navbar from "../components/Navbar";
import Developpement from '../assets/Developpemt.png'
import Marketing from '../assets/Marketing.png'
import DataScience from '../assets/DataScience.png';
import Agile from '../assets/Agile.png'
import Ux_Ui from '../assets/Ux_Ui.png'
import Ai from '../assets/Ai.png'

const Formation = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock course data
  const courses = [
    {
      id: "1",
      title: "Développement Web Fullstack",
      description: "Apprenez à créer des applications web complètes avec HTML, CSS, JavaScript, React et Node.js.",
      duration: "12 semaines",
      level: "intermediate",
      category: "Développement",
      image: Developpement,
      instructor: "Jean Dupont",
      enrolledCount: 853
    },
    {
      id: "2",
      title: "Marketing Digital",
      description: "Maîtrisez les stratégies de marketing digital, SEO, réseaux sociaux et publicité en ligne.",
      duration: "8 semaines",
      level: "beginner",
      category: "Marketing",
      image: Marketing,
      instructor: "Marie Laurent",
      enrolledCount: 1243
    },
    {
      id: "3",
      title: "Data Science et Analyse",
      description: "Explorez les fondements de la data science, l'analyse de données et l'apprentissage automatique.",
      duration: "10 semaines",
      level: "advanced",
      category: "Data",
      image: DataScience,
      instructor: "Dr. Thomas Martin",
      enrolledCount: 672
    },
    {
      id: "4",
      title: "Gestion de Projet Agile",
      description: "Apprenez les méthodologies agiles pour gérer efficacement des projets complexes.",
      duration: "6 semaines",
      level: "intermediate",
      category: "Management",
      image: Agile,
      instructor: "Sophie Bernard",
      enrolledCount: 528
    },
    {
      id: "5",
      title: "Design UX/UI",
      description: "Concevez des interfaces utilisateur intuitives et des expériences utilisateur exceptionnelles.",
      duration: "9 semaines",
      level: "intermediate",
      category: "Design",
      image: Ux_Ui,
      instructor: "Alexandre Moreau",
      enrolledCount: 926
    },
    {
      id: "6",
      title: "Intelligence Artificielle pour Entreprises",
      description: "Découvrez comment intégrer l'IA dans votre stratégie d'entreprise et vos produits.",
      duration: "8 semaines",
      level: "advanced",
      category: "IA",
      image: Ai,
      instructor: "Dr. Isabelle Leclerc",
      enrolledCount: 412
    }
  ];
  
  const categories = ["all", "Développement", "Marketing", "Data", "Management", "Design", "IA"];
  
  const filteredCourses = courses.filter((course) => {
    // Filter by category
    const categoryMatch = activeFilter === "all" || course.category === activeFilter;
    
    // Filter by search query
    const searchMatch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });
  
  const getLevelLabel = (level) => {
    switch (level) {
      case "beginner":
        return "Débutant";
      case "intermediate":
        return "Intermédiaire";
      case "advanced":
        return "Avancé";
      default:
        return level;
    }
  };
  
  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "level-beginner";
      case "intermediate":
        return "level-intermediate";
      case "advanced":
        return "level-advanced";
      default:
        return "";
    }
  };

  return (
    <div className="formations-container animate-fade-in">
    <Navbar/>
      <div className="formations-header mb-4">
        <h1 className="formations-title">Formations</h1>
        <p className="formations-subtitle">
          Explorez nos formations pour développer vos compétences et accélérer votre carrière.
        </p>
      </div>
      
      <div className="search-filter-container mb-4">
        <div className="search-container">
          <div className="input-group">
            <span className="input-group-text">
              <Search className="search-icon" />
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Rechercher des formations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="filter-container">
          <div className="filter-icon-container">
            <Filter className="filter-icon" />
          </div>
          
          <div className="categories-container">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`category-btn ${activeFilter === category ? 'active' : ''}`}
              >
                {category === "all" ? "Toutes les catégories" : category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="course-card"
            >
              <div className="course-image-container">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="course-image"
                />
              </div>
              
             
              
              <div className="course-content">
                <div className="course-tags">
                  <span className="course-category">{course.category}</span>
                  <div className="course-duration">
                    <span className={getLevelColor(course.level)}>
                        {getLevelLabel(course.level)}
                    </span>
                    <Clock className="duration-icon" />
                    <span>{course.duration}</span>
                    
                  </div>
                </div>
                
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                
                <div className="course-footer">
                  <div className="instructor">
                    <div className="instructor-avatar">
                      <img 
                        src="/placeholder.svg" 
                        alt={course.instructor} 
                      />
                    </div>
                    <span className="instructor-name">{course.instructor}</span>
                  </div>
                  
                  <div className="enrolled">
                    <Users className="enrolled-icon" />
                    <span>{course.enrolledCount} inscrits</span>
                  </div>
                </div>
              </div>
              
              <div className="course-action">
                <button className="btn btn-primary w-100">Voir le détail</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-courses">
          <BookOpen className="no-courses-icon" />
          <h3 className="no-courses-title">Aucune formation trouvée</h3>
          <p className="no-courses-message">
            Essayez de modifier vos critères de recherche ou consultez toutes nos formations.
          </p>
          <button 
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="btn btn-primary mt-3"
          >
            Voir toutes les formations
          </button>
        </div>
      )}
    </div>
  );
};

export default Formation;