import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import EditRatings from './EditRatings';

export default function Edit() {
    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Rating</Text>
                <View style={styles.starsContainer}>
                    <EditRatings />
                </View>
            </View>
            <View style={styles.commentContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Type your comment here"
                    multiline
                />
                <View style={styles.EnterContainer}>
                    <Text style={styles.EnterSubmit}> Submit Review</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    ratingContainer: {
        flex: 0.20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    ratingLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentContainer: {
        flex: 0.5,

    },
    commentInput: {
        flex: 0.5,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
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
