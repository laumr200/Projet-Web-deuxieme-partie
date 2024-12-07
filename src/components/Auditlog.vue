<template>
    <div class="audit-log">
      <h1>Journal des événements</h1>
  
      <!-- Formulaire d'ajout de nouveau log -->
      <div class="new-log-form">
        <h2>Ajouter un nouveau log</h2>
        <form @submit.prevent="addNewLog">
          <input v-model="newLog.action" type="text" placeholder="Action" required />
          <input v-model="newLog.user" type="text" placeholder="Utilisateur" required />
          <input v-model="newLog.date" type="datetime-local" required />
          <textarea v-model="newLog.description" placeholder="Description" required></textarea>
          <button type="submit">Ajouter un log</button>
        </form>
      </div>
  
      <div class="table-container">
        <!-- Tableau des logs -->
        <table>
          <thead>
            <tr>
              <th @click="sortTable('action')">Action</th>
              <th @click="sortTable('user')">Utilisateur</th>
              <th @click="sortTable('date')">Date</th>
              <th @click="sortTable('description')">Description</th>
              <th>Actions</th> <!-- Colonne pour le bouton de suppression -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in paginatedLogs" :key="log.id">
              <td>{{ log.action }}</td>
              <td>{{ log.user }}</td>
              <td>{{ new Date(log.date).toLocaleString() }}</td>
              <td>{{ log.description }}</td>
              <td>
                <button @click="deleteLog(log.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <!-- Contrôles de pagination -->
        <div class="pagination">
          <button @click="previousPage" :disabled="currentPage === 1">Précédent</button>
          <span>Page {{ currentPage }} sur {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import useAudit from "@/services/useAudit.js";
  
  export default {
    name: "Auditlog",
    data() {
      return {
        auditLogs: [
          { id: 1, action: "Connexion", user: "Admin", date: new Date(), description: "Admin s'est connecté" },
          { id: 2, action: "Création de rapport", user: "John Doe", date: new Date(), description: "Création d'un nouveau rapport d'absence" },
          { id: 3, action: "Mise à jour du rôle", user: "Jane Smith", date: new Date(), description: "Mise à jour du rôle de l'employé" },
        ],
        newLog: {
          action: "",
          user: "",
          date: "",
          description: "",
        },
        currentPage: 1,
        logsPerPage: 5,
        sortKey: '',
        sortDirection: 'asc',
      };
    },
    computed: {
      paginatedLogs() {
        const start = (this.currentPage - 1) * this.logsPerPage;
        const end = start + this.logsPerPage;
        return this.sortedLogs.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.sortedLogs.length / this.logsPerPage);
      },
      sortedLogs() {
        return this.auditLogs.sort((a, b) => {
          if (this.sortKey === '') return 0;
          const valueA = a[this.sortKey];
          const valueB = b[this.sortKey];
          if (this.sortDirection === 'asc') {
            return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
          } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
          }
        });
      },
    },
    methods: {
      sortTable(key) {
        if (this.sortKey === key) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortKey = key;
          this.sortDirection = 'asc';
        }
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      addNewLog() {
        if (this.newLog.action && this.newLog.user && this.newLog.date && this.newLog.description) {
          const newLog = {
            id: this.auditLogs.length + 1,
            ...this.newLog,
          };
          this.auditLogs.push(newLog);
          this.resetForm();
        }
      },
      resetForm() {
        this.newLog = { action: "", user: "", date: "", description: "" };
      },
      deleteLog(id) {
        this.auditLogs = this.auditLogs.filter(log => log.id !== id);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Global Styles */
  .audit-log {
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
  
  /* Form Styling */
  .new-log-form {
    margin-bottom: 30px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .new-log-form h2 {
    margin-bottom: 15px;
    color: #333;
  }
  
  .new-log-form input,
  .new-log-form textarea {
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
    background-color: #fff; /* White background for inputs */
    color: #333; /* Text color in black */
  }
  
  /* Button Styling */
  .new-log-form button {
    background-color: #888; /* Grey color */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
  }
  
  .new-log-form button:hover {
    background-color: #777; /* Darker grey on hover */
  }
  
  /* Table Styling */
  .table-container {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  th, td {
    padding: 15px;
    text-align: left;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #888; /* Grey color for table header */
    color: white;
    cursor: pointer;
    user-select: none;
  }
  
  td {
    background-color: #f9f9f9;
  }
  
  td:hover {
    background-color: #f1f1f1;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .pagination button {
    background-color: #888; /* Grey color */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 0 10px;
  }
  
  .pagination button:disabled {
    background-color: #ccc; /* Light grey for disabled button */
  }
  
  .pagination span {
    font-size: 16px;
    margin: 0 10px;
  }
  
  /* Delete button style */
  table button {
    background-color: #f44336; /* Red color */
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  table button:hover {
    background-color: #e53935; /* Darker red on hover */
  }
  </style>
  