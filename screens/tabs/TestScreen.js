import { StyleSheet, View } from 'react-native';
import { CircularCarousel } from '../../components/circular-carousel';
import React from 'react';

const data = [
    require('../../assets/1.png'),
    require('../../assets/2.png'),
    require('../../assets/3.png'),
    require('../../assets/icon.png'),
    require('../../assets/favicon.png'),
];

export default function App() {
    return (
        <View style={styles.container}>
            <CircularCarousel data={data}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});





