import React from 'react';
import {StyleSheet, View} from 'react-native';

import RoundButton from '../RoundButton/RoundButton';
import COLORS from "../../../constants/colors";

export default function Footer({ handleChoice }) {
    return (
        <View style={styles.container}>
            <RoundButton
                name="times"
                size={40}
                color={COLORS.white}
                onPress={() => handleChoice(-1)}
            />
            <RoundButton
                name="heart"
                size={34}
                color={COLORS.white}
                onPress={() => handleChoice(1)}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 580 : 560, // Adjust the top value for both platforms
        flexDirection: 'row',
        zIndex: 1,
    },
});
