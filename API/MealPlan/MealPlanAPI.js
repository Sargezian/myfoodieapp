const API_BASE_URL = 'http://10.0.2.2:8181/api';

export const addDishToCalendar = async (userId, dishId, date) => {
    try {
        const response = await fetch(`${API_BASE_URL}/calendar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                dishId: dishId,
                date: date,
            }),
        });
        if (response.status !== 201) {
            throw new Error('Failed to add dish to calendar');
        }

    } catch (error) {
        console.error('Error adding dish to calendar:', error.message);
        throw error;
    }
};

export const removeCalendarByUserIdAndDishId = async (userId, dishId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/calendar/${userId}/${dishId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                dishId: dishId,
            }),
        });


        if (response.status !== 204) {
            throw new Error('Failed to remove dish');
        }

    } catch (error) {
        console.error('Error removing dish:', error.message);
        throw error;
    }
};



export const getCalendarByUserIdAndDate = async (userId,date) => {
    try {
        const response = await fetch(`${API_BASE_URL}/calendar/${userId}/${date}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Calendar by UserId and Date:', error);
        throw error;
    }
}