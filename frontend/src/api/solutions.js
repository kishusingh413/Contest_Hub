import axios from "axios";

const API_URL = "http://localhost:5000/api/solutions";

export const getSolutions = async (contestId) => {
  try {
    const response = await axios.get(`${API_URL}/${contestId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching solutions:", error);
    return [];
  }
};

export const addSolution = async (solutionData, token) => {
  try {
    const response = await axios.post(`${API_URL}/add`, solutionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding solution:", error);
    return null;
  }
};
