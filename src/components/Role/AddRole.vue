<template>
  <div class="role-menu">
    <!-- Menu à gauche -->
    <div class="menu-role-sidebar" :class="{ open: menuOpen }">
      <div class="menu-header" @click="toggleMenu">
        <h3>Menu Rôles</h3>
      </div>
      <ul v-if="menuOpen">
        <li><RouterLink to="/roles">Liste des Rôles</RouterLink></li>
        <li><RouterLink to="/add-role">Ajouter un Rôle</RouterLink></li>
        <li><RouterLink to="/ajouter-employes">Assigner un Rôle à un Employé</RouterLink></li>
        <li><RouterLink to="/employes/:id/roles">Voir les Rôles d'un Employé</RouterLink></li>
        <li><a @click.prevent="goBack" href="#">⬅ Retour</a></li>
      </ul>
    </div>

    <!-- Contenu principal -->
    <div class="main-content">
      <header class="header">
        <div class="menu-button" @click="toggleMenu">
          <img src="@/assets/menu-icon.png" alt="Menu" class="menu-icon" />
        </div>
      </header>

      <main class="add-role">
        <h2>Ajouter un Rôle</h2>
        <form @submit.prevent="addRole" class="form">
          <div class="form-group">
            <label for="role-name">Nom du Rôle :</label>
            <input
              type="text"
              id="role-name"
              v-model="roleName"
              placeholder="Entrez le nom du rôle"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
        <div v-if="successMessage" class="success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { RouterLink } from "vue-router";

export default {
  components: { RouterLink },
  setup() {
    const roleName = ref("");
    const successMessage = ref(null);
    const errorMessage = ref(null);
    const menuOpen = ref(false);

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const goBack = () => {
      window.history.back();
    };

    const addRole = async () => {
      successMessage.value = null;
      errorMessage.value = null;
      try {
        const response = await axios.post("http://localhost:5000/api/roles", {
          nom_role: roleName.value,
        });
        successMessage.value = `Rôle "${response.data.data.nom_role}" ajouté avec succès.`;
        roleName.value = "";
      } catch (error) {
        errorMessage.value = "Erreur lors de l'ajout du rôle.";
        console.error(error);
      }
    };

    return {
      roleName,
      successMessage,
      errorMessage,
      menuOpen,
      toggleMenu,
      goBack,
      addRole,
    };
  },
};
</script>

<style scoped>
/* Structure globale */
.role-menu {
  display: flex;
  height: 100vh;
  background-color: #f0f8ff; /* Bleu clair */
}

/* Sidebar (menu latéral) */
.menu-role-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #2c3e50; /* Bleu foncé */
  color: white;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.menu-role-sidebar ul {
  list-style-type: none;
  padding: 0;
}

.menu-role-sidebar li {
  margin: 15px 0;
}

.menu-role-sidebar a {
  color: white;
  text-decoration: none;
}

.menu-role-sidebar .menu-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-role-sidebar {
  transform: translateX(-250px);
}

.menu-role-sidebar.open {
  transform: translateX(0);
}

/* Contenu principal */
.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* Ajustement pour laisser la place au menu */
}

.header .menu-button {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
}

.menu-icon {
  width: 40px;
  height: 40px;
  background-color: #2c3e50;
  border-radius: 50%;
  padding: 10px;
}

/* Formulaire */
.add-role {
  max-width: 600px;
  margin: auto;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

button {
  padding: 10px 15px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.success {
  font-size: 16px;
  color: green;
  margin-top: 10px;
}

.error {
  font-size: 16px;
  color: red;
  margin-top: 10px;
}
</style>
