<template>
  <div class="role-menu">
    <!-- Menu à gauche avec une image -->
    <div class="menu-role-sidebar" :class="{ open: menuOpen }">
      <div class="menu-header" @click="toggleMenu">
        <h3>Menu Rôles</h3>
      </div>
      <ul v-if="menuOpen">
        <li><RouterLink to="/roles">Liste des Rôles</RouterLink></li>
        <li><RouterLink to="/add-role">Ajouter un Rôle</RouterLink></li>
        <li><RouterLink to="/ajouter-employes">Assigner un Rôle à un Employé</RouterLink></li>
        <li><RouterLink to="/employes/:id/roles">Voir les Rôles d'un Employé</RouterLink></li>
        <li><a @click.prevent="goBack" href="#">⬅ Retour</a></li>
      </ul>
    </div>

    <!-- Contenu principal -->
    <div class="main-content">
      <header class="header">
        <div class="menu-button" @click="toggleMenu">
          <img src="@/assets/menu-icon.png" alt="Menu" class="menu-icon" />
        </div>
      </header>

      <!-- Tableau des rôles -->
      <main>
        <h1>Liste des Rôles</h1>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <td v-if="!role.isEditing">{{ role.id }}</td>
              <td v-else><input v-model="role.nom_role" type="text" /></td>
              <td v-if="!role.isEditing">{{ role.nom_role }}</td>
              <td v-else><input v-model="role.nom_role" type="text" /></td>
              <td>
                <button v-if="!role.isEditing" class="btn btn-primary" @click="editRole(role)">Modifier</button>
                <button v-if="role.isEditing" class="btn btn-success" @click="saveRole(role)">Sauvegarder</button>
                <button v-if="!role.isEditing" class="btn btn-danger" @click="confirmDelete(role)">Supprimer</button>
                <button v-if="role.isEditing" class="btn btn-secondary" @click="cancelEdit(role)">Annuler</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Barre d'état -->
        <div class="status-bar">
          <p>
            Sélection actuelle : 
            {{ selectedRole ? `Rôle ID ${selectedRole.id}` : 'Aucun rôle sélectionné' }}
          </p>
        </div>
      </main>
    </div>

    <!-- Modale de confirmation de suppression -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer le rôle ID {{ selectedRole?.id }} ?</p>
        <div class="modal-actions">
          <button @click="deleteRole" class="btn btn-danger">Oui</button>
          <button @click="closeModal" class="btn btn-secondary">Non</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

// Variables pour les rôles et gestion du menu
const roles = ref([]);
const menuOpen = ref(false);
const selectedRole = ref(null); // Rôle sélectionné
const isModalOpen = ref(false); // État de la modale

// Charger les rôles depuis l'API
const getRoles = () => {
  axios.get("http://localhost:5000/api/roles")
    .then((res) => {
      roles.value = res.data.data.map(role => ({ ...role, isEditing: false })); // Ajout de `isEditing` à chaque rôle
    })
    .catch((err) => console.error(err));
};

// Sélectionner un rôle
const selectRole = (role) => {
  selectedRole.value = role;
};

// Modifier un rôle (passer en mode édition)
const editRole = (role) => {
  role.isEditing = true;
};

// Sauvegarder les modifications du rôle
const saveRole = async (role) => {
  try {
    await axios.put(`http://localhost:5000/api/roles/${role.id}`, { nom_role: role.nom_role });
    role.isEditing = false;
    alert("Rôle mis à jour avec succès");
    getRoles(); // Recharge les rôles après la modification
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la mise à jour du rôle");
  }
};

// Annuler l'édition du rôle
const cancelEdit = (role) => {
  role.isEditing = false;
  // Réinitialiser le nom du rôle à son état initial
  role.nom_role = role.originalNomRole;
};

// Confirmer la suppression d'un rôle
const confirmDelete = (role) => {
  selectedRole.value = role;
  isModalOpen.value = true;
};

// Supprimer le rôle
const deleteRole = async () => {
  try {
    await axios.delete(`http://localhost:5000/api/roles/${selectedRole.value.id}`);
    alert("Rôle supprimé avec succès");
    getRoles(); // Recharge les rôles après la suppression
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression du rôle");
  } finally {
    closeModal();
  }
};

// Fermer la modale
const closeModal = () => {
  isModalOpen.value = false;
};

// Fonction pour basculer l'état du menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Charger les rôles avant le montage du composant
onBeforeMount(() => {
  getRoles();
});

// Fonction pour revenir à la page précédente
const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
.role-menu {
  display: flex;
  height: 100vh;
  background-color: #f0f8ff; /* Bleu clair */
}

/* Sidebar (menu latéral) */
.menu-role-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #2c3e50; /* Bleu foncé */
  color: white;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.menu-role-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.menu-role-sidebar li {
  margin: 15px 0;
}

.menu-role-sidebar a {
  color: white;
  text-decoration: none;
}

.menu-role-sidebar .menu-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-role-sidebar {
  transform: translateX(-250px);
}

.menu-role-sidebar.open {
  transform: translateX(0);
}

/* Contenu principal */
.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 250px;
}

h1 {
  font-size: 24px;
}

.table {
  width: 100%;
  margin-top: 20px;
}

.menu-button {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
}

.menu-icon {
  width: 40px;
  height: 40px;
  background-color: #2c3e50;
  border-radius: 50%;
  padding: 10px;
}

/* Barre d'état */
.status-bar {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
}

/* Modale */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.btn-danger {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger:hover {
  background-color: darkred;
}

.btn-primary {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: grey;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
