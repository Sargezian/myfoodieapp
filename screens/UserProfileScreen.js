import {StyleSheet, View} from 'react-native'
import React from 'react'
import UserProfile from "../components/UserProfile/UserProfile";
import FavoriteMeals from "../components/UserProfile/FavoriteMeals";


export default function UserProfileScreen() {

    return (

        <>
            <View style={styles.Container}>
                <UserProfile/>
            </View>

            <View style={styles.ContainerTwo}>
                <FavoriteMeals/>
            </View>
        </>

    )
}
const styles = StyleSheet.create({

    Container: {
        flex: 0.25,

    },

    ContainerTwo: {
        flex: 1,
    },

})
