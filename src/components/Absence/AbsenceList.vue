<template>
    <main>
      <!-- En-tête -->
      <div class="header">
        <h1>Gestion des Absences</h1>
      </div>
  
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
    </main>
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
  </script>
  
  <style scoped>
  main {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
  }
  
  /* En-tête */
  .header {
    text-align: center;
    margin-bottom: 20px;
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
  