import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import FollowingList from "../../components/Follower/FollowingList";

export default function FollowingListScreen() {
    return (
        <View style={styles.container}>
            <FollowingList/>
        </View>
    )
}
const styles = StyleSheet.create({


    container: {
        flex: 1,


    },

})
