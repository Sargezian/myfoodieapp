const API_BASE_URL = 'http://10.0.2.2:8181/api';

export const getUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/user`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching dishes:', error);
        throw error;
    }
};

export const getUserById = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};
