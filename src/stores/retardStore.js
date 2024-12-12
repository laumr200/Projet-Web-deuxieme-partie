import { defineStore } from 'pinia';

// Définition du store pour la gestion des retards
export const useRetardStore = defineStore('retard', {
  state: () => ({
    retards: [], // Liste des retards
  }),
  actions: {
    // Action pour récupérer les retards depuis le backend
    async fetchRetards() {
      console.log("Fetching retards..."); // Journalisation de la récupération des retards
      // Logique pour récupérer les données des retards depuis le backend
    },

    // Action pour ajouter un retard
    async addRetard(retard) {
      console.log("Adding retard:", retard); // Journalisation de l'ajout d'un retard
      // Logique pour ajouter un retard au backend
    },

    // Action pour supprimer un retard par son ID
    async deleteRetard(id) {
      console.log("Deleting retard with ID:", id); // Journalisation de la suppression d'un retard
      // Logique pour supprimer un retard depuis le backend
    },
  },
});
