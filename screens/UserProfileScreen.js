import {Platform, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native'
import React, {useContext} from 'react'
import {Ionicons} from "@expo/vector-icons";
import COLORS from "../constants/colors";
import {FavoritesContext} from "../context/favorites-context";
import {MEALS} from "../data/dummydata";
import MealFavoriteList from "../components/MealFavoriteList/MealFavoriteList";

export default function UserProfileScreen() {


    const favoriteMealsCtx = useContext(FavoritesContext);

    const favoriteMeals = MEALS.filter((meal) =>
        favoriteMealsCtx.ids.includes(meal.id)
    );



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

            <View style={styles.FavoriteContainer}>
                <Text style={styles.FavoriteText}>Favorite Meals</Text>
                <View style={styles.FavoriteContainerText}>


                    {favoriteMeals.length === 0 ? (
                        <View style={styles.rootContainer}>
                            <Text style={styles.text}>You have no favorite meals yet.</Text>
                        </View>
                    ) : (
                        <MealFavoriteList items={favoriteMeals} />
                    )}

                </View>


            </View>


        </SafeAreaView>
    )
}
const styles = StyleSheet.create({


    Container: {
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

    FavoriteContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8,
        marginTop: 8,
    },

    FavoriteContainerText: {
        flex: 1,
    },

    FavoriteText: {

        fontWeight: 'bold',
        fontSize: 20,
    },

    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },


})
