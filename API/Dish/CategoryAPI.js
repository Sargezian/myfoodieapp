const API_BASE_URL = 'http://localhost:8181/api';

export const getAllCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/category`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/category/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
}


