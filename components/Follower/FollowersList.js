import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import {getFollowerByFollowerId, getFollowerByUserId} from '../../API/Followers/FollowersAPI';
import { useFocusEffect } from '@react-navigation/native';

const FollowersList = ({ route, navigation }) => {
    const userId = route.params.id;
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        React.useCallback(() => {
            const fetchFollowers = async () => {
                try {
                    const data = await getFollowerByUserId(userId);
                    setFollowers(data);
                } catch (error) {
                    console.error('Error fetching followers:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchFollowers();
        }, [userId])
    );


    function selectUserItemHandler(id) {
        if (id !== null) {
            navigation.navigate('UserProfile', {
                id: id,
            });
        } else {
            // Handle the case where id is null
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <ScrollView>
                    {followers.length > 0 ? (
                        followers.map((follower) => (
                            <TouchableOpacity
                                key={follower.followerId}
                                style={styles.followerItem}
                                onPress={() => selectUserItemHandler(follower.followerId)}
                            >
                                <Text>{follower.username}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyMessageContainer}>
                            <Text>No one is following you.</Text>
                        </View>
                    )}
                </ScrollView>
            )}
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
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default FollowersList;
