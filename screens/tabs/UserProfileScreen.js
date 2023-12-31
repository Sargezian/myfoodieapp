import {StyleSheet, View} from 'react-native'
import React from 'react'
import UserProfile from "../../components/UserProfile/UserProfile";
import FavoriteMeals from "../../components/UserProfile/FavoriteMeals";


export default function UserProfileScreen({route}) {
    const { id } = route.params;
    console.log("this is the userid: " + id)


    return (

        <>
            <View style={styles.Container}>
                <UserProfile userId={id}/>
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
