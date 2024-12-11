<template>
  <div class="homepage">
    <!-- Menu latéral -->
    <div class="sidebar" :class="{ open: menuOpen }">
      <div class="menu-header" @click="toggleMenu">
        <h3>Menu</h3>
      </div>
      <ul v-if="menuOpen">
        <li><router-link to="/absence-menu">Absences</router-link></li>
        <li><router-link to="/employe-menu">Employés</router-link></li>
        <li><router-link to="/role-menu">Roles</router-link></li>
        <li><router-link to="/auditlog">Journal des événements</router-link></li>
        <li><router-link to="/rapport">Rapports d'Absence et de Retard</router-link></li>
      </ul>
    </div>

    <!-- Contenu principal -->
    <div class="main-content">
      <header class="header">
        <!-- Bouton du menu -->
        <div class="menu-button" @click="toggleMenu">
          <img src="@/assets/menu-icon.png" alt="Menu" class="menu-icon" />
        </div>
        <div class="auth-links">
          <router-link to="/login" class="auth-link">Se connecter</router-link>
          <router-link to="/signup" class="auth-link">Créer un compte</router-link>
        </div>
      </header>

      <div class="hero">
        <h1>Gérez vos employés et absences efficacement</h1>
        <p>
          Simplifiez la gestion des absences et des employés avec notre solution
          moderne et intuitive.
        </p>

        <!-- Bouton pour afficher le modal -->
        <button class="btn-primary" @click="open = true">Commencer maintenant</button>

        <!-- Modal -->
        <div v-if="open" class="modal-overlay">
          <div class="modal-content">
            <p>
              Pour commencer, cliquez sur "Se connecter" si vous avez déjà un compte,
              ou sur "Créer un compte" si vous êtes un nouvel utilisateur.
            </p>
            <button @click="open = false" class="close-button">Fermer</button>
          </div>
        </div>
      </div>

      <div class="image-section">
        <img src="@/assets/image1.png" alt="Gestion RH" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Contrôle de l'ouverture du menu
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Contrôle de l'ouverture du modal
const open = ref(false);
</script>

<style scoped>
/* Structure globale */
.homepage {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f8ff; /* Bleu clair */
}


/* Sidebar */
.sidebar {
  background-color: #333;
  color: white;
  width: 250px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  transform: translateX(-250px);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar ul {
  list-style-type: none;
  padding: 20px;
}

.sidebar li {
  margin: 15px 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Modal content */
.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-content p {
  margin-bottom: 20px;
}

.close-button {
  background-color: #ff4d4f;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #ff0000;
}

/* Bouton principal en orange */
.btn-primary {
  background-color: #ff6600;
  color: white;
  padding: 12px 24px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary:hover {
  background-color: #e65c00;
}

/* Bouton du menu */
.menu-button {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
}

.menu-icon {
  width: 40px;
  height: 40px;
}

/* Contenu principal */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.auth-links {
  display: flex;
  gap: 20px;
}

.auth-link {
  color: #333;
  text-decoration: none;
  font-weight: bold;
}

.hero {
  margin-top: 50px;
}

.hero h1 {
  font-size: 36px;
  font-weight: bold;
}

.hero p {
  font-size: 18px;
  margin: 20px 0;
}

.image-section {
  margin-top: 40px;
}

.image-section img {
  max-width: 100%;
  height: auto;
}
</style>
