import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import COLORS from "../../../constants/colors";

export default function Choice({ type }) {
    const color = COLORS.BGColor;

    return (
        <View style={[styles.container, { borderColor: COLORS.BGColor }]}>
            <Text style={[styles.text, { color }]}>{type}</Text>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        borderWidth: 7,
        paddingHorizontal: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        fontSize: 48,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 4,
    },
});
