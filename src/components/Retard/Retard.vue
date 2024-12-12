<template>
  <div class="page-container">
    <div class="form-container">
      <h1><i class="fas fa-clock"></i> Gestion des Retards</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="employee"><i class="fas fa-user"></i> Nom Employé:</label>
          <input
            v-model="newRetard.employee"
            type="text"
            id="employee"
            placeholder="Entrez le nom de l'employé"
            required
          />
        </div>
        <div class="form-group">
          <label for="reason"><i class="fas fa-comment-alt"></i> Raison:</label>
          <textarea
            v-model="newRetard.reason"
            id="reason"
            placeholder="Entrez la raison du retard"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="date"><i class="fas fa-calendar-alt"></i> Date:</label>
          <input
            v-model="newRetard.date"
            type="date"
            id="date"
            required
          />
        </div>
        <button type="submit" class="btn-primary"><i class="fas fa-plus"></i> Ajouter Retard</button>
      </form>
    </div>

    <div class="list-container">
      <h2><i class="fas fa-list"></i> Liste des Retards</h2>
      <ul>
        <li v-for="retard in retards" :key="retard.id" class="list-item">
          <div class="retard-info">
            <strong>Employé:</strong> {{ retard.employee }} <br />
            <strong>Raison:</strong> {{ retard.reason }} <br />
            <strong>Date:</strong> {{ retard.date }}
          </div>
          <button @click="deleteRetard(retard.id)" class="btn-danger">
            <i class="fas fa-trash"></i> Supprimer
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRetardStore } from "@/stores/retardStore";

export default {
  setup() {
    const retardStore = useRetardStore();
    const newRetard = ref({
      employee: "",
      reason: "",
      date: "",
    });

    const handleSubmit = () => {
      retardStore.addRetard(newRetard.value);
      newRetard.value = { employee: "", reason: "", date: "" };
    };

    const deleteRetard = (id) => {
      retardStore.deleteRetard(id);
    };

    return {
      retards: retardStore.retards,
      newRetard,
      handleSubmit,
      deleteRetard,
    };
  },
};
</script>

<style scoped>
/* Estilo Global */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: "Roboto", sans-serif;
  background: linear-gradient(135deg, #4c73c2, #61dafb);
  overflow: hidden;
}


.page-container {
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  padding: 20px;
  color: #fff;
}

.form-container {
  background: #fff;
  color: #333;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #4c73c2;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #4c73c2;
}

textarea {
  resize: none;
}

button {
  background: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #43a047;
}

.btn-danger {
  background: #e53935;
  margin-top: 10px;
}

.btn-danger:hover {
  background: #d32f2f;
}

.list-container {
  background: #fff;
  color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

</style>
