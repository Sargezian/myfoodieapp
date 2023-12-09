import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import FollowingList from "../../components/Follower/FollowingList";

export default function FollowingListScreen({ route, navigation }) {
    return (
        <View style={styles.container}>
            <FollowingList route={route} navigation={navigation}/>
        </View>
    )
}
const styles = StyleSheet.create({


    container: {
        flex: 1,


    },

})
