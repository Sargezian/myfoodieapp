import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View, Text, Platform} from 'react-native';
import Card from '../../components/MyFoodieSwipe/Card/Card';
import Footer from '../../components/MyFoodieSwipe/Footer/Footer';
import { FavoritesContext } from '../../context/favorites-context';

const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
export const ACTION_OFFSET = 100;

import {MEALS, MEALS as mealsArray} from "../../data/dummydata";
import {getDishes} from "../../API/Dish/DishAPI";
import COLORS from "../../constants/colors";

function MyFoodieScreen() {


    const [meals, setMeals] = useState(MEALS);
    const swipe = useRef(new Animated.ValueXY()).current;
    const tiltSign = useRef(new Animated.Value(1)).current;
    const favoriteMealsCtx = useContext(FavoritesContext); // Access the FavoritesContext


    useEffect(() => {
        if (!meals.length) {
            setMeals(mealsArray);
        }
    }, [meals.length]);


/*    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const fetchedMeals = await getDishes();
                setMeals(fetchedMeals);
                console.log(fetchedMeals)
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        if (!meals.length) {
            fetchMeals();
        }
    }, [meals.length]);*/


    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x: dx, y: dy });
            tiltSign.setValue(y0 > height * 0.78 / 2 ? 1 : -1);
        },
        onPanResponderRelease: (_, { dx, dy }) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > ACTION_OFFSET;

            if (isActionActive) {

                if (direction === 1) {
                    // If swiped right (direction === 1)
                    // Save the current meal to favorites
                    const currentMeal = meals[0]; // Get the current top meal
                    favoriteMealsCtx.addFavorite(currentMeal.id); // Add the meal to favorites
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
        swipe.setValue({ x: 0, y: 0 });
    }, [swipe]);

    const handleChoice = useCallback(
        (direction) => {

            if (direction === 1) {
                // If the "heart" button is pressed (direction === 1)
                // Save the current meal to favorites
                const currentMeal = meals[0]; // Get the current top meal
                favoriteMealsCtx.addFavorite(currentMeal.id); // Add the meal to favorites
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
            <Text style={styles.topText}>Hi Lennart!</Text>
            <Text style={styles.underText}>Let's find a new meal for you!</Text>
            <View style={styles.mealContainer}>
                <View style={styles.allMealType}>
                    <Text style={styles.allMealTypeText}>All types</Text>
                </View>
                <View style={styles.mealType}>
                    <Text style={styles.mealTypeText}>Breakfast</Text>
                </View>
                <View style={styles.mealType}>
                    <Text style={styles.mealTypeText}>Lunch</Text>
                </View>
                <View style={styles.mealType}>
                    <Text style={styles.mealTypeText}>Dinner</Text>
                </View>
            </View>
            </View>

            {meals
                .map((meal,  index) => {
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
                })
                .reverse()}

            <Footer style={styles.footerStyle}  handleChoice={handleChoice}/>
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

    headerContainer: {

    },

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
        shadowOffset: { width: 0, height: 2 },
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
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    allMealTypeText:  {
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

