<template>
  <div class="add-role">
    <h2>Ajouter un Rôle</h2>
    <form @submit.prevent="addRole">
      <div class="form-group">
        <label for="role-name">Nom du Rôle :</label>
        <input
          type="text"
          id="role-name"
          v-model="roleName"
          placeholder="Entrez le nom du rôle"
          required
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      roleName: "",
      successMessage: null,
      errorMessage: null,
    };
  },
  methods: {
    async addRole() {
      this.successMessage = null;
      this.errorMessage = null;
      try {
        const response = await axios.post("http://localhost:3000/api/roles", {
          nom_role: this.roleName,
        }); 
        this.successMessage = `Rôle "${response.data.data.nom_role}" ajouté avec succès.`;
        this.roleName = ""; 
      } catch (error) {
        this.errorMessage = "Erreur lors de l'ajout du rôle.";
        console.error(error);
      }
    },
  },
};
</script>

<style>
.form-group {
  margin-bottom: 10px;
}
.success {
  font-size: 16px;
  color: green;
}
.error {
  font-size: 16px;
  color: red;
}
</style>

