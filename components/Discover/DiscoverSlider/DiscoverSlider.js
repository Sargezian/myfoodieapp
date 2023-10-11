import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import COLORS from "../../../constants/colors";
import React from "react";
import {MEALS} from "../../../data/dummydata";

function DiscoverSlider() {

    const mealM1 = MEALS.find((meal) => meal.id === 'm2');


    return (
        <View style={styles.holderContainer}>
            <Text style={styles.headingText}> Top made meals today! </Text>

            <ScrollView horizontal={true} style={styles.container}>


                <View style={[styles.card, styles.CardElevated]}>

                    <Image source={{ uri: mealM1.imageUrl }} style={styles.image} />

                </View>


                <View style={[styles.card, styles.CardElevated]}>

                    <Image source={{ uri: mealM1.imageUrl }} style={styles.image} />

                </View>


                <View style={[styles.card, styles.CardElevated]}>

                    <Image source={{ uri: mealM1.imageUrl }} style={styles.image} />

                </View>


                <View style={[styles.card, styles.CardElevated]}>

                    <Image source={{ uri: mealM1.imageUrl }} style={styles.image} />

                </View>



                <View style={[styles.card, styles.CardElevated]}>

                    <Image source={{ uri: mealM1.imageUrl }} style={styles.image} />

            </View>



                  <View style={[styles.card, styles.CardElevated]}>
                      <Image source={{ uri: mealM1.imageUrl }} style={styles.image} />

                  </View>

          </ScrollView>
        </View>
    )


}

export default DiscoverSlider;



const styles = StyleSheet.create({

    holderContainer: {
        flex: 1,
    },

    headingText: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingHorizontal: 8

    },
    container: {
        padding: 8
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 125,
        height: 125,
        borderRadius: 10,
        margin: 8,
    },

    CardElevated: {
        backgroundColor: COLORS.white,
        elevation: 4,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#333',
        shadowOpacity: 0.4,
        shadowRadius: 2


    },
    image: {
        width: '100%', // To make the image take the full width of the card
        height: '100%',  // Adjust the height as needed
        resizeMode: 'cover', // To ensure the image covers the entire space
        borderRadius: 10, // To give the image rounded corners (if desired)
    },
});
