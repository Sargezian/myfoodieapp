import {View, Text, Image, StyleSheet, ScrollView, Platform, TextInput} from 'react-native';

import List from '../../components/MealDetail/List';
import Subtitle from '../../components/MealDetail/Subtitle';
import MealDetails from '../../components/MealDetail/MealDetails';
import { MEALS } from '../../data/dummydata';
import { FavoritesContext } from '../../context/favorites-context';
import React, {useContext, useLayoutEffect} from "react";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import Ratings from "../../components/MealDetail/Ratings";


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

                <View style={styles.TitleContainer}>
            <Text style={styles.title}>{selectedMeal.description}</Text>

                    <View style={styles.SubmitContainer}>

                        <Text style={styles.RatingNumber}><FontAwesome
                            color="#ea266d"
                            name="star"
                            solid={true}
                            size={16}
                            style={{ marginBottom: 2 }}
                        /> {selectedMeal.rating} out of 5</Text>
                    </View>
                </View>



                <View style={styles.topContainer}>
                    <Text style={styles.topContainerText}>{selectedMeal.name} </Text>
                    <Text style={styles.topContainerText}>{selectedMeal.meal_type}</Text>
                    <Text style={styles.topContainerText}>{selectedMeal.review} Reviews given</Text>
                </View>
            <MealDetails
                time_estimate={selectedMeal.time_estimate}
                nutritional_content={selectedMeal.nutritional_content}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>What you need</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps - How to Cook</Subtitle>
                    <List data={selectedMeal.steps} />
                    <Subtitle>Review</Subtitle>

                    <View style={styles.ReviewListContainer}>

                        <View style={styles.ReviewProfile}>

                            <Ionicons name="person" color={'black'} size={25} />

                        </View>

                        <View style={styles.ReviewListInside}>

                            <Text> Username </Text>
                            <Text> Date </Text>

                            <Text> Stars </Text>
                            <Text> Comment </Text>

                        </View>
                        <View style={styles.ReviewButton}>

                            <View style={styles.Edit}>
                                <Text style={styles.EditText}> Edit </Text>
                            </View>

                            <View style={styles.Delete}>
                                <Text style={styles.DeleteText}> Delete </Text>
                            </View>

                        </View>


                    </View>



                    <View style={styles.ratingContainer}>
                    <Ratings/>
                        <View style={styles.mockTextBoxContainer}>
                            <TextInput
                                style={styles.mockTextBox}
                                placeholder="Type your review here"
                                multiline
                            />
                        </View>

                        <View style={styles.EnterContainer}>
                            <Text style={styles.EnterSubmit}> Submit Review</Text>
                        </View>


                    </View>
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
        justifyContent: 'space-between',
    },

    topContainerText: {
        fontSize: 15,

    },

    Container: {
        marginTop: -40,
        backgroundColor: COLORS.BGColor,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },

    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
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

    ratingContainer:{
        flex: 1,

        flexDirection: 'column',

        justifyContent: 'center',

        borderRadius: 25,
        elevation: 4,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    RatingNumber: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    SubmitContainer: {
        justifyContent: 'center',
        marginRight: 20,
    },

    SubmitReview: {
      fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },

    TitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',


    },
    scrollView: {
        flex: 1,
    },

    mockTextBoxContainer: {
        padding: 10,
    },

    mockTextBox: {
        height: 40,
        borderColor: 'lightgrey',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },

    EnterContainer: {
        backgroundColor: 'black',
        borderRadius: 25,
        width: 150,
        alignItems: 'center',
        marginLeft: 75,
    },

    EnterSubmit: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 8,
    },

    ReviewListContainer: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 8,
    },

    ReviewProfile: {
        flex: 0.25,
    },

    ReviewListInside: {
        flex: 1,
    },

    ReviewButton: {
        flex: 1,
        flexDirection: 'row',
    },

    ReviewComments: {


    },

    Edit: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginRight: 5,
        height: 30,

    },

    EditText: {
        color: 'white',
        fontWeight: 'bold',

    },

    Delete: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 30,
    },

    DeleteText: {
        color: 'white',
        fontWeight: 'bold',

    }

});