<template>
  <div class="page-container">
    <div class="form-container">
      <h1><i class="fas fa-calendar"></i> Gestion des Congés</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="employee"><i class="fas fa-user"></i> Nom Employé:</label>
          <input
            v-model="newConge.employee"
            type="text"
            id="employee"
            placeholder="Entrez le nom de l'employé"
            required
          />
        </div>
        <div class="form-group">
          <label for="start-date"><i class="fas fa-calendar-alt"></i> Date de début:</label>
          <input
            v-model="newConge.startDate"
            type="date"
            id="start-date"
            required
          />
        </div>
        <div class="form-group">
          <label for="end-date"><i class="fas fa-calendar-check"></i> Date de fin:</label>
          <input
            v-model="newConge.endDate"
            type="date"
            id="end-date"
            required
          />
        </div>
        <button type="submit" class="btn-primary"><i class="fas fa-plus"></i> Ajouter Congé</button>
      </form>
    </div>

    <div class="list-container">
      <h2><i class="fas fa-list"></i> Liste des Congés</h2>
      <ul>
        <li v-for="conge in conges" :key="conge.id" class="list-item">
          <div class="conge-info">
            <strong>Employé:</strong> {{ conge.employee }} <br />
            <strong>Début:</strong> {{ conge.startDate }} <br />
            <strong>Fin:</strong> {{ conge.endDate }}
          </div>
          <button @click="deleteConge(conge.id)" class="btn-danger">
            <i class="fas fa-trash"></i> Supprimer
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCongeStore } from "@/stores/congeStore";

export default {
  setup() {
    const congeStore = useCongeStore();
    const newConge = ref({
      employee: "",
      startDate: "",
      endDate: "",
    });

    const handleSubmit = () => {
      congeStore.addConge(newConge.value);
      newConge.value = { employee: "", startDate: "", endDate: "" };
    };

    const deleteConge = (id) => {
      congeStore.deleteConge(id);
    };

    return {
      conges: congeStore.conges,
      newConge,
      handleSubmit,
      deleteConge,
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
  background: linear-gradient(135deg, #28a745, #20c997);
}

/* Estilo da página */
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #fff;
  min-height: 100vh;
  justify-content: center;
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
  color: #28a745;
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

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #28a745;
}

button {
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #0056b3;
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

.list-item .conge-info {
  flex: 1;
  text-align: left;
}
</style>
