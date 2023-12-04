import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

function Button({ children, onPress }) {
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'grey',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
