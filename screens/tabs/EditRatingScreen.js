import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Edit from "../../components/Edit/Edit";

export default function EditRatingScreen() {
    return (
        <View style={styles.container}>
            <Edit/>
        </View>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1,

    }

})
