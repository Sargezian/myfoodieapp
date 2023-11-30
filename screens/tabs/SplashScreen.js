import React, { useRef } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import COLORS from "../../constants/colors";

export default function App() {
    const animation = useRef(null);

    return (
        <View style={styles.animationContainer}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    flex: 1,
                    backgroundColor: COLORS.BGColor,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../../assets/animation.json')}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        flex: 1,
    },
});
