import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function UserProfile() {


    const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

    const handleFollowersPress = () => {
        // Navigate to FollowersListScreen.js
        navigation.navigate('Followers');
    };

    const handleFollowingsPress = () => {
        // Navigate to FollowersListScreen.js
        navigation.navigate('Following');
    };



    return (

        <SafeAreaView style={{ flex: 1 }}>

            <View style={styles.Container}>
                <View style={styles.profileContainer}>
                    <Ionicons name="person" color={'black'} size={95} />
                </View>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userNameText}> Username </Text>

                    <View style={styles.FollowerNumbersContainer}>

                        <TouchableOpacity onPress={handleFollowersPress}>
                            <Text style={styles.FollowerNumbersText}> 0 followers </Text>
                        </TouchableOpacity>
                        <Text style={styles.FollowerNumbersText}> · </Text>
                        <TouchableOpacity onPress={handleFollowingsPress}>
                            <Text style={styles.FollowerNumbersText}> 1 following</Text>
                        </TouchableOpacity>

                    </View>
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: 20,
    },

    userNameText: {
        fontSize: 18,
        fontWeight: 'bold',

    },


    Follow: {
        height: 40,
        width: 80,
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
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',

    },

    FollowerNumbersContainer: {
        flexDirection: 'row',
    },


    FollowerNumbersText: {

        fontSize: 14,
        color: 'black',

    }



})
