const API_BASE_URL = 'http://localhost:8181/api';


export const getFollowerByFollowerId = async (followerId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/follower/${followerId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching followers by followerId:', error);
        throw error;
    }
}