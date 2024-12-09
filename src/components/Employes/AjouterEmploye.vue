<template>
    <main>
      <!-- En-tête -->
      <div class="header">
        <h1>Création d'un Employé</h1>
      </div>
  
      <!-- Formulaire de création d'un employé -->
      <v-row>
        <v-col cols="12" md="6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- Nom -->
            <v-text-field
              v-model="newEmploye.nom"
              label="Nom"
              :rules="[rules.required]"
              required
            ></v-text-field>
  
            <!-- Prénom -->
            <v-text-field
              v-model="newEmploye.prenom"
              label="Prénom"
              :rules="[rules.required]"
              required
            ></v-text-field>
  
            <!-- Email -->
            <v-text-field
              v-model="newEmploye.email"
              label="Email"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>
  
            <!-- Téléphone -->
            <v-text-field
              v-model="newEmploye.telephone"
              label="Téléphone"
              :rules="[rules.required]"
              required
            ></v-text-field>
  
            <!-- Adresse -->
            <v-text-field
              v-model="newEmploye.adresse"
              label="Adresse"
              :rules="[rules.required]"
              required
            ></v-text-field>
  
            <!-- Boutons -->
            <v-row class="control-panel">
              <v-btn color="primary" @click="saveEmploye">Créer</v-btn>
              <v-btn color="error" @click="goBack">Annuler</v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </main>
  </template>
  
  <script setup>
  // Importations nécessaires
  import { ref } from 'vue'
  import axios from 'axios'
  
  // Modèle de l'employé à créer
  const newEmploye = ref({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: ''
  })
  
  // Règles de validation du formulaire
  const rules = {
    required: (value) => !!value || 'Ce champ est requis',
    email: (value) => /.+@.+\..+/.test(value) || 'L\'email doit être valide',
  }
  
  // Validation du formulaire
  const valid = ref(false)
  
  // Sauvegarder l'employé
  const saveEmploye = () => {
    if (valid.value) {
      axios
        .post('http://localhost:5000/api/employes', newEmploye.value)
        .then((res) => {
          alert('Employé créé avec succès!')
          // Rediriger vers la page précédente ou liste des employés
          goBack()
        })
        .catch((err) => {
          console.log(err)
          alert('Erreur lors de la création de l\'employé.')
        })
    } else {
      alert('Veuillez remplir tous les champs du formulaire.')
    }
  }
  
  // Retourner à la page précédente
  const goBack = () => {
    window.history.back()
  }
  </script>
  
  <style scoped>
  /* Conteneur principal */
  main {
    background-image: url('C:/Users/laura/OneDrive/Pictures'); /* Remplacer par votre image */
    background-size: cover;
    background-position: center;
    padding: 20px;
    border-radius: 10px;
  }
  
  /* En-tête */
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* Formulaire */
  .v-form {
    max-width: 600px;
    margin: 0 auto;
  }
  
  /* Panneau de contrôle */
  .control-panel {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  
  /* Style des boutons */
  .v-btn {
    width: 48%;
  }
  </style>
  