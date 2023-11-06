import { StyleSheet, View } from 'react-native';
import React from 'react';
import Profile from "../../components/Profile/Profile";


export default function App() {
    return (
        <View style={styles.container}>




            <Profile/>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});





