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

export const getReviewsByDishId = async (mealId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/${mealId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Reviews by DishId:', error);
        throw error;
    }
}

export const removeDishByUserIdAndReviewId = async (userId, reviewId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/${userId}/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                reviewId: reviewId,
            }),
        });


        if (response.status !== 204) {
            throw new Error('Failed to remove review');
        }

    } catch (error) {
        console.error('Error removing review:', error.message);
        throw error;
    }
};

export const getReviewByUserIdAndDishId = async (userId,dishId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/user/${userId}/${dishId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Review by UserId and DishId:', error);
        throw error;
    }
}




export const updateReviewByUserIdAndReviewId = async (review, userId , reviewId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/${userId}/${reviewId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });
        if (response.status !== 204) {
            throw new Error('Failed to update the review');
        }

    } catch (error) {
        console.error('Error adding review to dish:', error.message);
        throw error;
    }
};

export const getMostReviewedDish = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/most-reviewed-dishes`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching most-revieweds-dishes:', error);
        throw error;
    }
}

export const getHighestRatedDish = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/highest-rated-dishes`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching highest-rated-dishes:', error);
        throw error;
    }
}




export const getRatingByDishId = async (mealId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/review/rating/${mealId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching Rating by dishId:', error);
        throw error;
    }
}
