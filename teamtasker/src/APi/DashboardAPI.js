import axios from 'axios';
const API_URL = 'http://localhost:5000/api/dashboard';

export const getDashboardData = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/task-dashboard/${userId}`);
        return response.data;
    } catch (error) {

        console.error('Error fetching dashboard data:', error);
        throw error;
    }
};
