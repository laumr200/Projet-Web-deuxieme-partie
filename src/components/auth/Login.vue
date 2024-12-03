<template>
    <main>
        <form @submit.prevent="connecter">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="loginInfo.email">
            </div>
            <div class="mb-3">
                <label for="mpd" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="mdp" v-model="loginInfo.mot_de_passe">
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
            <RouterLink to="/add-user">Nouveau? Creer un compte.</RouterLink>
        </form>
    </main>

</template>

<script setup>
import { ref, watchEffect } from "vue";

import useAuth from '@/services/auth/serviceAuth'
import { useRouter } from "vue-router";
import useAuthStore from '@/stores/auth/authStore'
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
a{
    text-decoration: none;
}
</style>
