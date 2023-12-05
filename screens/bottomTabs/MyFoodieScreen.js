import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Card from '../../components/MyFoodieSwipe/Card/Card';
import Footer from '../../components/MyFoodieSwipe/Footer/Footer';
import {FavoritesContext} from '../../context/favorites-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDishByType, getDishes} from "../../API/Dish/DishAPI";
import COLORS from "../../constants/colors";

const {Dimensions} = require('react-native');
const {width, height} = Dimensions.get('screen');
export const ACTION_OFFSET = 100;

function MyFoodieScreen() {


    const [meals, setMeals] = useState([]);
    // type state to swtich from brakfast, lunch, dinner, all
    const [mealsType, setMealType] = useState('all');
    const [selectedMealType, setSelectedMealType] = useState('all');
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;
    const favoriteMealsCtx = useContext(FavoritesContext); // Access the FavoritesContext
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const getUsernameFromAsyncStorage = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            setUsername(storedUsername || ''); // Set the username state
        } catch (error) {
            console.error('Error retrieving username:', error);
        }
    };

    useEffect(() => {
        getUsernameFromAsyncStorage();
    }, []);


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


    /*  useEffect(() => {
          if (!meals.length) {
              setMeals(mealsArray);
          }
      }, [meals.length]);*/


    useEffect(() => {
        const fetchMeals = async () => {
            try {
                let fetchedMeals;
                if (mealsType === 'all') {
                    fetchedMeals = await getDishes();
                } else {
                    fetchedMeals = await getDishByType(mealsType);
                }
                const filteredMeals = fetchedMeals.filter(meal => !favoriteMealsCtx.ids.some(fav => fav.dishId === meal.id));

                setMeals(filteredMeals);

            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };


        fetchMeals();
    }, [mealsType]);



    const handleMealTypeClick = (mealType) => {
        setMealType(mealType);
        setSelectedMealType(mealType);
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx, dy, y0}) => {
            swipe.setValue({x: dx, y: dy});
            tiltSign.setValue(y0 > height * 0.78 / 2 ? 1 : -1);
        },
        onPanResponderRelease: (_, {dx, dy}) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > ACTION_OFFSET;

            if (isActionActive) {

                if (direction === 1) {
                    // If swiped right (direction === 1)
                    // Save the current meal to favorites
                    const currentMeal = meals[0]; // Get the current top meal
                    favoriteMealsCtx.addFavorite({userId:email,dishId:currentMeal.id,dateAdded: new Date().toISOString()}); // Add the meal to favorites
                }

                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * width + 0.5 * width,
                        y: dy,
                    },
                    useNativeDriver: true,
                }).start(removeTopCard);
            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                    friction: 5,
                }).start();
            }
        },
    });

    const removeTopCard = useCallback(() => {
        setMeals((prevState) => prevState.slice(1));
        swipe.setValue({x: 0, y: 0});
    }, [swipe]);

    const handleChoice = useCallback(
        (direction) => {

            if (direction === 1) {
                // If the "heart" button is pressed (direction === 1)
                // Save the current meal to favorites
                const currentMeal = meals[0]; // Get the current top meal
                favoriteMealsCtx.addFavorite({userId:username,dishId:currentMeal.id,dateAdded: new Date().toISOString()});
            }

            Animated.timing(swipe.x, {
                toValue: direction * width + 0.5 * width,
                duration: 400,
                useNativeDriver: true,
            }).start(removeTopCard);
        },
        [removeTopCard, swipe.x, meals, favoriteMealsCtx]
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.topText}>Hi {username}!</Text>
                <Text style={styles.underText}>Let's find a new meal for you!</Text>
                <View style={styles.mealContainer}>
                    <TouchableWithoutFeedback onPress={() => handleMealTypeClick('all')}>
                        <View style={[
                            styles.allMealType,
                            { backgroundColor: selectedMealType === 'all' ? 'black' : COLORS.white },
                        ]}>
                            <Text style={[styles.allMealTypeText, { color: selectedMealType === 'all' ? 'white' : 'black' }]}>
                                All types
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => handleMealTypeClick('Breakfast')}>
                        <View style={[
                            styles.mealType,
                            { backgroundColor: selectedMealType === 'Breakfast' ? 'black' : COLORS.white },
                        ]}>
                            <Text style={[styles.mealTypeText, { color: selectedMealType === 'Breakfast' ? 'white' : 'black' }]}>
                                Breakfast
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => handleMealTypeClick('Lunch')}>
                        <View style={[
                            styles.mealType,
                            { backgroundColor: selectedMealType === 'Lunch' ? 'black' : COLORS.white },
                        ]}>
                            <Text style={[styles.mealTypeText, { color: selectedMealType === 'Lunch' ? 'white' : 'black' }]}>
                                Lunch
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => handleMealTypeClick('Dinner')}>
                        <View style={[
                            styles.mealType,
                            { backgroundColor: selectedMealType === 'Dinner' ? 'black' : COLORS.white },
                        ]}>
                            <Text style={[styles.mealTypeText, { color: selectedMealType === 'Dinner' ? 'white' : 'black' }]}>
                                Dinner
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

            {meals.map((meal, index) => {
                const isFirst = index === 0;
                const dragHandlers = isFirst ? panResponder.panHandlers : {};

                return (
                    <Card
                        key={meal.id}
                        meal={meal}
                        isFirst={isFirst}
                        swipe={swipe}
                        tiltSign={tiltSign}
                        {...dragHandlers}
                    />
                );
            }).reverse()}

            <Footer style={styles.footerStyle} handleChoice={handleChoice} />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    footerStyle: {
        flex: 1,

    },

    topText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    underText: {
        fontSize: 20,
        color: '#000',
        marginBottom: 10,

    },

    headerContainer: {},

    mealContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    allMealType: {
        padding: 12,
        backgroundColor: 'black',
        marginHorizontal: 4,
        borderRadius: 20,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.10,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    mealType: {
        padding: 12,
        backgroundColor: COLORS.white,
        marginHorizontal: 4,
        borderRadius: 20,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.10,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    allMealTypeText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'

    },

    mealTypeText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'

    }

});


export default MyFoodieScreen;

