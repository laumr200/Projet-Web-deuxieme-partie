import http from "./auth/axiosAPI"; // Adjust the path if axiosAPI is elsewhere

const useAudit = () => {
  const getAuditLogs = async () => {
    const logs = await http.get("/audit-logs"); // Replace with your actual API endpoint
    return logs.data;
  };

  return { getAuditLogs };
};

export default useAudit;
