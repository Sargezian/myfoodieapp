import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { FavoritesContext } from '../../context/favorites-context';
import MealFavoriteList from "../../components/MealFavoriteList/MealFavoriteList";

function FavoritesScreen() {
    const favoriteMealsCtx = useContext(FavoritesContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {favoriteMealsCtx.ids.length === 0 ? (
                    <View style={styles.rootContainer}>
                        <Text style={styles.text}>You have no favorite meals yet.</Text>
                    </View>
                ) : (
                    <MealFavoriteList items={favoriteMealsCtx.ids} />
                )}
            </View>
        </SafeAreaView>
    );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
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
