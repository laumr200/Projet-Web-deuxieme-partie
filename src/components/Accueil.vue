<template>
    <div class="homepage">
      <!-- Menu latéral -->
      <div class="sidebar" :class="{ open: menuOpen }">
        <div class="menu-header" @click="toggleMenu">
          
          <h3>Menu </h3>
        </div> 
        <ul v-if="menuOpen">
          <li><router-link to="/absence-menu"> Absences</router-link></li>
          <li><router-link to="/employe-menu"> Employés</router-link></li>
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
            Simplifiez la gestion des absences et des employés avec notre solution moderne et intuitive.
          </p>
          <router-link to="/signup" class="btn-primary">Commencer maintenant</router-link>
        </div>
        <div class="image-section">
          <img src="@/assets/image1.png" alt="Gestion RH" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
import { RouterLink, RouterView } from 'vue-router'

import { ref, onMounted, onBeforeUnmount } from "vue";
  
  // Contrôle de l'ouverture du menu
  const menuOpen = ref(false);
  const homepage = ref(null);
const sidebar = ref(null);

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };


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
  
  .btn-primary {
    background-color: #ff6600;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .image-section {
    margin-top: 40px;
  }
  
  .image-section img {
    max-width: 100%;
    height: auto;
  }
  </style>
  