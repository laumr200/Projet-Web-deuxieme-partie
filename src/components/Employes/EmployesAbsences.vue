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
  <div class="employe-add-container">
    <!-- Barre de recherche en haut de la page -->
    <div class="search-bar">
      <label for="search">Recherche par prénom :</label>
      <input
        v-model="searchPrenom"
        type="text"
        id="search"
        placeholder="Entrez le prénom de l'employé"
        @input="fetchAbsences"
        class="search-input"
      />
    </div>

    <!-- Tableau des absences de l'employé -->
    <div v-if="absences.length > 0" class="absences-table">
      <h3>Absences de l'employé : {{ searchPrenom }}</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Motif</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="absence in absences" :key="absence.id">
            <td>{{ absence.date }}</td>
            <td>{{ absence.motif }}</td>
            <td>{{ absence.duree }} jours</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message d'erreur si l'employé n'est pas trouvé -->
    <div v-if="absences.length === 0 && searchPrenom" class="no-absences">
      Aucun employé trouvé avec ce prénom.
    </div>
  </div>
 </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter(); 


// Variables réactives
const searchPrenom = ref('');  // Prénom à rechercher
const absences = ref([]);      // Liste des absences

// Fonction pour rechercher l'employé par prénom et afficher ses absences
const fetchAbsences = async () => {
  if (searchPrenom.value.trim() !== "") {
    try {
      // 1. Rechercher l'employé par prénom (requête API)
      const response = await axios.get(`http://localhost:5000/api/employes?prenom=${searchPrenom.value}`);
      const employe = response.data;

      if (employe) {
        // 2. Si l'employé est trouvé, récupérer l'ID
        const employeId = employe.id;

        // 3. Récupérer les absences de l'employé avec l'ID
        const absencesResponse = await axios.get(`http://localhost:5000/api/employes/${employeId}/absences`);
        absences.value = absencesResponse.data.data; // Mettre à jour les absences
      } else {
        absences.value = []; // Réinitialiser la liste si l'employé n'est pas trouvé
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des absences:", error);
      absences.value = []; // Effacer les absences en cas d'erreur
    }
  } else {
    absences.value = []; // Réinitialiser la liste si la recherche est vide
  }
};

const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* Styles pour la barre de recherche */
.search-bar {
  margin: 20px 0;
}

.search-input {
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  margin-top: 5px;
}

/* Styles pour le tableau des absences */
.absences-table {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

table th {
  background-color: #f2f2f2;
}

/* Styles pour le message d'absence non trouvée */
.no-absences {
  margin-top: 20px;
  color: red;
  font-weight: bold;
}

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
    /* Add a background color for better visibility */
    background-color: #333;
    border-radius: 50%;
    padding: 10px;
  }
/* Formulaire */
.employe-add-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

</style>
