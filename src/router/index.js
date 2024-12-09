import { createRouter, createWebHistory } from 'vue-router';

import RoleList from '../components/Role/RoleList.vue';
import AddRole from '../components/Role/AddRole.vue';
import EmployeList from '../components/Employes/EmployeList.vue';
import AjouterEmploye from '../components/Employes/AjouterEmploye.vue';
import EmployesAbsences from '../components/Employes/EmployesAbsences.vue';
import EmployeAddRole from '../components/Employes/EmployeAddRole.vue';
import EmployeRolesList from '../components/Employes/EmployeRolesList.vue';
import EmployeMenu from '../components/Employes/EmployeMenu.vue';
import AbsenceAdd from '../components/Absence/AbsenceAdd.vue';
import AbsenceList from '../components/Absence/AbsenceList.vue';
import AbsenceMenu from '../components/Absence/AbsenceMenu.vue';
import Accueil from '../components/Accueil.vue';
import Login from '../components/auth/Login.vue';
import RoleMenu from '../components/Role/RoleMenu.vue';

// Import the new components for Auditlog and Rapport
import Auditlog from '../components/Auditlog.vue';
import Rapport from '../components/Rapport.vue';

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
      component: AddRole,
    },
    {
      path: '/employes',
      name: 'employelist',
      component: EmployeList,
    },
    {
      path: '/ajouter-employe',
      name: 'AjouterEmploye',
      component: AjouterEmploye,
    },
    {
      path: '/employes/:id/absences',
      name: 'Absences',
      component: EmployesAbsences,
    },
    {
      path: '/ajouter-role',
      name: 'AjouterRole',
      component: EmployeAddRole,
    },
    {
      path: '/employe/:id/roles',
      name: 'RolesEmploye',
      component: EmployeRolesList,
      props: true,
    },
    {
      path: '/employe-menu',
      name: 'EmployeMenu',
      component: EmployeMenu,
    },
    {
      path: '/add-absence',
      name: 'AddAbsence',
      component: AbsenceAdd,
    },
    {
      path: '/absences',
      name: 'AbsencesList',
      component: AbsenceList,
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

    // Add the new routes for Auditlog and Rapport
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
  ],
});

export default router;
