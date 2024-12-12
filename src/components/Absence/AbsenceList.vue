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
      <div class="absence-liste-container">
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <!-- Message si aucune absence -->
                <tr v-if="paginatedAbsences.length === 0">
                  <td colspan="5" class="text-center">Aucune absence trouvée.</td>
                </tr>
                <!-- Liste des absences paginées -->
                <tr
                  v-for="absence in paginatedAbsences"
                  :key="absence.id"
                  @click="selectAbsence(absence)"
                  :class="{ selected: selectedAbsence && selectedAbsence.id === absence.id }"
                >
                  <td>{{ absence.id }}</td>
                  <td>
                    <input
                      v-if="editingAbsence === absence.id"
                      type="date"
                      v-model="absence.date_absence"
                    />
                    <span v-else>{{ absence.date_absence }}</span>
                  </td>
                  <td>
                    <input
                      v-if="editingAbsence === absence.id"
                      type="text"
                      v-model="absence.type_absence"
                    />
                    <span v-else>{{ absence.type_absence }}</span>
                  </td>
                  <td>
                    <input
                      v-if="editingAbsence === absence.id"
                      type="text"
                      v-model="absence.justification"
                    />
                    <span v-else>{{ absence.justification || 'Non spécifiée' }}</span>
                  </td>
                  <td>
                    <!-- Boutons d'action -->
                    <v-btn class="btn btn-primary" @click.stop="editAbsence(absence)">Modifier</v-btn>
                    <v-btn class="btn btn-danger" @click.stop="confirmDelete(absence)">Supprimer</v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
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

    <!-- Modale de confirmation -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer l'absence ID {{ selectedAbsence?.id }} ?</p>
        <div class="modal-actions">
          <button @click="deleteAbsence" class="btn btn-danger">Oui</button>
          <button @click="closeModal" class="btn btn-secondary">Non</button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination-container">
      <button @click="previousPage" :disabled="currentPage === 1">⬅ Page Précédent</button>
    
      <button @click="nextPage" :disabled="currentPage === totalPages">Page Suivant➡</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import axios from 'axios';

// Liste des absences et absence sélectionnée
const absences = ref([]);
const selectedAbsence = ref(null);
const editingAbsence = ref(null); // Absence en mode édition

// État de la modale
const isModalOpen = ref(false);

// Charger toutes les absences depuis l'API
const getAllAbsences = () => {
  axios
    .get('http://localhost:5000/api/absences') 
    .then((res) => {
      absences.value = res.data.data;
    })
    .catch((err) => console.log(err));
};

// Modifier une absence
const editAbsence = (absence) => {
  if (editingAbsence.value === absence.id) {
    saveAbsence(absence);
  } else {
    editingAbsence.value = absence.id;
  }
};

const saveAbsence = async (absence) => {
  try {
    await axios.put(`http://localhost:5000/api/absences/${absence.id}`, {
      date_absence: absence.date_absence,
      type_absence: absence.type_absence,
      justification: absence.justification,
    });
    alert("Absence mise à jour avec succès");
    editingAbsence.value = null;
    getAllAbsences();
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la mise à jour de l'absence");
  }
};

// Confirmer la suppression d'une absence
const confirmDelete = (absence) => {
  selectedAbsence.value = absence;
  isModalOpen.value = true;
};

// Supprimer l'absence sélectionnée
const deleteAbsence = async () => {
  try {
    await axios.delete(`http://localhost:5000/api/absences/${selectedAbsence.value.id}`);
    alert("Absence supprimée avec succès");
    getAllAbsences();
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression de l'absence");
  } finally {
    closeModal();
  }
};

// Fermer la modale
const closeModal = () => {
  isModalOpen.value = false;
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

// Pagination
const pageSize = 7;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(absences.value.length / pageSize));

const paginatedAbsences = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return absences.value.slice(start, end);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

</script>

<style scoped>
/* Conteneur principal */
.absence-page-container {
  background-color: #f0f8ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

/* Menu latéral */
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
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #f5f5f5;
}

.selected {
  background-color: #e0f7fa;
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

.btn-primary:hover {
  background-color: darkblue;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-button, .pagination-number {
  padding: 10px 15px;
  margin: 0 5px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.pagination-number.active {
  background-color: #4CAF50;
  color: white;
}

.pagination-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}


</style>
