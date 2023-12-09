import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getFollowerByFollowerId, getFollowerByUserId } from '../../API/Followers/FollowersAPI';
import { useFocusEffect } from '@react-navigation/native';

const FollowingList = ({ route, navigation }) => {
    const userId = route.params.id;
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const data = await getFollowerByFollowerId(userId);
                setFollowing(data);
            } catch (error) {
                console.error('Error fetching followers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFollowing();
    }, [userId]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchFollowing = async () => {
                try {
                    const data = await getFollowerByFollowerId(userId);
                    setFollowing(data);
                } catch (error) {
                    console.error('Error fetching followers:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchFollowing();
        }, [userId])
    );


    function selectUserItemHandler(id) {
        if (id !== null) {
            navigation.navigate('UserProfile', {
                id: id,
            });
        } else {
            // Handle the case where ID is null, if needed
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <ScrollView>
                    {following.length > 0 ? (
                        following.map((follower) => (
                            <TouchableOpacity
                                key={follower.userId}
                                style={styles.followerItem}
                                onPress={() => selectUserItemHandler(follower.userId)}
                            >
                                <Text>{follower.username}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyMessageContainer}>
                            <Text>You are not following anybody.</Text>
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

export default FollowingList;
