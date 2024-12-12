import { createRouter, createWebHistory } from 'vue-router'

import RoleList from '../components/Role/RoleList.vue'
import AddRole from '../components/Role/AddRole.vue'
import EmployeList from '../components/Employes/EmployeList.vue'
import AjouterEmploye from '../components/Employes/AjouterEmploye.vue'
import EmployesAbsences from '../components/Employes/EmployesAbsences.vue'
import EmployeAddRole from '../components/Employes/EmployeAddRole.vue'
import EmployeRolesList from '../components/Employes/EmployeRolesList.vue'
import EmployeMenu from '../components/Employes/EmployeMenu.vue'
import AbsenceAdd from '../components/Absence/AbsenceAdd.vue'
import AbsenceList from '../components/Absence/AbsenceList.vue'
import AbsenceMenu from '../components/Absence/AbsenceMenu.vue'
import Accueil from '../components/Accueil.vue'
import Login from '../components/auth/Login.vue'
import RoleMenu from '../components/Role/RoleMenu.vue'
import Auditlog from '../components/Rapports/Auditlog.vue'
import Rapport from '../components/Rapports/Rapport.vue'
import AlerteAdd from '../components/Alerte/AlerteAdd.vue'
import AlerteList from '../components/Alerte/AlerteList.vue'
import AlerteMenu from '../components/Alerte/AlerteMenu.vue'
import Conge from '../components/conge/Conge.vue';
import Retard from '../components/Retard/Retard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil,
    },
    {
      path: '/add-role',
      name: 'add-role',
     component:AddRole
      
    },
    {
      path: '/employes',
      name: 'employelist',
      component: EmployeList, // Nouvelle route pour la liste des utilisateurs
    },
    {
      path: '/ajouter-employe',
      name: 'AjouterEmploye',
      component: AjouterEmploye  // Nouvelle page d'ajout d'employé
    },
    {
      path: '/employes/:id/absences',
      name: 'Absences',
      component: EmployesAbsences,
    },{
      path: '/ajouter-role',
      name: 'AjouterRole',
      component: EmployeAddRole,
    },
    {
      path: '/employe/:id/roles',
      name: 'RolesEmploye',
      component: EmployeRolesList, // Page pour afficher les rôles de l'employé
      props: true, // Passer l'ID de l'employé comme prop
    },
    {
      path: '/employe-menu',  // La route vers votre EmployeMenu.vue
      name: 'EmployeMenu',
      component: EmployeMenu,
    },
    {
      path: '/add-absence', // Chemin pour accéder à la vue
      name: 'AddAbsence',
      component: AbsenceAdd,
    },
    {
      path: '/absences', // URL de la page
      name: 'AbsencesList',
      component: AbsenceList, // Composant lié
    },
    {
      path: '/absence-menu',
      name: 'AbsenceMenu',
      component: AbsenceMenu,
    },
    {
      path: '/login',
      name: 'se connecter',
      component: Login,
    },
    {
      path: '/add-role',
      name: 'add role',
      component: AddRole,
    },
    {
      path: '/roles',
      name: 'ROLE LISTE',
      component: RoleList,
    },
    {
      path: '/role-menu',
      name: 'RoleMenu',
      component: RoleMenu,
    },
    {
      path: '/auditlog',
      name: 'Auditlog',
      component: Auditlog,
    },
    {
      path: '/rapport',
      name: 'Rapport',
      component: Rapport,
    },
    {
      path: '/alerte-menu',
      name: 'AlerteMenu',
      component: AlerteMenu,
    },
    {
      path: '/alerteadd',
      name: 'AlerteAjouter',
      component: AlerteAdd,
    },
    {
      path: '/alertelist',
      name: 'AlerteList',
      component: AlerteList,
    },
    {
      path: '/conge',
      name: 'Conge',
      component: Conge,
    },
    {
      path: '/retard',
      name: 'Retard',
      component: Retard,
    },
  ],
})

export default router
