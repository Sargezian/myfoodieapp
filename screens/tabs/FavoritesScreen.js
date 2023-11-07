import {View, Text, StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';
import { useContext } from 'react';
import { FavoritesContext } from '../../context/favorites-context';
import { MEALS } from '../../data/dummydata';
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

        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.container}>
        <MealFavoriteList
            items={favoriteMeals}
        />
            </View>

        </SafeAreaView>

    );
}

export default FavoritesScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});


