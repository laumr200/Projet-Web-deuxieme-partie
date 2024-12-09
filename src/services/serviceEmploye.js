import http from "../auth/axiosAPI";

const useEmployes = () => {
    const getAllEmployes = async () => {
        const response = await http.get(`/employes`);
        return response.data;
    };

    return { getAllEmployes };
};

export default useEmployes;
