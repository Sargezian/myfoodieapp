import React from 'react';
import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';

import EditRatings from './EditRatings';
import COLORS from "../../constants/colors";
import Subtitle from "../MealDetail/Subtitle";

export default function Edit() {
    return (
        <View style={styles.container}>
            <Subtitle>Edit star rating</Subtitle>
            <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                    <EditRatings />
                </View>
            </View>
            <Subtitle>Edit comment</Subtitle>
            <View style={styles.commentContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Type your comment here"
                    multiline
                />
            </View>
            <View style={styles.EnterContainer}>
                <Text style={styles.EnterSubmit}> Submit Review</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BGColor,
        padding: 16,
        alignItems: 'center',
    },
    ratingContainer: {
        flex: 0.20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        borderRadius: 20,
        elevation: 4,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentContainer: {
        flex: 0.35,
        width: '100%',
        marginVertical: 20,
        borderRadius: 20,
        elevation: 4,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

    },
    commentInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,

    },
    EnterContainer: {
        backgroundColor: 'black',
        borderRadius: 25,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },

    EnterSubmit: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 8,
    },
});
