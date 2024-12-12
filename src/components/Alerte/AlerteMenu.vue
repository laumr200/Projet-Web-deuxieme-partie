<template>
    <div class="alerte-menu">
      <!-- Menu à gauche avec une image en arrière-plan -->
      <div class="menu-alerte-sidebar" :class="{ open: menuOpen }">
        <div class="menu-header" @click="toggleMenu">
          <h3>Menu Alertes</h3>
        </div>
        <ul v-if="menuOpen">
          <li><RouterLink to="/alerteadd">Ajouter une alerte</RouterLink></li>
          <li><RouterLink to="/alerteliste">Liste des Alertes</RouterLink></li>
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
          <h1>Gestion des Alertes</h1>
          <p>
            Bienvenue dans le menu des alertes ! Cette section vous permet de visualiser les alertes
            envoyées aux employés. Le système enverra des notifications automatiques par email en cas
            d'absences non justifiées ou pour rappeler aux managers que certaines demandes de congé
            nécessitent leur attention. Les employés recevront également des alertes concernant l'état
            de leurs demandes de congé (approuvées, rejetées, ou en attente).
          </p>
          <button  class="btn-primary" @click="show = !show">Procédures reliées aux alertes</button>
           <Transition>
             <p v-if="show">Pour assurer une gestion efficace des absences et des retards, notre système envoie des alertes automatiques aux employés concernés. Ces alertes servent à :
 
Informer en temps réel : Les employés reçoivent des notifications instantanées par email ou SMS dès qu'une absence ou un retard est enregistré.
Rappeler les politiques de l'entreprise : Chaque alerte inclut un rappel des politiques de l'entreprise concernant les absences et les retards, afin de maintenir une communication claire et cohérente.
Encourager la ponctualité : En recevant des alertes, les employés sont encouragés à respecter les horaires de travail et à minimiser les retards.
Faciliter le suivi : Les alertes permettent aux employés de suivre leurs propres absences et retards, contribuant ainsi à une meilleure gestion personnelle du temps.
Notre objectif est de promouvoir une culture de ponctualité et de responsabilité au sein de l'entreprise, tout en offrant un outil pratique pour le suivi des présences. 
     </p>
            </Transition>
        </div>
      </div>
  </div>
  </template>
 
  <script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  import { useRouter } from 'vue-router';
 
 
 
  // Contrôle de l'ouverture du menu
  const menuOpen = ref(false)
 
  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
 
  const show = ref(false)
 
  </script>
 
  <style scoped>
  /* Structure globale */
  .alerte-menu {
    display: flex;
    height: 100vh;
    background-color: #f0f8ff; /* Bleu clair, comme sur la page d'accueil */
  }
 
  /* Sidebar (menu latéral) */
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
 
  .menu-image {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
 
  /* Si le menu est ouvert, on le fait glisser depuis la gauche */
  .menu-alerte-sidebar {
    transform: translateX(-250px);
  }
 
  .menu-alerte-sidebar.open {
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
 
  .btn-primary {
  background-color: #ff6600;
  color: white;
  padding: 12px 24px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
  </style>
 
 