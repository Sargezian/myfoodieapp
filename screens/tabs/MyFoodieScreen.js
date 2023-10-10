import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';

import Card from '../../components/MyFoodieSwipe/Card/Card';
import Footer from '../../components/MyFoodieSwipe/Footer/Footer';
import { FavoritesContext } from '../../context/favorites-context';

const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
export const ACTION_OFFSET = 100;

import {MEALS, MEALS as mealsArray} from "../../data/dummydata";

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

            <Footer handleChoice={handleChoice}/>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});


export default MyFoodieScreen;

