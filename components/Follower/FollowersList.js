import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const FollowersList = () => {
    // Dummy data for followers, replace this with your actual data
    const followersData = [
        { id: '1', username: 'follower1' },
        { id: '2', username: 'follower2' },
        // Add more followers as needed
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                {followersData.map((follower) => (
                    <View key={follower.id} style={styles.followerItem}>
                        <Text>{follower.username}</Text>
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
    followerItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default FollowersList;
