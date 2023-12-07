import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {View, Text, Image, StyleSheet, ScrollView, Platform, TextInput, TouchableOpacity} from 'react-native';
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import Ratings from "../../components/MealDetail/Ratings";
import { getDishById } from "../../API/Dish/DishAPI";
import List from '../../components/MealDetail/List';
import Subtitle from '../../components/MealDetail/Subtitle';
import MealDetails from '../../components/MealDetail/MealDetails';
import { FavoritesContext } from '../../context/favorites-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListRating from "../../components/MealDetail/ListRating";
import Edit from "../../components/MealDetail/Edit";
import {Center, NativeBaseProvider} from "native-base";

function MealDetailScreen({ route, navigation }) {
    const favoriteMealsCtx = useContext(FavoritesContext);
    const mealId = route.params.mealId;
    const [selectedMeal, setSelectedMeal] = useState({});
    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
    const [email, setEmail] = useState('');


    const handleEditPress = () => {
        navigation.navigate('EditRating');
    };

    const getEmailFromAsyncStorage = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            setEmail(storedEmail || ''); // Set the username state
        } catch (error) {
            console.error('Error retrieving emaiæ:', error);
        }
    };

    useEffect(() => {
        getEmailFromAsyncStorage();
    }, []);


    useEffect(() => {
        const fetchMealById = async () => {
            try {
                console.log(mealId)
                const mealData = await getDishById(mealId);
                console.log(mealData.ingredients);
                setSelectedMeal(mealData);
            } catch (error) {
                console.error('Error fetching meal:', error);
            }
        };

        fetchMealById();
    }, [mealId]);

    const changeFavoriteStatusHandler = () => {
        if (mealIsFavorite) {
            favoriteMealsCtx.removeFavorite(email, selectedMeal.id);
        } else {
            favoriteMealsCtx.addFavorite({userId:email,dishId:selectedMeal.id,dateAdded: new Date().toISOString()});
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name={mealIsFavorite ? 'heart' : 'heart-outline'}
                    color="white"
                    onPress={changeFavoriteStatusHandler}
                />
            ),
        });
    }, [navigation, changeFavoriteStatusHandler]);

    if (!selectedMeal || !selectedMeal.ingredients || !selectedMeal.recipe) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageURL}} />
            <View style={styles.Container}>

                <View style={styles.topContainer}>
                    <Text style={styles.topContainerText}>{selectedMeal.name} </Text>
                </View>

                    <View style={styles.SubmitContainer}>
                        <Text style={styles.topTextStyle}>{selectedMeal.mealType}</Text>
                        <Text style={styles.topTextStyle}>{selectedMeal.timeEstimate} Minutes</Text>
                        <Text style={styles.RatingNumber}><FontAwesome
                            color="#ea266d"
                            name="star"
                            solid={true}
                            size={16}
                            style={{ marginBottom: 2 }}
                        /> 1 out of 5</Text>
                    </View>


                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{selectedMeal.description}</Text>
                </View>

                <Subtitle>Nutritional Content</Subtitle>
                <MealDetails
                    nutritional_content={selectedMeal.nutritionalContent}
                    textStyle={styles.detailText}
                />
                <View style={styles.listOuterContainer}>
                    <View style={styles.listContainer}>
                        <Subtitle>What you need</Subtitle>
                        {selectedMeal.ingredients && <List data={selectedMeal.ingredients} />}
                        <Subtitle>Steps - How to Cook</Subtitle>
                        {selectedMeal.recipe && <List data={selectedMeal.recipe} />}
                        <Subtitle>Review</Subtitle>
                        <View style={styles.ReviewListContainer}>
                            <View style={styles.ReviewProfile}>
                                <Ionicons name="person" color={'black'} size={25} />
                            </View>
                            <View style={styles.ReviewListInside}>
                                <Text style={styles.usernameStyling}> Username </Text>
                                <Text style={styles.dateStyling}> Date </Text>
                                <Text style={styles.starsStyling}> <ListRating /> </Text>
                                <Text> fint </Text>
                            </View>
                            <View style={styles.ReviewButton}>

                                <View style={styles.Edit}>
                                    <TouchableOpacity onPress={handleEditPress}>
                                    <Text style={styles.EditText}> Edit </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.Delete}>
                                    <Text style={styles.DeleteText}> Delete </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Ratings />
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
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',

        marginVertical: 8,
    },

    topTextStyle: {
        fontSize: 15,
      fontWeight: 'bold',
    },

    topContainerText: {
        fontSize: 20,
        fontWeight: 'bold',

    },

    topContainerTextSecond: {
      fontSize: 12,
        fontWeight: 'bold',
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
        fontSize: 15,
        margin: 8,
        paddingLeft: 30,
        color: 'black',
    },
    detailText: {
        color: 'black',
    },

    descriptionContainer: {
        paddingHorizontal: 20,
        marginVertical: 8,
    },

    descriptionText: {
      fontSize: 14,

    },

    listOuterContainer: {
        alignItems: 'center',
        marginTop: -80
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
        justifyContent: 'center',
        alignItems: 'center',
    },

    usernameStyling: {
        paddingVertical: 2,
        fontWeight: 'bold',
    },

    dateStyling: {
        color: 'grey',
    },

    starsStyling: {
        marginVertical: 4,
    },

    SubmitContainer: {

        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    SubmitReview: {
      fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },

    TitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'green',

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
        backgroundColor: 'white',
        borderRadius: 20,
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