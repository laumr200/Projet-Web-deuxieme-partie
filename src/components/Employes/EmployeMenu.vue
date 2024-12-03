
<template>
    <div class="employe-menu">
      <!-- Menu à gauche avec une image -->
      <div class="menu-employe-sidebar" :class="{ open: menuOpen }">
        <div class="menu-header" @click="toggleMenu">
          
          <h3>Menu Employés</h3>
        </div>
        <ul v-if="menuOpen">
          <li><RouterLink to="/employes">Liste des Employés</RouterLink></li>
          <li><RouterLink to="/ajouter-employe">Ajouter un Employé</RouterLink></li>
          <li><RouterLink :to="`/employes/${employeId}/absences`">Voir les absences de l'employé</RouterLink></li>
          <li><RouterLink to="/ajouter-role">Ajouter un rôle à un employé</RouterLink></li>
          <li><RouterLink to="/employe/:id/roles">Rôles d'un Employé</RouterLink></li>
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
          <h1>Informations Employés</h1>
          <p>
            Bienvenue dans le menu des employés ! Cette section vous permet de visualiser et gérer toutes les informations relatives aux employés de l'entreprise. Vous y trouverez des détails essentiels tels que leurs rôles, leurs absences, ainsi que d'autres informations importantes pour une gestion efficace.
            Vous pouvez également ajouter, modifier ou supprimer des employés, et affecter des rôles spécifiques à chaque individu en fonction de leurs responsabilités.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  
  // Variable pour contrôler l'ouverture et la fermeture du menu latéral
  const menuOpen = ref(false)
  
  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
  </script>
  
  <style scoped>
  /* Structure globale */
  .employe-menu {
    display: flex;
    height: 100vh;
    background-color: #f0f8ff; /* Bleu clair, comme sur la page d'accueil */
  }
  
  /* Sidebar (menu latéral) */
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
  
  .menu-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  
  /* Si le menu est ouvert, on le fait glisser depuis la gauche */
  .menu-employe-sidebar {
    transform: translateX(-250px);
  }
  
  .menu-employe-sidebar.open {
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
  