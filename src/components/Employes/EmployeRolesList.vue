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
  <div class="container">
    <div class="employee-add-container">
    <h1>Rôles d'un Employé</h1>

    <!-- Recherche d'un employé par nom -->
    <div class="search-bar">
      <label for="search">Rechercher les roles </label>
      <input
        v-model="searchNom"
        type="text"
        id="search"
        placeholder="Entrez le nom de l'employé"
        @input="fetchEmployes"
      />
    </div>

    <!-- Affichage du tableau des employés trouvés -->
    <div v-if="foundEmployes.length > 0" class="employes-table">
      <h2>Employés trouvés :</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Rôles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employe in foundEmployes" :key="employe.id">
            <td>{{ employe.nom }}</td>
            <td>
              <ul>
                <li v-for="role in employe.roles" :key="role.id">{{ role.nom }}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Message si aucun employé n'est trouvé -->
    <div v-if="foundEmployes.length === 0 && searchNom" class="no-results">
      Aucun employé trouvé.
    </div>

    <!-- Bouton de retour -->
    <div>
      <button @click="goBack">Retour</button>
    </div>
  </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'


const searchNom = ref('')  // Nom de l'employé à rechercher
const foundEmployes = ref([]) // Liste des employés trouvés
const router = useRouter()

// Fonction pour récupérer les employés par nom et leurs rôles
const fetchEmployes = async () => {
  if (searchNom.value.trim() !== '') {
    try {
      const response = await fetch(`/api/employes?nom=${searchNom.value}`)
      const data = await response.json()
      if (data.length > 0) {
        // Ajout des rôles pour chaque employé
        foundEmployes.value = await Promise.all(data.map(async (employe) => {
          const rolesResponse = await fetch(`/api/employes/${employe.id}/roles`)
          const rolesData = await rolesResponse.json()
          employe.roles = rolesData.data || []
          return employe
        }))
      } else {
        foundEmployes.value = [] // Réinitialiser si aucun employé n'est trouvé
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des employés :", error)
      foundEmployes.value = []
    }
  } else {
    foundEmployes.value = [] // Réinitialiser si le champ est vide
  }
}


const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
/* Styles pour centrer le contenu */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.search-bar {
  margin: 20px 0;
}

input {
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

table {
  width: 100%;
  margin-top: 20px;
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

.no-results {
  color: red;
  font-weight: bold;
  margin-top: 20px;
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
</style>
