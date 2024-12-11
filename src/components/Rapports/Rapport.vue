<template>
    <div class="rapport-page">
      <h1>Rapports</h1>
  
      <!-- Recherche et filtre -->
      <div class="filter-container">
        <input v-model="searchQuery" type="text" placeholder="Rechercher par titre..." class="search-bar" />
        <input v-model="dateFilter" type="date" class="date-filter" placeholder="Filtrer par date" />
      </div>
  
      <!-- Bouton Ajouter un nouveau rapport -->
      <div class="add-rapport-button">
        <button @click="openAddModal" class="grey-button">Ajouter un nouveau rapport</button>
      </div>
  
      <!-- Cartes pour chaque rapport -->
      <div class="rapport-cards">
        <div v-for="rapport in filteredRapports" :key="rapport.id" class="rapport-card">
          <div class="rapport-header">
            <h3>{{ rapport.title }}</h3>
            <div class="rapport-actions">
              <button @click="editRapport(rapport)" class="action-button">Modifier</button>
              <button @click="deleteRapport(rapport.id)" class="action-button">Supprimer</button>
            </div>
          </div>
          <p class="rapport-content">{{ rapport.content }}</p>
          <p><strong>Créé :</strong> {{ new Date(rapport.createdDate).toLocaleDateString() }}</p>
          <p><strong>Mis à jour :</strong> {{ new Date(rapport.updatedDate).toLocaleDateString() }}</p>
          <div class="rapport-tags">
            <span v-for="tag in rapport.tags" :key="tag" class="rapport-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
  
      <!-- Modal pour ajouter un nouveau rapport -->
      <div v-if="isAddModalOpen" class="modal">
        <div class="modal-content">
          <h2>Ajouter un nouveau rapport</h2>
          <form @submit.prevent="addNewRapport">
            <input v-model="newRapport.title" type="text" placeholder="Titre" required />
            <textarea v-model="newRapport.content" placeholder="Contenu" required></textarea>
            <input v-model="newRapport.createdDate" type="datetime-local" required />
            <input v-model="newRapport.updatedDate" type="datetime-local" required />
            <input v-model="newRapport.tags" type="text" placeholder="Tags (séparés par des virgules)" />
            <button type="submit" class="grey-button">Ajouter un rapport</button>
          </form>
          <button @click="closeAddModal" class="grey-button">Fermer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import useRapport from "@/services/useRapport.js";
  
  export default {
    name: "Rapport",
    data() {
      return {
        rapports: [
          { id: 1, title: "Rapport d'absence de l'employé - John Doe", content: "John Doe était absent pour des raisons personnelles. L'absence a eu lieu du 01/12/2024 au 03/12/2024.", createdDate: new Date(), updatedDate: new Date(), tags: ["Absence", "En attente"] },
          { id: 2, title: "Rapport de retard - Sarah Smith", content: "Sarah Smith est arrivée en retard de 20 minutes le 02/12/2024. Le retard était dû à des problèmes de circulation.", createdDate: new Date(), updatedDate: new Date(), tags: ["Retard", "Terminé"] },
          { id: 3, title: "Rapport de congé maladie - Mark Turner", content: "Mark Turner a signalé une maladie et a été absent du 04/12/2024 au 06/12/2024. Un certificat médical a été soumis.", createdDate: new Date(), updatedDate: new Date(), tags: ["Congé Maladie", "Terminé"] },
          { id: 4, title: "Demande de congé - Emily White", content: "Emily White a demandé 3 jours de congé du 10/12/2024 au 12/12/2024 pour des raisons familiales. Approuvé.", createdDate: new Date(), updatedDate: new Date(), tags: ["Congé", "Approuvé"] },
          { id: 5, title: "Absence injustifiée - Jake Wilson", content: "Jake Wilson a manqué le travail le 07/12/2024 sans préavis. Le service RH va enquêter.", createdDate: new Date(), updatedDate: new Date(), tags: ["Absence", "En attente"] },
        ],
        searchQuery: "",
        dateFilter: "",
        newRapport: {
          title: "",
          content: "",
          createdDate: "",
          updatedDate: "",
          tags: "",
        },
        isAddModalOpen: false,
      };
    },
    computed: {
      filteredRapports() {
        return this.rapports.filter((rapport) => {
          const matchesSearch = rapport.title.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesDate =
            !this.dateFilter ||
            new Date(rapport.createdDate).toLocaleDateString() === new Date(this.dateFilter).toLocaleDateString();
          return matchesSearch && matchesDate;
        });
      },
    },
    methods: {
      openAddModal() {
        this.isAddModalOpen = true;
      },
      closeAddModal() {
        this.isAddModalOpen = false;
      },
      addNewRapport() {
        const newRapport = {
          id: this.rapports.length + 1,
          ...this.newRapport,
          tags: this.newRapport.tags.split(",").map((tag) => tag.trim()),
        };
        this.rapports.push(newRapport);
        this.resetForm();
        this.closeAddModal();
      },
      resetForm() {
        this.newRapport = { title: "", content: "", createdDate: "", updatedDate: "", tags: "" };
      },
      editRapport(rapport) {
        alert(`Modification du rapport : ${rapport.title}`);
      },
      deleteRapport(id) {
        this.rapports = this.rapports.filter((rapport) => rapport.id !== id);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Global Styles */
  .rapport-page {
    padding: 20px;
    font-family: 'Arial', sans-serif;
    color: #333;
    max-width: 1000px;
    margin: auto;
  }
  
  h1 {
    text-align: center;
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 30px;
  }
  
  /* Recherche et filtre */
  .filter-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .search-bar,
  .date-filter {
    padding: 8px 12px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  .search-bar {
    width: 40%;
  }
  
  .date-filter {
    width: 20%;
  }
  
  /* Bouton Ajouter un rapport */
  .add-rapport-button {
    text-align: right;
    margin-bottom: 20px;
  }
  
  .add-rapport-button button {
    background-color: #777;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .add-rapport-button button:hover {
    background-color: #777;
  }
  
  /* Cartes pour les rapports */
  .rapport-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .rapport-card {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .rapport-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  
  .rapport-header h3 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  
  .rapport-actions {
    display: flex;
    gap: 15px;
  }
  
  .action-button {
    padding: 5px 10px;
    background-color: #888;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .action-button:hover {
    background-color: #777;
  }
  
  .rapport-tags {
    margin-top: 10px;
  }
  
  .rapport-tag {
    background-color: #e0e0e0;
    padding: 4px 8px;
    border-radius: 5px;
    margin-right: 5px;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .modal-content form input,
  .modal-content form textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
  }
  
  .modal-content form button {
    background-color: #777;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .modal-content form button:hover {
    background-color: #777;
  }
  
  .grey-button {
    background-color: #777;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .grey-button:hover {
    background-color: #777;
  }
  </style>
  