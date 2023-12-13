import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import BreakfastList from "../../components/MealTypeMeals/BreakfastList/BreakfastList";

export default function BreakFastListScreen({ route,navigation }) {
    return (
        <View style={styles.container}>
            <BreakfastList route={route} navigation={navigation}/>
        </View>

    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,


    },

})
