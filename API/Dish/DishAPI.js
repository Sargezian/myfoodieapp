const API_BASE_URL = 'http://10.0.2.2:8181/api';

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

export const getDishByType = async (dishType) => {
    try {
        const response = await fetch(`${API_BASE_URL}/dish/type/${dishType}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching dish:', error);
        throw error;
    }
}

export const getDishById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/dish/dish/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching dish:', error);
        throw error;
    }
}

export const getNewlyAddedDishes = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/dish/newlyAdded`);

        return await response.json();
    } catch (error) {
        console.error('Error fetching dish:', error);
        throw error;
    }
}
