import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const BreakfastList = () => {
    // Dummy data for followers, replace this with your actual data
    const BreakfastData = [
        { id: '1', breakfast: 'breakfast1' },
        { id: '2', breakfast: 'breakfast2' },
        // Add more followers as needed
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {BreakfastData.map((breakfast) => (
                    <View key={breakfast.id} style={styles.breakfastItem}>
                        <Text>{breakfast.breakfast}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    breakfastItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default BreakfastList;
