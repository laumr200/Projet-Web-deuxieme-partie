<template>
    <main class="login-container">
      <div class="login-box">
        <div class="login-icon">
          <!-- Ajoutez ici une icône ou une image -->
          <img src="../assets/camera1.png" alt="Login Icon" />
        </div>
        <form @submit.prevent="connecter" class="login-form">
          <div class="input-group">
            <label for="email" class="form-label">Email ID</label>
            <input type="email" class="form-input" id="email" v-model="loginInfo.email" placeholder="Enter your email" />
          </div>
          <div class="input-group">
            <label for="mdp" class="form-label">Password</label>
            <input type="password" class="form-input" id="mdp" v-model="loginInfo.mot_de_passe" placeholder="Enter your password" />
          </div>
          <div class="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <RouterLink to="/forgot-password" class="forgot-password">Vous avez oublie votre mots de passe?</RouterLink>
          </div>
          <button type="submit" class="login-button">Login</button>
          <RouterLink to="/add-employe" class="create-account">Nouveau? Creer une compte.</RouterLink>
        </form>
      </div>
    </main>
  </template>
  

<script setup>
import { ref, watchEffect } from "vue";

import useAuth from '@/services/auth/serviceAuth'
import { useRouter } from "vue-router";
import useAuthStore from '@/stores/authStore'
const { login } = useAuth()

const { setUser, setToken } = useAuthStore()

// Les regx pour la validation

const mdpRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
// const user = ref({})
const loginInfo = ref({
    email: null,
    mot_de_passe: null
})

const router = useRouter()
const connecter = () => {
    login(loginInfo.value).then(res => {

        setToken(res.token)
        setUser(res.data)
        router.push('/')
    }).catch(err => {

        //En cas d'erreurs au backend, recuperer les erreurs provenant du backend et les afficher sur le formulaire
        const bakendErrors = err.response.data.errors
        //Creer un objet pour mettre les erreurs du backend dans le meme format que la variable errors (declares plus haut)
        const backendError = {}

        for (let error of bakendErrors) {
            backendError[error.path] = error.msg
        }

        // Copier les erreurs du backend mises en forme dans la variable errors
        erreurs.value = { ...erreurs.value, ...backendError }

        router.push('/login')
        console.log('Erreur connexion', err)
    })
}

</script>
<style scoped>
/* Conteneur principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #18ace6; /* Couleur de fond */
}


/* Boîte de connexion */
.login-box {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
}

/* Icône */
.login-icon img {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  border-radius: 50%;
  background: rgb(212, 194, 194);
  padding: 10px;
}

/* Formulaire */
.login-form {
  display: flex;
  flex-direction: column;
}

/* Groupes d'input */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-label {
  color: white;
  margin-bottom: 5px;
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

/* Options */
.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: white;
  font-size: 12px;
}

.forgot-password {
  color: white;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

/* Bouton */
.login-button {
  background-color: #004d4d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.login-button:hover {
  background-color: #007373;
}

/* Lien créer un compte */
.create-account {
  display: block;
  margin-top: 20px;
  color: white;
  font-size: 14px;
  text-decoration: none;
}

.create-account:hover {
  text-decoration: underline;
}
</style>

