import {StyleSheet, View} from 'react-native'
import React from 'react'
import LunchList from "../../components/MealTypeMeals/LunchList/LunchList";

export default function LunchListScreen() {
    return (
        <View style={styles.container}>
            <LunchList/>
        </View>

    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

})
