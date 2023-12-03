import React, { useCallback, useRef } from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function RoundButton({ name, size, color, onPress }) {
    const scale = useRef(new Animated.Value(1)).current;

    const animateScale = useCallback(
        (newValue) => {
            Animated.spring(scale, {
                toValue: newValue,
                friction: 4,
                useNativeDriver: true,
            }).start();
        },
        [scale]
    );

    return (
        <TouchableWithoutFeedback
            onPressIn={() => animateScale(0.8)}
            delayPressIn={0}
            onPressOut={() => {
                animateScale(1);
                onPress();
            }}
            delayPressOut={110}
        >
            <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
                <FontAwesome name={name} size={size} color={color} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

export const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        width: 130,
        height: 60,
        backgroundColor: 'black',
        elevation: 5,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
