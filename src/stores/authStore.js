//Creation du store
import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

const useAuthStore = defineStore('auth', () => {
    const employe = ref({})
    const token = ref(null)
    const router = useRouter()

    // Mettre a jour les variables (setters)
    const setEmploye = newEmploye => employe.value = newEmploye
    const setToken = newToken => token.value = newToken

    //Se deconnecter
    const logout = () => {
        setEmploye(null)
        setToken(null)
        router.push('/login')
    }

    const login = async (infoLogin) => {
        const employeData = await useAuth().login(infoLogin);
        setEmploye(employeData.employe);
        setToken(employeData.token);
        router.push("/employes");
      };
      

    //Recuperer les valeurs (getters)
    const currentToken = computed(() => token.value)
    const currentEmploye = computed(() => employe.value)

    return { setToken, setEmploye,employe,token, currentToken, currentEmploye, logout  , login}
},
    {
        persist: true
    })

export default useAuthStore
