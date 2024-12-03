<template>
  <main>
    <h1> Liste des Roles</h1>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
         <tr v-for="role in roles ":key="role.id">
          <th>{{ role.id }}</th>
          <th>{{ role.nom }}</th>
          <th><button class="btn btn-primary">Editer </button> <button @click=deleterole(role.id) class="btn btn-danger">Supprimer</button></th>
         </tr>
        </tbody>
        <tfoot>

        </tfoot>

    </table>
  </main>
</template>

<script setup>
//import de la fontion onbeforemont pour charger les elemments avant l'affichage 
import { onBeforeMount, ref } from 'vue';
//importer axios pour la communication avec le server
import axios  from 'axios';

//variable pour garder la liste des roles 
const roles=ref([]);

//fontion pour lire la liste des roles 
const getRoles=()=>{
 axios.get ("http://localhost:5000/api/roles")
 .then(res=>{
    console.log("liste",res)
    roles.value=res.data.data
    console.log("Liste de roles" , roles)
})
 .catch(err=>console.log(err))
} 

const deleterole=id=>{
    axios.delete("http://localhost:5000/api/roles"+id)
    .then(()=>getRoles)
    .catch(err=>{})
}
onBeforeMount(()=>{
    getRoles()
})
</script>
