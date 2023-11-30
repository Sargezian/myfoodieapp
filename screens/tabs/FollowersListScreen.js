import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import FollowersList from "../../components/Follower/FollowersList";

export default function FollowersListScreen() {
    return (
        <View style={styles.container}>
            <FollowersList/>
        </View>
    )
}
const styles = StyleSheet.create({


    container: {
        flex: 1,


    },

})
