import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetail/MealDetails';
import { MEALS } from '../data/dummydata';
import { FavoritesContext } from '../context/favorites-context';
import {useContext, useLayoutEffect} from "react";
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../constants/colors";

function MealDetailScreen({ route, navigation }) {
    const favoriteMealsCtx = useContext(FavoritesContext);

    const mealId = route.params.mealId;
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

    function changeFavoriteStatusHandler() {
        if (mealIsFavorite) {
            favoriteMealsCtx.removeFavorite(mealId);
        } else {
            favoriteMealsCtx.addFavorite(mealId);
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Ionicons
                        name={mealIsFavorite ? 'heart' : 'heart-outline'}
                        color="white"
                        onPress={changeFavoriteStatusHandler}
                    />
                );
            },
        });
    }, [navigation, changeFavoriteStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>


            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />

            <View style={styles.Container}>

                <View style={styles.topContainer}>
            <Text style={styles.topContainerText}>{selectedMeal.name} </Text>
                    <Text style={styles.topContainerText}>{selectedMeal.meal_type}</Text>
                    <Text style={styles.topContainerText}> Rating: {selectedMeal.rating}</Text>

                </View>

            <Text style={styles.title}>{selectedMeal.description}</Text>
            <MealDetails
                time_estimate={selectedMeal.time_estimate}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>What you need</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps - How to Cook</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },

    topContainer: {
        flexDirection: 'row',
        paddingHorizontal: 40,
        paddingTop: 18,
        justifyContent: 'space-between',
    },

    topContainerText: {
        fontSize: 15,

    },

    Container: {
        marginTop: -40,
        backgroundColor: COLORS.white,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },

    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        margin: 8,
        paddingLeft: 30,
        color: 'black',
    },
    detailText: {
        color: 'black',
    },
    listOuterContainer: {
        alignItems: 'center',
    },
    listContainer: {
        width: '80%',
    },
});