<template>
  <main>
    <!-- En-tête -->
    <div class="header">
      <h1>Gestion de la Liste des Employés</h1>
    </div>

    <!-- Contenu principal : Tableau des employés -->
    <v-row>
      <v-col cols="12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <!-- Message si aucun employé -->
            <tr v-if="employes.length === 0">
              <td colspan="4" class="text-center">Aucun employé trouvé.</td>
            </tr>
            <!-- Liste des employés -->
            <tr v-for="employe in employes" :key="employe.id" @click="selectEmploye(employe)">
              <td>{{ employe.id }}</td>
              <td>{{ employe.nom }}</td>
              <td>{{ employe.prenom }}</td>
              <td>{{ employe.email }}</td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>

    <!-- Panneau de contrôle -->
    <v-row class="control-panel">
      <v-btn color="primary" @click="addEmploye">Ajouter</v-btn>
      <v-btn color="success" @click="editSelectedEmploye" :disabled="!selectedEmploye">Modifier</v-btn>
      <v-btn color="error" @click="deleteSelectedEmploye" :disabled="!selectedEmploye">Supprimer</v-btn>
      <v-btn color="info" @click="goBack">Retour</v-btn>
    </v-row>

    <!-- Barre d'état -->
    <div class="status-bar">
      <p>Sélection actuelle : {{ selectedEmploye ? selectedEmploye.nom : 'Aucun employé sélectionné' }}</p>
    </div>
  </main>
</template>

<script setup>
// Importations nécessaires
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'

// Liste des employés
const employes = ref([]) // Liste des employés
const selectedEmploye = ref(null) // Employé sélectionné

// Charger la liste des employés depuis l'API
const getEmployes = () => {
  axios
    .get('http://localhost:5000/api/employes') // Remplacez par votre URL réelle
    .then((res) => {
      employes.value = res.data
    })
    .catch((err) => console.log(err))
}

// Ajouter un nouvel employé
const addEmploye = () => {
  alert('Ajouter un nouvel employé (rediriger vers un formulaire)')
}

// Modifier l'employé sélectionné
const editSelectedEmploye = () => {
  if (selectedEmploye.value) {
    alert(`Modifier l'employé : ${selectedEmploye.value.nom}`)
  } else {
    alert('Aucun employé sélectionné')
  }
}

// Supprimer l'employé sélectionné
const deleteSelectedEmploye = () => {
  if (selectedEmploye.value) {
    deleteEmploye(selectedEmploye.value.id)
  } else {
    alert('Aucun employé sélectionné')
  }
}

// Supprimer un employé par ID
const deleteEmploye = (id) => {
  axios
    .delete(`http://localhost:5000/api/employes/${id}`)
    .then(() => getEmployes())
    .catch((err) => console.log(err))
}

// Charger les employés au montage du composant
onBeforeMount(() => {
  getEmployes()
})

// Sélectionner un employé
const selectEmploye = (employe) => {
  selectedEmploye.value = employe
}

// Fonction de retour à la page précédente
const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
/* Conteneur principal */
main {
  background-image: url('C:/Users/laura/OneDrive/Pictures'); /* Chemin de l'image */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border: 10px solid transparent; /* Bordures visibles */
  padding: 20px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); /* Effet de profondeur */
}

/* En-tête */
.header {
  text-align: center;
  margin-bottom: 20px;
}

/* Tableau des employés */
.table {
  margin-top: 20px;
  background-color: white; /* Garder la lisibilité */
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
