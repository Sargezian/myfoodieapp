import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";

export default function UserProfile() {

    return (

        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.Container}>
                <View style={styles.profileContainer}>
                    <Ionicons name="person" color={'black'} size={95} />
                </View>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userNameText}> Username </Text>
                    <View style={styles.Follow}>
                        <Text style={styles.FollowText}>Follow</Text>
                    </View>
                </View>
            </View>



        </SafeAreaView>
    )
}
const styles = StyleSheet.create({


    Container: {
        flex: 1,
        flexDirection: 'row',
    },

    profileContainer: {
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        paddingTop: 10,
        width: 125,
        height: 125,
        borderRadius: 100,
        marginLeft: 20,
        marginTop: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

    },

    userNameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },

    userNameText: {
        fontSize: 15,
        fontWeight: 'bold',

    },


    Follow: {
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 100,
        marginTop: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

    },

    FollowText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',

    },






})
