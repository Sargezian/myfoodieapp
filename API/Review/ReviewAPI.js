const API_BASE_URL = 'http://localhost:8181/api';

export const addReviewToDish = async (userId, dishId, rating, title, comment, dateCreated) => {
    try {
        const response = await fetch(`${API_BASE_URL}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                dishId: dishId,
                rating: rating,
                title: title,
                comment: comment,
                dateCreated: dateCreated,
            }),
        });
        if (response.status !== 201) {
            throw new Error('Failed to add review to dish');
        }

    } catch (error) {
        console.error('Error adding review to dish:', error.message);
        throw error;
    }
};


export const getReviewByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/user/${userId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Review by UserId:', error);
        throw error;
    }
}





