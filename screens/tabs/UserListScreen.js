import {StyleSheet, View} from 'react-native'
import React from 'react'
import UserProfile from "../../components/UserProfile/UserProfile";
import FavoriteMeals from "../../components/UserProfile/FavoriteMeals";
import UserList from "../../components/UserProfile/UserList";


export default function UserListScreen({ navigation }) {

    return (

        <>
            <View style={styles.Container}>
                <UserList navigation={navigation}/>
            </View>

        </>

    )
}
const styles = StyleSheet.create({

    Container: {
        flex: 1,
    }

})
