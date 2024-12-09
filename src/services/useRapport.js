import http from "./auth/axiosAPI"; // Adjust the path if axiosAPI is elsewhere

const useRapport = () => {
  const getRapports = async () => {
    const rapports = await http.get("/rapports"); // Replace with your actual API endpoint
    return rapports.data;
  };

  return { getRapports };
};

export default useRapport;
