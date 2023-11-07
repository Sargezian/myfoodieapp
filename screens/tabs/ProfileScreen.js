import {Platform, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import Profile from "../../components/Profile/Profile";


export default function App() {
    return (

        <SafeAreaView style={{ flex: 1 }}>


    <View style={styles.container}>


            <Profile/>

        </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});





