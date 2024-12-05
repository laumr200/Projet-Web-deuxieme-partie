<template>
    <div class="role-menu">
      <!-- Menu à gauche avec une image -->
      <div class="menu-role-sidebar" :class="{ open: menuOpen }">
        <div class="menu-header" @click="toggleMenu">
          <h3>Menu Rôles</h3>
        </div>
        <ul v-if="menuOpen">
          <li><RouterLink to="/roles">Liste des Rôles</RouterLink></li>
          <li><RouterLink to="/add-role">Ajouter un Rôle</RouterLink></li>
          <li><RouterLink to="/ajouter-employes">Assigner un Rôle à un Employé</RouterLink></li>
          <li><RouterLink to="/employes/:id/roles">Voir les Rôles d'un Employé</RouterLink></li>
          <li><RouterLink to="/">Retour-Accueil</RouterLink></li>
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
          <h1>Gestion des Rôles</h1>
          <p>
            Bienvenue dans le menu des rôles ! Cette section vous permet de visualiser et de gérer les rôles dans l'entreprise.
            Vous pouvez créer de nouveaux rôles, consulter la liste des rôles existants, et attribuer des rôles aux employés.
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
  
  /* Si le menu est ouvert, on le fait glisser depuis la gauche */
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
    background-color: #2c3e50;
    border-radius: 50%;
    padding: 10px;
  }
  </style>
  