import axios from 'axios';
import { baseURL } from "../App";
const API_URL = `${baseURL}/api/dashboard`;

export const getDashboardData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/task-dashboard/${userId}`);
        return response.data;
    } catch (error) {

        console.error('Error fetching dashboard data:', error);
        throw error;
    }
};
