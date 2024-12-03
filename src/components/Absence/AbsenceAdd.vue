<template>
    <div class="absence-add-container">
      <h2>Ajouter une Absence</h2>
  
      <!-- Formulaire d'ajout d'une absence -->
      <form @submit.prevent="submitAbsence">
        <div class="form-group">
          <label for="date_absence">Date de l'absence :</label>
          <input
            v-model="absence.date_absence"
            type="date"
            id="date_absence"
            required
            aria-required="true"
            aria-label="Date de l'absence"
          />
        </div>
  
        <div class="form-group">
          <label for="type_absence">Type d'absence :</label>
          <input
            v-model="absence.type_absence"
            type="text"
            id="type_absence"
            :placeholder="placeholders.type_absence"
            required
            aria-required="true"
            aria-label="Type d'absence"
          />
        </div>
  
        <div class="form-group">
          <label for="justification">Justification :</label>
          <textarea
            v-model="absence.justification"
            id="justification"
            :placeholder="placeholders.justification"
            aria-label="Justification"
          ></textarea>
        </div>
  
        <!-- Boutons Enregistrer et Retourner -->
        <div class="button-group">
          <button 
            type="submit" 
            class="save-button"
            :disabled="!absence.date_absence || !absence.type_absence"
          >
            Enregistrer
          </button>
          <button type="button" class="back-button" @click="goBack">Retourner</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  
  // Objet pour stocker les données de l'absence
  const absence = ref({
    date_absence: '',
    type_absence: '',
    justification: '',
  });
  
  // Messages d'erreur et placeholders dynamiques
  const errorMessage = ref('');
  const placeholders = {
    type_absence: 'Ex: Maladie, Congé',
    justification: 'Entrez la justification',
  };
  
  // Valider les données côté client
  const validateAbsence = () => {
    if (!absence.value.date_absence) {
      errorMessage.value = 'La date d\'absence est obligatoire.';
      return false;
    }
    if (!absence.value.type_absence) {
      errorMessage.value = 'Le type d\'absence est obligatoire.';
      return false;
    }
    return true;
  };
  
  // Réinitialiser le formulaire après soumission
  const resetForm = () => {
    absence.value = {
      date_absence: '',
      type_absence: '',
      justification: '',
    };
    errorMessage.value = '';
  };
  
  // Fonction pour soumettre le formulaire
  const submitAbsence = async () => {
    if (!validateAbsence()) return;
  
    try {
      const response = await axios.post('/api/absences', { absences: [absence.value] });
  
      alert(response.data.message || 'Absence ajoutée avec succès');
      resetForm();
      router.push('/absences');
    } catch (error) {
      errorMessage.value = error.response?.data?.message || 'Une erreur est survenue.';
    }
  };
  
  // Fonction pour retourner à la page précédente
  const goBack = () => {
    router.back();
  };
  </script>
  
  <style scoped>
  .absence-add-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #df1e1e;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
  }
  
  .button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .save-button {
    background-color: #28a745;
    color: white;
  }
  
  .back-button {
    background-color: #f44336;
    color: white;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  /* Design responsive */
  @media (max-width: 600px) {
    .absence-add-container {
      padding: 10px;
    }
  
    .button-group {
      flex-direction: column;
      gap: 10px;
    }
  }
  </style>
  