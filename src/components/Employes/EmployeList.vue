<template>
  <div class="employe-page-container">
    <!-- Menu à gauche avec une image en arrière-plan -->
    <div class="menu-employe-sidebar" :class="{ open: menuOpen }">
      <div class="menu-header" @click="toggleMenu">
        <h3>Menu Employés</h3>
      </div>
      <ul v-if="menuOpen">
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
      <div class="employe-liste-container">
        <!-- En-tête -->
        <h1>Gestion des Employés</h1>

        <!-- Tableau des employés -->
        <v-row>
          <v-col cols="12">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <!-- Message si aucun employé -->
                <tr v-if="paginatedEmployes.length === 0">
                  <td colspan="5" class="text-center">Aucun employé trouvé.</td>
                </tr>
                <!-- Liste des employés avec pagination -->
                <tr
                  v-for="employe in paginatedEmployes"
                  :key="employe.id"
                  @click="selectEmploye(employe)"
                  :class="{ selected: selectedEmploye && selectedEmploye.id === employe.id }"
                >
                  <td>{{ employe.id }}</td>
                  <td>
                    <input
                      v-if="editingEmploye === employe.id"
                      type="text"
                      v-model="employe.nom"
                    />
                    <span v-else>{{ employe.nom }}</span>
                  </td>
                  <td>
                    <input
                      v-if="editingEmploye === employe.id"
                      type="text"
                      v-model="employe.prenom"
                    />
                    <span v-else>{{ employe.prenom }}</span>
                  </td>
                  <td>
                    <input
                      v-if="editingEmploye === employe.id"
                      type="email"
                      v-model="employe.email"
                    />
                    <span v-else>{{ employe.email }}</span>
                  </td>
                  <td>
                    <!-- Boutons d'action -->
                    <v-btn class="btn btn-primary" @click.stop="editEmploye(employe)">Modifier</v-btn>
                    <v-btn class="btn btn-danger" @click.stop="confirmDelete(employe)">Supprimer</v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-col>
        </v-row>

        <!-- Pagination -->
        <div class="pagination">
          <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">⬅ Page Précédent</button>
          <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Page Suivant ➡</button>
        </div>

        <!-- Barre d'état -->
        <div class="status-bar">
          <p>
            Sélection actuelle :
            {{ selectedEmploye ? `Employé ID ${selectedEmploye.id}` : 'Aucun employé sélectionné' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Modale de confirmation -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer l'employé ID {{ selectedEmploye?.id }} ?</p>
        <div class="modal-actions">
          <button @click="deleteEmploye" class="btn btn-danger">Oui</button>
          <button @click="closeModal" class="btn btn-secondary">Non</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import axios from 'axios';

const employes = ref([]);
const selectedEmploye = ref(null);
const menuOpen = ref(false);
const isModalOpen = ref(false);
const editingEmploye = ref(null);

const currentPage = ref(1);
const itemsPerPage = 5;

const totalPages = computed(() => Math.ceil(employes.value.length / itemsPerPage));

const paginatedEmployes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return employes.value.slice(start, end);
});

// Changer de page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Charger la liste des employés depuis l'API
const getEmployes = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Token manquant. Veuillez vous connecter.");
    return;
  }
  axios
    .get('http://localhost:5000/api/employes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      employes.value = res.data;
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des employés :", err.response?.data || err.message);
    });
};

// Modifier l'employé sélectionné
const editEmploye = (employe) => {
  editingEmploye.value = employe.id;
};

// Confirmer la suppression de l'employé
const confirmDelete = (employe) => {
  selectedEmploye.value = employe;
  isModalOpen.value = true;
};

// Supprimer un employé par ID
const deleteEmploye = async () => {
  try {
    await axios.delete(`http://localhost:5000/api/employes/${selectedEmploye.value.id}`);
    alert("Employé supprimé avec succès");
    getEmployes();
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression de l'employé");
  } finally {
    closeModal();
  }
};

// Fermer la modale
const closeModal = () => {
  isModalOpen.value = false;
};

onBeforeMount(() => {
  getEmployes();
});

// Sélectionner un employé
const selectEmploye = (employe) => {
  selectedEmploye.value = employe;
};

// Fonction pour revenir à la page précédente
const goBack = () => {
  window.history.back();
};

// Toggle du menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style scoped>
.employe-page-container {
  background-color: #f0f8ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, sans-serif;
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
  background-color: blue;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>
