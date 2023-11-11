import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import Choice from '../Choice/Choice';
import COLORS from "../../../constants/colors";
const { Dimensions } = require('react-native');
const { width, height } = Dimensions.get('screen');
export const ACTION_OFFSET = 100;


export default function Card({
                                 meal,
                                 isFirst,
                                 swipe,
                                 tiltSign,
                                 ...rest
                             }) {

    const { name, imageUrl } = meal;

    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
        outputRange: ['8deg', '0deg', '-8deg'],
    });

    const likeOpacity = swipe.x.interpolate({
        inputRange: [25, ACTION_OFFSET],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-ACTION_OFFSET, -25],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }],
    };

    const renderChoice = useCallback(() => {
        return (
            <>
                <Animated.View
                    style={[
                        styles.choiceContainer,
                        styles.likeContainer,
                        { opacity: likeOpacity },
                    ]}
                >
                    <Choice type="like" />
                </Animated.View>
                <Animated.View
                    style={[
                        styles.choiceContainer,
                        styles.nopeContainer,
                        { opacity: nopeOpacity },
                    ]}
                >
                    <Choice type="nope" />
                </Animated.View>
            </>
        );
    }, [likeOpacity, nopeOpacity]);

    return (



        <Animated.View
            style={[styles.container, isFirst && animatedCardStyle]}
            {...rest}
        >
            <Image source={{ uri: imageUrl}} style={styles.image} />
            <LinearGradient
                colors={['transparent', COLORS.HEADERColor]}
                /*style={styles.gradient}*/
            />
            <Text style={styles.name}>{meal.name}</Text>

            {isFirst && renderChoice()}
        </Animated.View>

    );
}

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        marginTop: 160,

    },
    image: {
        width: width * 0.9,
        height: height * 0.46,
        borderRadius: 60,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 400,
        borderRadius: 50,
    },
    name: {
        position: 'absolute',
        bottom: 40,
        left: 22,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    choiceContainer: {
        position: 'absolute',
        top: 100,
    },
    likeContainer: {
        left: 45,
        transform: [{ rotate: '-30deg' }],
    },
    nopeContainer: {
        right: 45,
        transform: [{ rotate: '30deg' }],
    },
});
