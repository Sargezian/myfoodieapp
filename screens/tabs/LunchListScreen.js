import {StyleSheet, View} from 'react-native'
import React from 'react'
import LunchList from "../../components/MealTypeMeals/LunchList/LunchList";

export default function LunchListScreen({ route,navigation }) {
    return (
        <View style={styles.container}>
            <LunchList route={route} navigation={navigation}/>
        </View>

    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

})
