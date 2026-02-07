import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const regesiterUserApi = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

// Login user
export const loginUserApi = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response;
}

export const getProfileApi = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};