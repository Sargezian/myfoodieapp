import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import FollowersList from "../../components/Follower/FollowersList";

export default function FollowersListScreen({ route,navigation }) {
    return (
        <View style={styles.container}>
            <FollowersList route={route} navigation={navigation}/>
        </View>
    )
}
const styles = StyleSheet.create({


    container: {
        flex: 1,


    },

})
