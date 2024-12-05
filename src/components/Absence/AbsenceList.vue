<template>
  <div class="absence-page-container">
    <!-- Menu à gauche avec une image en arrière-plan -->
    <div class="menu-absence-sidebar" :class="{ open: menuOpen }">
      <div class="menu-header" @click="toggleMenu">
        <h3>Menu Absences</h3>
      </div>
      <ul v-if="menuOpen">
        <li><RouterLink to="/add-absence">Ajouter une absence</RouterLink></li>
        <li><RouterLink to="/absences">Liste des Absences</RouterLink></li>
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
      <div class="absence-add-container">
        <!-- En-tête -->
        <h1>Gestion des Absences</h1>

        <!-- Tableau des absences -->
        <v-row>
          <v-col cols="12">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Justification</th>
                </tr>
              </thead>
              <tbody>
                <!-- Message si aucune absence -->
                <tr v-if="absences.length === 0">
                  <td colspan="4" class="text-center">Aucune absence trouvée.</td>
                </tr>
                <!-- Liste des absences -->
                <tr
                  v-for="absence in absences"
                  :key="absence.id"
                  @click="selectAbsence(absence)"
                  :class="{ selected: selectedAbsence && selectedAbsence.id === absence.id }"
                >
                  <td>{{ absence.id }}</td>
                  <td>{{ absence.date_absence }}</td>
                  <td>{{ absence.type_absence }}</td>
                  <td>{{ absence.justification || 'Non spécifiée' }}</td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>

        <!-- Panneau de contrôle -->
        <v-row class="control-panel">
          <v-btn color="success" @click="editSelectedAbsence" :disabled="!selectedAbsence">Modifier</v-btn>
          <v-btn color="error" @click="deleteSelectedAbsence" :disabled="!selectedAbsence">Supprimer</v-btn>
          <v-btn color="info" @click="goBack">Retour</v-btn>
        </v-row>

        <!-- Barre d'état -->
        <div class="status-bar">
          <p>
            Sélection actuelle :
            {{ selectedAbsence ? `Absence ID ${selectedAbsence.id}` : 'Aucune absence sélectionnée' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

// Liste des absences et absence sélectionnée
const absences = ref([]);
const selectedAbsence = ref(null);

// Charger toutes les absences depuis l'API
const getAllAbsences = () => {
  axios
    .get('http://localhost:5000/api/absences') // Remplacez par votre URL réelle
    .then((res) => {
      absences.value = res.data.data;
    })
    .catch((err) => console.log(err));
};

// Modifier l'absence sélectionnée
const editSelectedAbsence = () => {
  if (selectedAbsence.value) {
    alert(`Modifier l'absence ID : ${selectedAbsence.value.id}`);
  } else {
    alert('Aucune absence sélectionnée');
  }
};

// Supprimer l'absence sélectionnée
const deleteSelectedAbsence = () => {
  if (selectedAbsence.value) {
    axios
      .delete(`http://localhost:5000/api/absences/${selectedAbsence.value.id}`)
      .then(() => getAllAbsences())
      .catch((err) => console.log(err));
  } else {
    alert('Aucune absence sélectionnée');
  }
};

// Charger les absences au montage
onBeforeMount(() => {
  getAllAbsences();
});

// Sélectionner une absence
const selectAbsence = (absence) => {
  selectedAbsence.value = absence;
};

// Fonction pour revenir à la page précédente
const goBack = () => {
  window.history.back();
};

// Contrôle de l'ouverture du menu
const menuOpen = ref(false);

// Fonction pour basculer l'état du menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style scoped>
/* Arrière-plan global */
.absence-page-container {
  background-color: #f0f8ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

/* Menu à gauche */
.menu-absence-sidebar {
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

.menu-absence-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.menu-absence-sidebar li {
  margin: 15px 0;
}

.menu-absence-sidebar a {
  color: white;
  text-decoration: none;
}

.menu-absence-sidebar .menu-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-absence-sidebar {
  transform: translateX(-250px);
}

.menu-absence-sidebar.open {
  transform: translateX(0);
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
  width: 30px;
  height: 30px;
}

/* Contenu principal */
.main-content {
  margin-top: 50px;
  margin-left: 260px;
  padding: 20px;
  flex: 1;
}

/* Tableau des absences */
.table {
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.selected {
  background-color: #e0f7fa;
}

/* Panneau de contrôle */
.control-panel {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

/* Barre d'état */
.status-bar {
  margin-top: 10px;
  background-color: #f5f5f5;
  padding: 10px;
  border-top: 1px solid #ddd;
}
</style>
