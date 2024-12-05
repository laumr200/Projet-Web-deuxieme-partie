<template>
  <div class="absence-page-container">
    <!-- Menu à gauche avec une image en arrière-plan -->
    <div class="menu-absence-sidebar" :class="{ open: menuOpen }">
      <div class="menu-header" @click="toggleMenu">
        <h3>Menu Absences</h3>
      </div>
      <ul v-if="menuOpen">
        <li><RouterLink to="/add-absence">Ajouter une absence</RouterLink></li>
        <li><RouterLink to="/absences">Liste des Absences</RouterLink></li>
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

// Objet pour stocker les données de l'absence
const absence = ref({
  date_absence: '',
  type_absence: '',
  justification: '',
});

// Messages d'erreur et placeholders dynamiques
const placeholders = {
  type_absence: 'Ex: Maladie, Congé',
  justification: 'Entrez la justification',
};

// Valider les données côté client
const validateAbsence = () => {
  if (!absence.value.date_absence) {
    alert('La date d\'absence est obligatoire.');
    return false;
  }
  if (!absence.value.type_absence) {
    alert('Le type d\'absence est obligatoire.');
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
    alert(error.response?.data?.message || 'Absence non enregistrée.');
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
.absence-page-container {
  background-color:  #f0f8ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

/* Menu à gauche */
.menu-absence-sidebar {
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

.menu-absence-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.menu-absence-sidebar li {
  margin: 15px 0;
}

.menu-absence-sidebar a {
  color: white;
  text-decoration: none;
}

.menu-absence-sidebar .menu-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-absence-sidebar {
  transform: translateX(-250px);
}

.menu-absence-sidebar.open {
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
.absence-add-container {
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
