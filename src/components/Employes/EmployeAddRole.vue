<template>
  <div class="employe-page-container">
    <!-- Menu à gauche avec une image en arrière-plan -->
    <div class="menu-employe-sidebar" :class="{ open: menuOpen }">
      <div class="menu-header" @click="toggleMenu">
        <h3>Menu Absences</h3>
      </div>
      <ul v-if="menuOpen">
        <li><RouterLink to="/employes">Liste des Employés</RouterLink></li>
          <li><RouterLink to="/ajouter-employe">Ajouter un Employé</RouterLink></li>
          <li><RouterLink :to="`/employes/${employeId}/absences`">Voir les absences de l'employé</RouterLink></li>
          <li><RouterLink to="/ajouter-role">Ajouter un rôle à un employé</RouterLink></li>
          <li><RouterLink to="/employe/:id/roles">Rôles d'un Employé</RouterLink></li>
        <li><a @click.prevent="goBack" href="#">⬅ Retour</a></li>
      </ul>
    </div>

    <!-- Icône du menu en haut à gauche (visible uniquement lorsque le menu est fermé) -->
    <header class="header">
      <div v-if="!menuOpen" class="menu-button" @click="toggleMenu">
        <img src="@/assets/menu-icon.png" alt="Menu" class="menu-icon" />
      </div>
    </header>
    <!-- Contenu principal -->
    <div class="main-content">
      <div class="employee-page-container">
        <h2>Ajouter un Rôle à un Employé</h2>

         <form class="form-group">
        <!-- Champ pour entrer l'ID de l'employé -->
        <div class="form-group">
          <label for="employeId">ID de l'employé :</label>
          <input
            v-model="selectedEmployeId"
            type="number"
            id="employeId"
            placeholder="Entrez l'ID de l'employé"
            required
            class="form-control"
          />
        </div>

        <!-- Champ pour entrer l'ID du rôle -->
        <div class="form-group">
          <label for="roleId">ID du rôle :</label>
          <input
            v-model="selectedRoleId"
            type="number"
            id="roleId"
            placeholder="Entrez l'ID du rôle"
            required
            class="form-control"
          />
        </div>

        <!-- Boutons -->
        <div class="button-group">
          <button @click="ajouterRole" class="save-button">Ajouter le Rôle</button>
          <button @click="goBack" class="back-button">Retour</button>
        </div>

      </form>

        <!-- Message de statut -->
        <div v-if="message" class="status-message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter(); 


const selectedEmployeId = ref("");  // ID de l'employé sélectionné
const selectedRoleId = ref("");     // ID du rôle sélectionné
const message = ref("");           // Message de statut

// Ajouter un rôle à un employé
const ajouterRole = async (e) => {
  e.preventDefault(); // Empêche la soumission du formulaire par défaut
  if (selectedEmployeId.value && selectedRoleId.value) {
    try {
      const response = await axios.post(`http://localhost:5000/api/employes/${selectedEmployeId.value}/roles/${selectedRoleId.value}`);
      message.value = response.data.message; // Message de succès depuis la réponse du backend
    } catch (error) {
      console.error("Erreur lors de l'ajout du rôle:", error);
      message.value = "Erreur lors de l'ajout du rôle.";
    }
  } else {
    message.value = "Veuillez saisir un ID d'employé et un ID de rôle.";
  }
};

const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Fonction de retour
const goBack = () => {
  window.history.back(); // Retourner à la page précédente
};
</script>

<style scoped>
/* Styles du menu et de la page */
/* Menu à gauche */
.menu-employe-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.menu-employe-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.menu-employe-sidebar li {
  margin: 15px 0;
}

.menu-employe-sidebar a {
  color: white;
  text-decoration: none;
}

.menu-employe-sidebar .menu-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-employe-sidebar {
  transform: translateX(-250px);
}

.menu-employe-sidebar.open {
  transform: translateX(0);
}

/* Arrière-plan global */
.employe-page-container {
  background-color:  #f0f8ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

/* Icône du menu */
.header {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1100;
}

.menu-button {
  cursor: pointer;
}

.menu-icon {
    width: 40px;
    height: 40px;
    background-color: #333;
    border-radius: 50%;
    padding: 10px;
  }
/* Formulaire */
.employe-page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.employee-add-container {
  max-width: 600px;
  margin: 0 auto;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button, .back-button {
  padding: 10px 20px;
  font-size: 16px;
}

.status-message {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
</style>
