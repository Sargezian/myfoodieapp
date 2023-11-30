const API_BASE_URL = 'http://127.0.0.1:8181/api';

export const getDishes = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/dish`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dishes:', error);
        throw error;
    }
};
