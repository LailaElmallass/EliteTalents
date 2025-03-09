import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/Auth.css';
import Navbar from "../components/Navbar";
import {User} from 'lucide-react'
import Swal from "sweetalert2";
import { useDispatch } from "react-redux"; 
import { addUser } from "../features/UserSlice"; 

const SignUp = () => {
  const [role, setRole] = useState("utilisateur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState(""); 
  const [companyName, setCompanyName] = useState(""); 
  const [industry, setIndustry] = useState(""); 
  const [gender, setGender] = useState(""); // Nouveau champ pour gender
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); 

    // Vérification des mots de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Les mots de passe ne correspondent pas.",
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
      return;
    }

    // Validation de l'email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError("Veuillez entrer un email valide.");
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez entrer un email valide.",
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
      return;
    }

    // Vérification du genre pour utilisateur ou coach
    if ((role === "utilisateur" || role === "coach") && !gender) {
      setError("Veuillez sélectionner votre genre.");
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez sélectionner votre genre.",
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
      return;
    }

    // Données à envoyer
    const userData = { role, email, password, name };
    if (role === "coach") userData.specialty = specialty;
    if (role === "entreprise") {
      userData.companyName = companyName;
      userData.industry = industry;
    }
    if (role === "utilisateur" || role === "coach") userData.gender = gender;

    try {
      const actionResult = await dispatch(addUser(userData)); 

      if (addUser.fulfilled.match(actionResult)) {
        Swal.fire({
          icon: "success",
          title: "Compte créé avec succès !",
          text: "Vous pouvez maintenant vous connecter.",
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });

        // Réinitialiser les champs après succès
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setSpecialty("");
        setCompanyName("");
        setIndustry("");
        setGender(""); // Réinitialiser gender

        setTimeout(() => {
          navigate('/SignIn');
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: actionResult.payload || "Erreur inconnue. Veuillez réessayer.",
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: error.message || "Erreur inconnue. Veuillez réessayer.",
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth-container">
        <h2> <User/> Inscription</h2>
        <form onSubmit={handleSignUp}>
          <label>Choisir un rôle :</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="utilisateur">Utilisateur</option>
            <option value="coach">Coach</option>
            <option value="entreprise">Entreprise</option>
          </select>

          <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          {/* Boutons radio pour gender si utilisateur ou coach */}
          {(role === "utilisateur" || role === "coach") && (
            <div className="gender-selection">
              <label>Genre :</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Monsieur
                </label>
                </div>
                <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Madame
                </label>
              </div>
            </div>
          )}

          {role === "coach" && (
            <input type="text" placeholder="Spécialité" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
          )}

          {role === "entreprise" && (
            <>
              <input type="text" placeholder="Nom de l'entreprise" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
              <input type="text" placeholder="Secteur d’activité" value={industry} onChange={(e) => setIndustry(e.target.value)} required />
            </>
          )}

          {error && <p className="error-message">{error}</p>} 

          <button type="submit">Créer un compte</button>
        </form>
        <p>
          Déjà inscrit ? <Link to="/signin">Se connecter</Link>
        </p>
        <p>
          <Link to="/">Retour à l'accueil ? </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;