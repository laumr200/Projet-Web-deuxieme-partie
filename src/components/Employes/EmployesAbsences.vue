<template>
    <div class="absence-search">
      <h2>Recherche des Absences</h2>
  
      <!-- Liste des absences -->
      <table v-if="absences.length > 0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Justification</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="absence in absences" :key="absence.id">
            <td>{{ absence.date_absence }}</td>
            <td>{{ absence.type_absence }}</td>
            <td>{{ absence.justification }}</td>
          </tr>
        </tbody>
      </table>
      
      <p v-else>Aucune absence trouvée pour cet employé.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  
  // Variable pour stocker les absences de l'employé
  const absences = ref([])
  
  // Récupérer l'ID de l'employé depuis l'URL
  const route = useRoute()
  const employeId = route.params.id
  
  // Fonction pour charger les absences de l'employé
  const loadAbsences = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employes/${employeId}/absences`)
      absences.value = response.data.data || [] // On stocke les absences dans la variable
    } catch (error) {
      console.error("Erreur lors de la récupération des absences:", error)
    }
  }
  
  // Charger les absences lorsque le composant est monté
  onMounted(loadAbsences)
  </script>
  
  <style scoped>
  .absence-search {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table th, table td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  table th {
    background-color: #f2f2f2;
  }
  </style>
  