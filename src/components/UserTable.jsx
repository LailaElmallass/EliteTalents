import React from 'react';
import '../style/UserTable.css';
import { Users,User, Mail ,Shield, CreditCard} from 'lucide-react';

const UserTable = ({ users, loading, error }) => {
  return (
    <div className="user-table-container">
      <h3><Users/> Liste des Utilisateurs</h3>
      {loading && <p className="loading">Chargement...</p>}
      {error && <p className="error">Erreur : {error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="no-data">Aucun utilisateur trouvé.</p>
      )}
      {!loading && !error && users.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
            <th><User size={15} /> Nom</th>
            <th><Mail size={15} /> Email</th>
            <th><Shield size={15} /> Rôle</th>
            <th><CreditCard size={15} /> Paiement</th>

            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id || index}>
                <td>{user.name || 'Non défini'}</td>
                <td>{user.email || 'Non défini'}</td>
                <td>
                  <span
                    className={`badge role ${
                      user.role ? user.role.toLowerCase() : 'inconnu'
                    }`}
                  >
                    {user.role === 'utilisateur'
                      ? 'Utilisateur'
                      : user.role === 'coach'
                      ? 'Coach'
                      : user.role === 'entreprise'
                      ? 'Entreprise'
                      : 'Inconnu'}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge payment-status ${
                      user.status ? user.status.toLowerCase() : 'inconnu'
                    }`}
                  >
                    {user.status === 'paid'
                      ? 'Payé'
                      : user.status === 'unpaid'
                      ? 'Non Payé'
                      : user.status === 'pending'
                      ? 'En Attente'
                      : 'Inconnu'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;