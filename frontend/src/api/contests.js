import axios from "axios";

const API_URL = "http://localhost:5000/api/contests"; // Adjust backend URL if needed

export const getContests = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Contests fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching contests:", error);
    return [];
  }
};
