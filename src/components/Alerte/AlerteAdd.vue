<template>
    <div class="alerte-page-container">
      <!-- Menu à gauche avec une image en arrière-plan -->
      <div class="menu-alerte-sidebar" :class="{ open: menuOpen }">
        <div class="menu-header" @click="toggleMenu">
          <h3>Menu Alertes</h3>
        </div>
        <ul v-if="menuOpen">
          <li><RouterLink to="/alerteadd">Ajouter une alerte</RouterLink></li>
          <li><RouterLink to="/alertelist">Liste des Alertes</RouterLink></li>
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
        <div class="alerte-add-container">
          <h2>Ajouter une Alerte</h2>
 
          <!-- Formulaire d'ajout d'une alerte -->
          <form @submit.prevent="submitAlerte">
            <div class="form-group">
              <label for="date_alerte">Date de l'alerte :</label>
              <input
                v-model="alerte.date_alerte"
                type="date"
                id="date_alerte"
                required
                aria-required="true"
                aria-label="Date de l'alerte"
              />
            </div>
 
            <div class="form-group">
              <label for="type_alerte">Type d'alerte :</label>
              <input
                v-model="alerte.type_alerte"
                type="text"
                id="type_alerte"
                :placeholder="placeholders.type_alerte"
                required
                aria-required="true"
                aria-label="Type d'alerte"
              />
            </div>
 
            <div class="form-group">
              <label for="justification">Justification :</label>
              <textarea
                v-model="alerte.justification"
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
                :disabled="!alerte.date_absence || !alerte.type_alerte"
              >
                Enregistrer
              </button>
              <button type="button" class="back-button" @click="goBack">
                Retourner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
 
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
 
  const router = useRouter();
 
  // Objet pour stocker les données de l'alerte
  const alerte = ref({
    date_alerte: '',
    type_alerte: '',
    justification: '',
  });
 
  // Messages d'erreur et placeholders dynamiques
  const placeholders = {
    type_alerte: 'Ex: Absence non justifies, Rapport',
    justification: 'Entrez la justification',
  };
 
  // Valider les données côté client
  const validateAlerte = () => {
    if (!alerte.value.date_alerte) {
      alert('La date d\'alerte est obligatoire.');
      return false;
    }
    if (!alerte.value.type_alerte) {
      alert('Le type d\'alerte est obligatoire.');
      return false;
    }
    return true;
  };
 
  // Réinitialiser le formulaire après soumission
  const resetForm = () => {
    alerte.value = {
      date_alerte: '',
      type_alerte: '',
      justification: '',
    };
  };
 
  // Fonction pour soumettre le formulaire
  const submitAlerte = async () => {
    if (!validateAlerte()) return;
 
    const url = import.meta.env.VITE_BASE_URL + "/alertes"; // Assurez-vous que cette variable est correctement configurée.
    try {
      const response = await axios.post(url, {
        date_alerte: alerte.value.date_alerte,
        type_alerte: alerte.value.type_alerte,
        justification: alerte.value.justification || "", // Ajout d'une valeur par défaut si justification est vide.
      });
 
      alert(response.data.message || "Alerte ajoutée avec succès");
      resetForm();
      router.push('/alertes'); // Redirection vers la liste des alertes après le succès.
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'alerte :", error.response?.data || error.message);
      alert(error.response?.data?.message || "Erreur lors de l'ajout de l'alerte.");
    }
  };
 
 
  // Contrôle de l'ouverture du menu
  const menuOpen = ref(false);
 
  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
 
  // Fonction pour revenir à la page précédente
  const goBack = () => {
    router.back();
  };
  </script>
 
  <style scoped>
  /* Arrière-plan global */
  .alerte-page-container {
    background-color:  #f0f8ff;
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
 
  /* Formulaire */
  .alerte-add-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
 
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #00796b;
  }
 
  .form-group {
    margin-bottom: 15px;
  }
 
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
 
  input,
  textarea {
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
  </style>
 
 