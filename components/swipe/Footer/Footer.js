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
                color={COLORS.nope}
                onPress={() => handleChoice(-1)}
            />
            <RoundButton
                name="heart"
                size={34}
                color={COLORS.like}
                onPress={() => handleChoice(1)}
            />
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 25,
        width: 270,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1,
    },
});
