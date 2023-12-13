import {StyleSheet, View} from 'react-native'
import React from 'react'
import DinnerList from "../../components/MealTypeMeals/DinnerList/DinnerList";

export default function DinnerListScreen({ route,navigation }) {
    return (
        <View style={styles.container}>
            <DinnerList route={route} navigation={navigation}/>
        </View>

    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

})
