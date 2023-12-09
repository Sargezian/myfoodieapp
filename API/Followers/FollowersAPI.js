const API_BASE_URL = 'http://10.0.2.2:8181/api';


export const getFollowerByFollowerId = async (followerId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/follower/${followerId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching followers by followerId:', error);
        throw error;
    }
}

export const getFollowerByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/follower/user/${userId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching followers by followerId:', error);
        throw error;
    }
}

export const addFollower = async (followerId, userId, followedDate) => {
    try {
        const response = await fetch(`${API_BASE_URL}/follower`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followerId: followerId,
                userId: userId,
                followedDate: followedDate,
            }),
        });
        if (response.status !== 201) {
            throw new Error('Failed to add follower');
        }

    } catch (error) {
        console.error('Error adding follower:', error.message);
        throw error;
    }
}


export const removeFollowerByFollowerIdAndUserId = async (followerId, userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/follower/${followerId}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followerId: followerId,
                userId: userId,
            }),
        });

        if (response.status !== 204) {
            throw new Error('Failed to remove follower');
        }

    } catch (error) {
        console.error('Error removing follower:', error.message);
        throw error;
    }

}

export const getFollowingCountByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/follower/followingCount/${userId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching followers by followerId:', error);
        throw error;
    }
}

export const getFollowersCountByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/follower/followersCount/${userId}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching followers by followerId:', error);
        throw error;
    }
}
