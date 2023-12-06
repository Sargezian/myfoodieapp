import {createContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (favorite) => {
    },
    removeFavorite: (userId, dishId) => {
    },
});

const addToFavorite = async (favorite) => {
    try {
        const favoriteResponse = await fetch("http://localhost:8181/api/favorite", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(favorite),
        });
        if (favoriteResponse.status !== 201) {
            throw new Error('Failed to add favorite');
        }

    } catch (error) {
        console.error(`Error: ${error}`);
    }
};


const removeFavoriteByUserIdAndDishId = async (userId, dishId) => {
    try {
        const response = await fetch(`http://localhost:8181/api/favorite/${userId}/${dishId}`, {
            method: 'DELETE',
        });
        if (response.status !== 204) {
            throw new Error('Failed to delete your favorite dish');
        }
    } catch (error) {
        console.error(error);
    }
}

function FavoritesContextProvider({children}) {
    const [email, setEmail] = useState('');
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);


    const getEmailFromAsyncStorage = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            setEmail(storedEmail || ''); // Set the username state
        } catch (error) {
            console.error('Error retrieving email:', error);
        }
    };

    const getFavoriteMealsByUserId = async () => {
        try {
            const response = await fetch(`http://localhost:8181/api/favorite/${email}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Favorite Meals By UserId:', error);
            throw error;
        }
    };

    const getFavoriteMealsByUserIdAndDishId = async (userId, dishId) => {
        try {
            const response = await fetch(`http://localhost:8181/api/favorite/dish/${userId}/${dishId}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching Favorite Meals By UserId:', error);
            throw error;
        }
    };


    useEffect(() => {
        getEmailFromAsyncStorage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const favorite = await getFavoriteMealsByUserId();
                setFavoriteMealIds(favorite);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [email]);


    async function addFavorite(favorite) {
        try {
            await addToFavorite(favorite);

            // api call to get favorite meals by user id and dish id
            const favoriteMeal = await getFavoriteMealsByUserIdAndDishId(favorite.userId, favorite.dishId);
            const array = [...favoriteMealIds, favoriteMeal]
            setFavoriteMealIds(array);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    async function removeFavorite(userId, dishId) {
        try {
            await removeFavoriteByUserIdAndDishId(userId, dishId);
            console.log(userId, dishId  )
            setFavoriteMealIds(favoriteMealIds.filter(x => x.dishId !== dishId));

        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;
