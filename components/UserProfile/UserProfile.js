import {Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getUserById } from "../../API/User/UserAPI";
import {
    addFollower,
    getFollowerByFollowerId,
    getFollowerByUserId, getFollowersCountByUserId, getFollowingCountByUserId,
    removeFollowerByFollowerIdAndUserId
} from "../../API/Followers/FollowersAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfile({ userId }) {
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingCount, setFollowingCount] = useState(0);
    const [followersCount, setFollowersCount] = useState(0);

    const getEmailFromAsyncStorage = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            setEmail(storedEmail || ''); // Set the username state
        } catch (error) {
            console.error('Error retrieving email:', error);
        }
    };

    useEffect(() => {
        getEmailFromAsyncStorage();
    }, []);

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const data = await getUserById(userId);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user list:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserById();
    }, [userId]);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const data = await getFollowerByUserId(userData.id);
                setFollowers(data);
            } catch (error) {
                console.error('Error fetching followers:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFollowers();
    }, [userData]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const data = await getFollowerByFollowerId(email);
                setFollowing(data);
            } catch (error) {
                console.error('Error fetching followers:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFollowing();
    }, [userData]);

    useEffect (() => {
        const fetchFollowingCount = async () => {
            try {
                const data = await getFollowingCountByUserId(userData.id);
                setFollowingCount(data);
            } catch (error) {
                console.error('Error fetching followers:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFollowingCount();
    } , [userData,isFollowing]);

    useEffect (() => {
        const fetchFollowersCount = async () => {
            try {
                const data = await getFollowersCountByUserId(userData.id);
                setFollowersCount(data);
            } catch (error) {
                console.error('Error fetching followers:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFollowersCount();
    } , [userData,isFollowing]);

    useEffect(() => {
        if (Object.keys(userData).length > 0 && following.length > 0) {
            setIsFollowing(following.some((follower) => follower.userId === userData.id));
            console.log(followers.length)
        }
    }, [userData, following]);

    const navigation = useNavigation();

    const handleFollowersPress = (id) => {
        if (id !== null && id !== undefined){
            navigation.navigate('Followers', { id: id });
            console.log(id)
        }
    };

    const handleFollowingsPress = (id) => {
        if (id !== null     && id !== undefined){
            navigation.navigate('Following', { id: id });
            console.log(id)
        }
    };
    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                // Unfollow
                await removeFollowerByFollowerIdAndUserId(email, userData.id);
                setFollowing((prevFollowing) =>
                    prevFollowing.filter((follower) => follower.userId !== userData.id)
                );
            } else {
                // Follow
                await addFollower(email, userData.id, new Date().toISOString());
                setFollowing((prevFollowing) => [
                    ...prevFollowing,
                    { followerId: email, userId: userData.id },
                ]);
            }

            setIsFollowing((prevIsFollowing) => !prevIsFollowing);
        } catch (error) {
            console.error('Error toggling follow:', error);
            Alert.alert('Error', 'Failed to toggle follow status. Please try again.');
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
            ) : (
                <View style={styles.Container}>
                    <View style={styles.profileContainer}>
                        <Ionicons name="person" color={'black'} size={95} />
                    </View>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userNameText}>{userData.username}</Text>
                        <View style={styles.FollowerNumbersContainer}>
                            <TouchableOpacity onPress={() => handleFollowersPress(userData.id)}>
                                <Text style={styles.FollowerNumbersText}>{followersCount} followers</Text>
                            </TouchableOpacity>
                            <Text style={styles.FollowerNumbersText}> · </Text>
                            <TouchableOpacity onPress={() => handleFollowingsPress(userData.id)}>
                                <Text style={styles.FollowerNumbersText}>{followingCount} following</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.Follow} onPress={handleFollowToggle}>
                            <Text style={styles.FollowText}>{isFollowing ? 'Unfollow' : 'Follow'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        paddingTop: 10,
        width: 125,
        height: 125,
        borderRadius: 100,
        marginLeft: 20,
        marginTop: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    userNameContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    userNameText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    Follow: {
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 100,
        marginTop: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    FollowText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    FollowerNumbersContainer: {
        flexDirection: 'row',
    },
    FollowerNumbersText: {
        fontSize: 14,
        color: 'black',
    },
});
