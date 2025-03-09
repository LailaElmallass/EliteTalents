import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../features/AuthSlice"; 
import {User} from 'lucide-react'
import '../style/Auth.css';
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const mockUser = {
        email,
        name: "Utilisateur",
        role: "utilisateur", 
      };

      localStorage.setItem('authToken', 'fake-token');

      dispatch(login(mockUser));

      Swal.fire({
        icon: "success",
        title: "Connexion réussie !",
        text: "Bienvenue dans votre espace.",
      });

      // Redirection selon le rôle
      const userRole = mockUser.role;
      if (userRole === "coach") {
        navigate("/coach_dashboard");
      } else if (userRole === "entreprise") {
        navigate("/entreprise_dashboard");
      } else {
        navigate("/user_dashboard");
      }

    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <h2> <User/> Connexion</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>} 
          <button type="submit">Se connecter</button>
        </form>
        <p>
          Pas encore de compte ? <Link to="/signup">S'inscrire</Link>
        </p>
        <p>
          <Link to="/">Retour à l'accueil ?</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;