<template>
    <div class="absence-menu">
      <!-- Menu à gauche avec une image en arrière-plan -->
      <div class="menu-absence-sidebar" :class="{ open: menuOpen }">
        <div class="menu-header" @click="toggleMenu">
          <h3>Menu Absences</h3>
        </div>
        <ul v-if="menuOpen">
          <li><RouterLink to="/add-absence">Ajouter une absence</RouterLink></li>
          <li><RouterLink to="/absences">Liste des Absences</RouterLink></li>
        </ul>
      </div>
  
      <!-- Contenu principal -->
      <div class="main-content">
        <header class="header">
          <div class="menu-button" @click="toggleMenu">
            <img src="@/assets/menu-icon.png" alt="Menu" class="menu-icon" />
          </div>
        </header>
  
        <div class="contenu">
          <h1>Gestion des Absences</h1>
          <p>
            Bienvenue dans le menu des absences ! Cette section vous permet de visualiser et de gérer les absences
            des employés. Vous pouvez ajouter de nouvelles absences, consulter les listes d'absences existantes,
            générer des statistiques, ou encore explorer les différents types d'absences disponibles.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  
  // Contrôle de l'ouverture du menu
  const menuOpen = ref(false)
  
  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
  </script>
  
  <style scoped>
  /* Structure globale */
  .absence-menu {
    display: flex;
    height: 100vh;
    background-color: #f0f8ff; /* Bleu clair, comme sur la page d'accueil */
  }
  
  /* Sidebar (menu latéral) */
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
  
  .menu-adsence-sidebar ul {
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
  
  .menu-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  
  /* Si le menu est ouvert, on le fait glisser depuis la gauche */
  .menu-absence-sidebar {
    transform: translateX(-250px);
  }
  
  .menu-absence-sidebar.open {
    transform: translateX(0);
  }
  
  /* Contenu principal */
  .main-content {
    flex: 1;
    padding: 20px;
    margin-left: 250px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .contenu p {
    font-size: 16px;
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
    /* Add a background color for better visibility */
    background-color: #333;
    border-radius: 50%;
    padding: 10px;
  }
  </style>
  