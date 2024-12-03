<template>
    <div class="add-role">
      <h2>Ajouter un rôle à un employé</h2>
  
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedEmploye"
            :items="employes"
            item-text="nom"
            item-value="id"
            label="Sélectionner un employé"
            outlined
            required
          />
        </v-col>
  
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedRole"
            :items="roles"
            item-text="nom"
            item-value="id"
            label="Sélectionner un rôle"
            outlined
            required
          />
        </v-col>
      </v-row>
  
       <!-- Boutons -->
    <div>
      <button @click="ajouterRole">Ajouter le rôle</button>
      <button @click="goBack">Retour</button>
    </div>
  
      <div v-if="message" class="status-message">{{ message }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const selectedEmploye = ref(null);  // Employé sélectionné
  const selectedRole = ref(null);     // Rôle sélectionné
  const message = ref("");           // Message de statut
  const employes = ref([]);          // Liste des employés
  const roles = ref([]);             // Liste des rôles
  
  // Charger les employés et rôles au montage du composant
  const loadData = async () => {
    try {
      const employesResponse = await axios.get('http://localhost:5000/api/employes');
      const rolesResponse = await axios.get('http://localhost:5000/api/roles');
      employes.value = employesResponse.data;
      roles.value = rolesResponse.data;
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      message.value = "Impossible de charger les données.";
    }
  };
  
  // Ajouter un rôle à un employé
const ajouterRole = () => {
  if (selectedEmploye.value && selectedRole.value) {
    // Appeler l'API pour ajouter le rôle à l'employé
    message.value = "Rôle ajouté à l'employé avec succès !"
  } else {
    message.value = "Veuillez sélectionner un employé et un rôle."
  }
}

// Fonction de retour
const goBack = () => {
  router.go(-1) // Retourner à la page précédente
}
  
  // Charger les données au montage du composant
  onMounted(() => {
    loadData();
  });
  </script>
  
  <style scoped>
  .add-role {
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .status-message {
    margin-top: 20px;
    color: green;
    font-weight: bold;
  }
  
  .v-select {
    margin-bottom: 20px;
  }
  
  .v-btn {
    display: block;
    width: 100%;
  }
  </style>
  