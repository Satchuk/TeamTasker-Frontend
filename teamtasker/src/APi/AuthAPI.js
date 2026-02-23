import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

console.log(process.env.REACT_APP_API_URL,API_URL);
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

export const getAllUsersApi = (token) => {
    return axios.get(`${API_URL}/all-users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const forgetPwd = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/forgot-password`,
            { email }
        );

        return response;
    } catch (error) {
        console.error(error);
    }
}

export const resetPwd = async (token, password) => {
    try {
        const response = await axios.put(
            `${API_URL}/reset-password/${token}`,
            { password }
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}