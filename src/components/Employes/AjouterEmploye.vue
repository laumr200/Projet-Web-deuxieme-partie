<template>
  <div class="employe-page-container">
    <!-- Menu à gauche avec une image en arrière-plan -->
    <div class="menu-employe-sidebar" :class="{ open: menuOpen }">
      <div class="menu-header" @click="toggleMenu">
        <h3>Menu Absences</h3>
      </div>
      <ul v-if="menuOpen">
        <li><RouterLink to="/employes">Liste des Employés</RouterLink></li>
          <li><RouterLink to="/ajouter-employe">Ajouter un Employé</RouterLink></li>
          <li><RouterLink :to="`/employes/${employeId}/absences`">Voir les absences de l'employé</RouterLink></li>
          <li><RouterLink to="/ajouter-role">Ajouter un rôle à un employé</RouterLink></li>
          <li><RouterLink to="/employe/:id/roles">Rôles d'un Employé</RouterLink></li>
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
      <div class="employee-add-container">
        <h2>Ajouter un Employé</h2>

        <!-- Formulaire d'ajout d'un employé -->
        <form @submit.prevent="submitEmploye">
          <div class="form-group">
            <label for="nom">Nom de l'employé :</label>
            <input
              v-model="employe.nom"
              type="text"
              id="nom"
              placeholder="Entrez le nom"
              required
              aria-required="true"
              aria-label="Nom de l'employé"
            />
          </div>

          <div class="form-group">
            <label for="prenom">Prénom de l'employé :</label>
            <input
              v-model="employe.prenom"
              type="text"
              id="prenom"
              placeholder="Entrez le prénom"
              required
              aria-required="true"
              aria-label="Prénom de l'employé"
            />
          </div>

          <div class="form-group">
            <label for="email">Email de l'employé :</label>
            <input
              v-model="employe.email"
              type="email"
              id="email"
              placeholder="Entrez l'email"
              required
              aria-required="true"
              aria-label="Email de l'employé"
            />
          </div>

          <div class="form-group">
            <label for="telephone">Téléphone :</label>
            <input
              v-model="employe.telephone"
              type="tel"
              id="telephone"
              placeholder="Entrez le numéro de téléphone"
              required
              aria-required="true"
              aria-label="Numéro de téléphone"
            />
          </div>

          <div class="form-group">
            <label for="adresse">Adresse :</label>
            <input
              v-model="employe.adresse"
              type="text"
              id="adresse"
              placeholder="Entrez l'adresse"
              required
              aria-required="true"
              aria-label="Adresse de l'employé"
            />
          </div>

          <div class="form-group">
            <label for="date_d_embauche">Date d'embauche :</label>
            <input
              v-model="employe.date_d_embauche"
              type="date"
              id="date_d_embauche"
              required
              aria-required="true"
              aria-label="Date d'embauche"
            />
          </div>

          <div class="form-group">
            <label for="mot_de_passe">Mot de passe :</label>
            <input
              v-model="employe.mot_de_passe"
              type="password"
              id="mot_de_passe"
              placeholder="Entrez un mot de passe"
              required
              aria-required="true"
              aria-label="Mot de passe"
            />
          </div>

          <div class="button-group">
            <button
              type="submit"
              class="save-button"
              :disabled="!isFormValid()"
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
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter(); 


const employe = ref({
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  adresse: '',
  date_d_embauche: '',
  mot_de_passe: ''
});

const validateEmploye = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  const nameRegex =/^[a-zA-Z]{4,}$/ // /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/

  if (!nameRegex.test(employe.value.name)) {
    alert("Veuillez entrer un nom valide.");
    return false;
  }
  if (!nameRegex.test(employe.value.prenom)) {
    alert("Veuillez entrer un prenom valide.");
    return false;
  }
  if (!emailRegex.test(employe.value.email)) {
    alert("Veuillez entrer un email valide.");
    return false;
  }
  if (!phoneRegex.test(employe.value.telephone)) {
    alert("Veuillez entrer un numéro de téléphone valide (10 chiffres).");
    return false;
  }
  if (!mdpRegex.test(employe.value.mot_de_passe)) {
    alert("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
    return false;
  }
  return true;
};

const isFormValid = () => {
  return (
    employe.value.nom &&
    employe.value.prenom &&
    employe.value.email &&
    employe.value.telephone &&
    employe.value.adresse &&
    employe.value.date_d_embauche &&
    employe.value.mot_de_passe
  );
};

// Réinitialiser le formulaire après soumission
const resetForm = () => {
  employe.value = {
    nom : '',
    prenom :'',
    email: '',
    telephone :'',
    adresse:'',
    date_d_embauche :'',
    mot_de_passe:'',
  };
};

const submitEmploye = async () => {
  if (!validateEmploye()) return;
   
  try {
    const response = await axios.post('http://localhost:5000/api/employes', [employe.value]);
    alert("Employé ajouté avec succès !");
    resetForm();
    Object.keys(employe.value).forEach((key) => (employe.value[key] = ''));
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Erreur lors de l'ajout de l'employé.");
  }
};

const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const goBack = () => {
  router.back();
};
</script>


<style scoped>
.employee-add-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  display: block;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.save-button, .back-button {
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.save-button:disabled {
  background-color: #ccc;
}

.back-button {
  background-color: #f44336;
  color: white;
}


/* Menu à gauche */
.menu-employe-sidebar {
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

.menu-employe-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.menu-employe-sidebar li {
  margin: 15px 0;
}

.menu-employe-sidebar a {
  color: white;
  text-decoration: none;
}

.menu-employe-sidebar .menu-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-employe-sidebar {
  transform: translateX(-250px);
}

.menu-employe-sidebar.open {
  transform: translateX(0);
}

/* Arrière-plan global */
.employe-page-container {
  background-color:  #f0f8ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, sans-serif;
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
    width: 40px;
    height: 40px;
    /* Add a background color for better visibility */
    background-color: #333;
    border-radius: 50%;
    padding: 10px;
  }
/* Formulaire */
.employe-add-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

</style>
