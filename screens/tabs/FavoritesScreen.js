import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';

import MealCategoryList from '../../components/MealCategoryList/MealCategoryList';
import { FavoritesContext } from '../../context/favorites-context';
import { MEALS } from '../../data/dummydata';
import IconButton from "../../components/LoginAuth/LoginUI/IconButton";
import MealFavoriteList from "../../components/MealFavoriteList/MealFavoriteList";

function FavoritesScreen() {
    const favoriteMealsCtx = useContext(FavoritesContext);

    const favoriteMeals = MEALS.filter((meal) =>
        favoriteMealsCtx.ids.includes(meal.id)
    );


    if (favoriteMeals.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>You have no favorite meals yet.</Text>
            </View>
        );
    }

    return (
        <MealFavoriteList
            items={favoriteMeals}
        />

    );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});


