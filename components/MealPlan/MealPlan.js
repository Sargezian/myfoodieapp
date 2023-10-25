import {View, StyleSheet, Text, ScrollView, Image, Platform, Dimensions, FlatList} from 'react-native';
import COLORS from "../../constants/colors";
import {MEALS} from "../../data/dummydata";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MealPlan() {

    const maxImages = 4;
    const limitedMeals = MEALS.slice(0, maxImages);


    return (

        <View style={styles.Container}>


            <View style={styles.Calender}>
                <Text>Calendar</Text>
            </View>

            <View style={styles.InnerContainer}>

                <View style={styles.MealHeader}>
                <Text style={styles.MealHeaderText}> Breakfast </Text>
                    <Text style={styles.MealHeaderClock}> <Ionicons
                        name={'time'}
                        color="black"
                        size={20}
                    /> 05.00am-07.00am </Text>
                </View>

                <View style={styles.MealContainer}>

                    {limitedMeals.map((meal) => (
                        <View style={styles.card} key={meal.id}>
                            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
                        </View>
                    ))}

                    <Text style={styles.MealText}> 380 kcal </Text>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <View style={styles.MealHeader}>
                    <Text style={styles.MealHeaderText}> Lunch </Text>
                    <Text style={styles.MealHeaderClock}>  <Ionicons
                        name={'time'}
                        color="black"
                        size={20}
                    /> 12.30pm-01.00pm </Text>
                </View>
                <View style={styles.MealContainer}>

                    {limitedMeals.map((meal) => (
                        <View style={styles.card} key={meal.id}>
                            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
                        </View>
                    ))}

                    <Text style={styles.MealText}> 380 kcal </Text>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <View style={styles.MealHeader}>
                    <Text style={styles.MealHeaderText}> Dinner </Text>
                    <Text style={styles.MealHeaderClock}>  <Ionicons
                        name={'time'}
                        color="black"
                        size={20}
                    /> 06.00pm-08.00pm </Text>
                </View>
                <View style={styles.MealContainer}>

                    {limitedMeals.map((meal) => (
                        <View style={styles.card} key={meal.id}>
                            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
                        </View>
                    ))}

                    <Text style={styles.MealText}> 380 kcal </Text>
                </View>
            </View>

            <View style={styles.CalorieInnerContainer}>

                <View style={styles.CalorieHeader}>
                <Text style={styles.CaloriesText}> Calories Analysis </Text>
                    <Text> See more Detail </Text>
                </View>

            <View style={styles.CaloriesAnalyst}>

                <Text> Carbs {'\n'} chart here </Text>

                <Text> Fat {'\n'} chart here</Text>

                <Text> Protein {'\n'} chart here</Text>

                <Text> Fiber {'\n'} chart here</Text>

            </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    card: {
        width: windowWidth * 0.2,
        height: windowHeight * 0.1,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        marginRight: -50,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 8,
    },
    Calender: {
        flex: 0.25,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 10,
        elevation: 4,
        shadowRadius: 8,
        padding: 8,
        margin: 10,

    },

    InnerContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 20,
        elevation: 4,
        shadowRadius: 8,
        padding: 8,
        marginHorizontal: 10,
        marginVertical: 2.5,
    },

    CalorieInnerContainer: {
        flex: 2,
        margin: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },

    CaloriesAnalyst: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },

    MealContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },


    CalorieHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    CaloriesText: {
        fontWeight: "bold",
        fontSize: 18,
    },

    MealHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    MealHeaderText: {
        fontWeight: "bold",
        fontSize: 18,
    },

    MealHeaderClock: {

        fontSize: 15
    },

    MealText: {
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 120,
        marginTop: 30,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'yellow',
    },
});

export default MealPlan;