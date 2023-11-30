import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native'
import React, {useContext} from 'react'
import MealFavoriteList from "../UserProfile/MealFavoriteList";
import {FavoritesContext} from "../../context/favorites-context";
import {MEALS} from "../../data/dummydata";

export default function FavoriteMeals() {


    const favoriteMealsCtx = useContext(FavoritesContext);

    const favoriteMeals = MEALS.filter((meal) =>
        favoriteMealsCtx.ids.includes(meal.id)
    );

    return (

            <View style={styles.FavoriteContainer}>
                <Text style={styles.FavoriteText}>Favorite Meals</Text>
                <View style={styles.FavoriteContainerText}>

                    {favoriteMeals.length === 0 ? (
                        <View style={styles.rootContainer}>
                            <Text style={styles.text}>You have no favorite meals yet.</Text>
                        </View>
                    ) : (
                        <MealFavoriteList items={favoriteMeals} />
                    )}

                </View>


            </View>

    )
}
const styles = StyleSheet.create({


    FavoriteContainer: {
        flex: 1,
        flexDirection: 'column',
    },

    FavoriteContainerText: {
        flex: 1,
    },

    FavoriteText: {

        fontWeight: 'bold',
        fontSize: 20,
    },

    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

})
