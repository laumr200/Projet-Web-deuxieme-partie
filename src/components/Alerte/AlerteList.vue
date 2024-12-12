<template>
    <div class="alerte-page-container">
      <!-- Menu à gauche avec une image en arrière-plan -->
      <div class="menu-alerte-sidebar" :class="{ open: menuOpen }">
        <div class="menu-header" @click="toggleMenu">
          <h3>Menu Alertes</h3>
        </div>
        <ul v-if="menuOpen">
          <li><RouterLink to="/alerteadd">Ajouter une alerte</RouterLink></li>
          <li><RouterLink to="/alertelist">Liste des alerte</RouterLink></li>
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
        <div class="alerte-liste-container">
          <!-- En-tête -->
          <h1>Gestion des Alertes</h1>
 
          <!-- Tableau des alertes -->
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
                  <!-- Message si aucune alerte -->
                  <tr v-if="alertes.length === 0">
                    <td colspan="5" class="text-center">Aucune alerte trouvée.</td>
                  </tr>
                  <!-- Liste des alertes -->
                  <tr
      v-for="alerte in alertes"
      :key="alerte.id"
      @click="selectAbsence(alerte)"
      :class="{ selected: selectedAlerte && selectedAlerte.id === alerte.id }"
    >
      <td>{{ alerte.id }}</td>
      <td>
        <input
          v-if="editingAlerte === alerte.id"
          type="date"
          v-model="alerte.date_alerte"
        />
        <span v-else>{{ alerte.date_alerte }}</span>
      </td>
      <td>
        <input
          v-if="editingAbsence === alerte.id"
          type="text"
          v-model="alerte.type_alerte"
        />
        <span v-else>{{ alerte.type_alerte }}</span>
      </td>
      <td>
        <input
          v-if="editingAlerte === alerte.id"
          type="text"
          v-model="alerte.justification"
        />
        <span v-else>{{ alerte.justification || 'Non spécifiée' }}</span>
      </td>
      <td>
        <!-- Boutons d'action -->
        <v-btn  class="btn btn-primary" @click.stop="editAbsence(alerte)">Modifier</v-btn>
        <v-btn  class="btn btn-danger" @click.stop="confirmDelete(alerte)">Supprimer</v-btn>
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
              {{ selectedAlerte ? `Alerte ID ${selectedAlerte.id}` : 'Aucune alerte trouvée' }}
            </p>
          </div>
        </div>
      </div>
 
      <!-- Modale de confirmation -->
      <div v-if="isModalOpen" class="modal-overlay">
        <div class="modal-content">
          <p>Êtes-vous sûr de vouloir supprimer l'alerte ID {{ selectedAlerte?.id }} ?</p>
          <div class="modal-actions">
            <button @click="deleteAlerte" class="btn btn-danger">Oui</button>
            <button @click="closeModal" class="btn btn-secondary">Non</button>
          </div>
        </div>
      </div>
    </div>
  </template>
 
 
  <script setup>
  import { ref, onBeforeMount } from 'vue';
  import axios from 'axios';
 
  // Liste des alertes et alerte sélectionnée
  const alertes = ref([]);
  const selectedAlerte = ref(null);
  const editingAlerte = ref(null); // Alerte en mode édition
 
 
  // État de la modale
  const isModalOpen = ref(false);
 
  // Charger toutes les alertes depuis l'API
  const getAllAlertes = () => {
    axios
      .get('http://localhost:5000/api/absences')
      .then((res) => {
        alertes.value = res.data.data;
      })
      .catch((err) => console.log(err));
  };
 
  // Modifier une alerte
 
  const editAlerte = (alerte) => {
    if (editingAlerte.value === alerte.id) {
      // Si l'alerte est déjà en mode édition, on sauvegarde les modifications
      saveAlerte(alerte);
    } else {
      // Sinon, on passe cette alerte en mode édition
      editingAlerte.value = alerte.id;
    }
  };
 
  const saveAlerte= async (alerte) => {
    try {
      await axios.put(`http://localhost:5000/api/alertes/${alerte.id}`, {
        date_alerte: alerte.date_alerte,
        type_alerte: alerte.type_alerte,
        justification: alerte.justification,
      });
      alert("Alerte mise à jour avec succès");
      editingAlerte.value = null; // Quitter le mode édition
      getAllAlertes(); // Recharge la liste après modification
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour de l'alerte");
    }
  };
 
  // Confirmer la suppression d'une alerte
  const confirmDelete = (alerte) => {
    selectedAbsence.value = alerte;
    isModalOpen.value = true;
  };
 
  // Supprimer l'alerte sélectionnée
  const deleteAlerte = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/alertes/${selectedAlerte.value.id}`);
      alert("Alerte supprimée avec succès");
      getAllAlertes(); // Recharge la liste après suppression
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression de l'alerte");
    } finally {
      closeModal();
    }
  };
 
  // Fermer la modale
  const closeModal = () => {
    isModalOpen.value = false;
  };
 
  // Charger les alertes au montage
  onBeforeMount(() => {
    getAllAlertes();
  });
 
  // Sélectionner une alerte
  const selectAlerte = (alerte) => {
    selectedAlerte.value = alerte;
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
  .alerte-page-container {
    background-color: #f0f8ff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: Arial, sans-serif;
  }
 
  /* Menu à gauche */
  .menu-alerte-sidebar {
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
 
  .menu-alerte-sidebar ul {
    list-style-type: none;
    padding: 0;
  }
 
  .menu-alerte-sidebar li {
    margin: 15px 0;
  }
 
  .menu-alerte-sidebar a {
    color: white;
    text-decoration: none;
  }
 
  .menu-alerte-sidebar .menu-header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
 
  .menu-alerte-sidebar {
    transform: translateX(-250px);
  }
 
  .menu-alerte-sidebar.open {
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
 
  /* Tableau des alertes */
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
 
  </style>
 
 