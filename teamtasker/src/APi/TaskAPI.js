import axios from "axios";
import { baseURL } from "../App";

const BASE_URL = `${baseURL}/api/tasks`;


export const createTaskApi = (taskData, token) => {
    try {
        const response = axios.post(`${BASE_URL}/create-task`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,   
            },
        });
        return response;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const getAllTasksApi = (userId, token) => {
    try {
        const response = axios.get(`${BASE_URL}/get-all-tasks/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,   
            },
        });
        return response;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }   
};

export const updateTaskApi = (taskId, updatedData, token) => {
    try {
        const response = axios.put(`${BASE_URL}/update-task/${taskId}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,   
            },
        });
        return response;
    }
    catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};

export const deleteTaskApi = (taskId, token) => {
    try {
        const response = axios.delete(`${BASE_URL}/delete-task/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,   
            },
        });
        return response;
    }
    catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};