import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import MealFavoriteList from '../UserProfile/MealFavoriteList';
import { FavoritesContext } from '../../context/favorites-context';

export default function FavoriteMeals() {
    const favoriteMealsCtx = useContext(FavoritesContext);

    return (
        <View style={styles.FavoriteContainer}>
            <Text style={styles.FavoriteText}>Favorite Meals: </Text>
            <View style={styles.SpacingContainer} />
            <View style={styles.FavoriteContainerText}>
                {favoriteMealsCtx.ids.length === 0 ? (
                    <View style={styles.rootContainer}>
                        <Text style={styles.text}>You have no favorite meals yet.</Text>
                    </View>
                ) : (
                    <MealFavoriteList items={favoriteMealsCtx.ids} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    FavoriteContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
        padding: 10,
    },
    FavoriteContainerText: {
        flex: 1,
    },
    SpacingContainer: {
        height: 10,
    },
    FavoriteText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    text: {
        fontSize: 16,
    },
});
