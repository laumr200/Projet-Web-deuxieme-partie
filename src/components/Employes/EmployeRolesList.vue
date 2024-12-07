<template>
    <div>
      <h1>Rôles d'un Employé</h1>
  
      <!-- Sélection de l'employé -->
      <div>
        <label for="employe">Sélectionner un employé</label>
        <select v-model="selectedEmploye" id="employe" @change="fetchRoles">
          <option v-for="employe in employes" :key="employe.id" :value="employe.id">{{ employe.nom }}</option>
        </select>
      </div>
  
      <!-- Affichage des rôles -->
      <div v-if="roles.length">
        <h2>Rôles de l'employé</h2>
        <ul>
          <li v-for="role in roles" :key="role.id">{{ role.nom }}</li>
        </ul>
      </div>
  
      <!-- Bouton de retour -->
      <div>
        <button @click="goBack">Retour</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const employes = ref([{ id: 1, nom: 'Employé 1' }, { id: 2, nom: 'Employé 2' }]) // Exemple d'employés
  const roles = ref([])
  const selectedEmploye = ref(null)
  const router = useRouter()
  
  // Fonction pour récupérer les rôles de l'employé
  const fetchRoles = async () => {
    if (selectedEmploye.value) {
      try {
        const response = await fetch(`/api/employes/${selectedEmploye.value}/roles`)
        const data = await response.json()
        roles.value = data.data || []
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles :", error)
        roles.value = []
      }
    }
  }
  
  // Fonction de retour
  const goBack = () => {
    router.go(-1) // Retourner à la page précédente
  }
  </script>
  
  <style scoped>
  button {
    margin-top: 20px;
  }
  </style>
  