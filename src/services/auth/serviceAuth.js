// Importer notre copie d'axios

import http from "./axiosAPI";

const useAuth = () => {
    const login = async (infoLogin) => {
        const employe = await http.post(`/login`,infoLogin)
        return employe.data
    }

    return {login}
}

export default useAuth