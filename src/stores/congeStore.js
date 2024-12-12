import { defineStore } from 'pinia';

// Définition du store pour la gestion des congés
export const useCongeStore = defineStore('conge', {
  state: () => ({
    conges: [], // Liste des congés
  }),
  actions: {
    // Action pour récupérer les congés depuis le backend
    async fetchConges() {
      console.log("Fetching congés..."); // Journalisation de la récupération des congés
      // Logique pour récupérer les congés depuis le backend
    },

    // Action pour ajouter un congé
    async addConge(conge) {
      console.log("Adding congé:", conge); // Journalisation de l'ajout d'un congé
      // Logique pour ajouter un congé au backend
    },

    // Action pour supprimer un congé par son ID
    async deleteConge(id) {
      console.log("Deleting congé with ID:", id); // Journalisation de la suppression d'un congé
      // Logique pour supprimer un congé depuis le backend
    },
  },
});
