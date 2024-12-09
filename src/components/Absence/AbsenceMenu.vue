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
          <h1>Gestion des Absences</h1>
          <p>
            Bienvenue dans le menu des absences ! Cette section vous permet de visualiser et de gérer les absences
            des employés. Vous pouvez ajouter de nouvelles absences, consulter les listes d'absences existantes,
            générer des statistiques, ou encore explorer les différents types d'absences disponibles.
          </p>
          <button  class="btn-primary" @click="show = !show">Procédures reliées à la prise d’absence spécifique</button>
           <Transition>
             <p v-if="show">Pour la définition, la durée et le nombre, les employés doivent se référer à leur convention collective ou leur contrat de travail.
Vacances, reprise de temps
La demande doit être faite avant la prise du congé en utilisant le formulaire.
Un congé refusé ne peut pas être pris sous une autre forme ou en invoquant une autre raison. Ce type d’attitude sera sanctionné.
Jours fériés
Les congés sont pris en fonction du calendrier scolaire.
Aucune autorisation n’est requise.
Congés sociaux
La demande doit être faite, si possible, avant la prise du congé en utilisant le formulaire (à produire par votre établissement) et les pièces justificatives doivent être jointes.
Formation
La demande doit être faite avant l’inscription en utilisant le formulaire.
Activités syndicales
La demande doit être faite avant l’inscription, l’absence ou la participation à un comité en utilisant le formulaire.
 
Congés maladie et affaires personnelles
Pour les congés personnels, la demande doit être faite quarante-huit heures avant le départ, en utilisant le formulaire.
Dans un cas d’urgence, le supérieur immédiat doit être joint par téléphone afin de prévenir de l’absence. L’employé régularisera la situation à son retour.
Soyez avisé que les congés maladie constituent une assurance et non un droit. L’employé doit les utiliser seulement lorsque des problèmes de santé l’empêchent de se présenter au travail.
Pour les cas de maladie, un certificat médical doit être produit pour les absences de trois jours consécutifs et plus et dans tous les cas où l’employeur le demande spécifiquement. Un certificat médical, pour être valide, doit comporter un diagnostic et une date de retour ou de la prochaine consultation (pronostic).  Une absence pour laquelle le certificat médical ne sera pas complet sera jugée non justifiée.
Invalidité
Pour les cas d’invalidité, un certificat médical doit être produit.
Un certificat médical pour être valide doit comporter un diagnostic et une date de retour ou de la prochaine consultation (pronostic).  Une absence pour laquelle le certificat médical ne sera pas complet sera jugée non justifiée.
L’employé est tenu de prendre contact régulièrement avec son supérieur, ou les ressources humaines, afin de déterminer son état de santé, c'est-à-dire savoir si son remplacement doit se poursuivre et approximativement pour combien de temps.
Il est tenu de participer à toutes les mesures visant son retour au travail dans les meilleurs délais. Il est également encouragé à consulter le « Guide de l’employé en cas d’invalidité » de la FEEP par le biais du portail SARAF en cliquant ici -- > Guide.
Accident du travail
Dans le cas où l’employé doit quitter l’établissement, il est préférable, si possible, de remplir le formulaire de déclaration d’accident avant son départ. Faire parvenir le formulaire de la CNESST rempli par son médecin par la suite.
Un certificat médical pour être valide doit comporter un diagnostic et une date de retour ou de la prochaine consultation (pronostic). Une absence pour laquelle le certificat médical ne sera pas complet sera jugée non justifiée.
L’employé est tenu de prendre contact régulièrement avec son supérieur immédiat afin de déterminer son état de santé, c'est-à-dire savoir si son remplacement doit se poursuivre et approximativement pour combien de temps.
Il est tenu de participer à toutes les mesures visant son retour au travail dans les meilleurs délais.
L’employé est tenu de participer activement aux mesures d’assignation temporaire.
 
Congés parentaux
Pour avoir droit au congé parental (maternité, paternité, adoption) l’employé doit produire les documents médicaux ou juridiques appropriés et les produire dans le délai déterminé au contrat de travail.
Congés pour obligations familiales
Ce congé prévu par la Loi sur les normes du travail comporte des conditions d’utilisation.  D’une part, l’employé doit aviser son supérieur le plus tôt possible et il doit prendre tous les moyens à sa disposition afin de limiter la prise et la durée du congé.
Retards
Tout employé qui se présente au travail en retard doit obligatoirement se rendre au bureau de son supérieur immédiat à son arrivée pour expliquer son retard.  Le motif « raison personnelle » n’est pas acceptable.
Tempête
Absence découlant de la décision d’une autorité compétente (Sûreté du Québec, Sûreté municipale, Protection civile, ministère des Transports).
L’employé doit en informer son supérieur le plus rapidement possible.
Retrait préventif
Le retrait préventif ne vise pas à donner un congé à la travailleuse enceinte, mais à éliminer les dangers présents dans son environnement de travail afin de lui permettre de rester au travail. La salariée doit donc collaborer avec l’employeur à l’élimination de ces dangers et être présente au travail.
Si les dangers ne peuvent pas être éliminés, que les méthodes de travail ne peuvent pas être adaptées et qu’aucun autre travail ne peut être assigné, seulement à ce moment, la salariée pourra demeurer chez elle.
Rendez-vous médicaux
Les rendez-vous médicaux ne sont pas des congés maladie. Ils doivent se prendre à l’extérieur de vos heures de travail. Exceptionnellement, un congé maladie ou un congé pour raison familiale pourra être utilisé pour ce type d’absence, mais seulement après autorisation.
 
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
  