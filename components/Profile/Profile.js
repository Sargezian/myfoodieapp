import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Linking,
} from 'react-native';
import { AuthContext } from '../../context/auth-context';
import COLORS from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import {
    getFollowerByFollowerId,
    getFollowerByUserId,
} from '../../API/Followers/FollowersAPI';
import {getReviewByUserIdAndDishId} from "../../API/Review/ReviewAPI";

const settingsData = [
    { id: '1', title: 'Connect with Creator on Linkedin', subtitle: 'Lennart Sargezian' },
    { id: '2', title: 'Help', subtitle: 'Report technical issues or suggest new features' },
    { id: '3', title: 'Signout', subtitle: 'Signout from your account' },
    { id: '4', title: 'Dark Mode', subtitle: 'Dark Mode' },
    { id: '5', title: 'User List', subtitle: 'Find all users and see there favorite list' },
];

function Settings() {
    const AuthCxt = useContext(AuthContext);
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getEmailFromAsyncStorage = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            setEmail(storedEmail || '');
        } catch (error) {
            console.error('Error retrieving email:', error);
        }
    };

    const getUsernameFromAsyncStorage = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            setUsername(storedUsername || '');
        } catch (error) {
            console.error('Error retrieving username:', error);
        }
    };

    useEffect(() => {
        getEmailFromAsyncStorage();
        getUsernameFromAsyncStorage();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            const fetchFollowing = async () => {
                try {
                    const data = await getFollowerByFollowerId(email);
                    setFollowing(data);
                } catch (error) {
                    console.error('Error fetching following:', error);
                }
            };
            fetchFollowing();
        }, [email])
    );

    useFocusEffect(
        React.useCallback(() => {
            const fetchFollowers = async () => {
                try {
                    const data = await getFollowerByUserId(email);
                    setFollowers(data);
                } catch (error) {
                    console.error('Error fetching followers:', error);
                }
            };
            fetchFollowers();
        }, [email])
    );

    useEffect(() => {
        setLoading(false);
    }, [username, email, following, followers]);

    const handleFollowersPress = () => {
            navigation.navigate('Followers',{ id:email});


    };

    const handleFollowingsPress = () => {
        navigation.navigate('Following', { id: email });
    };

    const handleSettingsItemPress = (item) => {
        if (item.id === '1') {
            Linking.openURL('https://www.linkedin.com/in/sargezian/');
        } else if (item.id === '2') {
            sendReportEmail();
        } else if (item.id === '3') {
            AuthCxt.logout();
        } else if (item.id === '4') {
            // Handle Dark Mode
        } else if (item.id === '5') {
            navigation.navigate('UserList');
        }
    };

    function sendReportEmail() {
        MailComposer.composeAsync({
            recipients: ['279961@viauc.dk'],
            subject: 'Report',
            body: 'Hello, I would like to report the following issue:',
        })
            .then(result => {
                if (result.status === 'sent') {
                    console.log('Email sent successfully');
                } else {
                    console.warn('Failed to send email');
                }
            })
            .catch(error => console.error('Error opening email composer', error));
    }

    const renderSettingsItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.settingItem, item.style]}
            onPress={() => handleSettingsItemPress(item)}
        >
            <View>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            )}

            <View style={styles.profileContainer}>
                <View style={styles.profileImage}>
                    <Image
                        source={{
                            uri:
                                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                        }}
                        style={{ width: 100, height: 100, borderRadius: 50 }}
                    />
                </View>

                <View style={styles.nameContainer}>
                    <Text style={styles.name}> {username}</Text>
                </View>

                <View style={styles.followerContainer}>
                    <TouchableOpacity onPress={handleFollowersPress}>
                        <Text> {followers.length} followers </Text>
                    </TouchableOpacity>
                    <Text> · </Text>
                    <TouchableOpacity onPress={handleFollowingsPress}>
                        <Text> {following.length} following</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.email}>
                    <Text>Email: {email}</Text>
                </Text>
            </View>

            <View style={styles.profileIconContainer}>
                <View style={styles.itemIcon}>
                    <Ionicons name="cog" color={'black'} size={40} />
                    <Text style={styles.subtitle}>Edit Profile</Text>
                </View>

                <View style={styles.itemIcon}>
                    <Ionicons name="notifications" color={'black'} size={40} />
                    <Text style={styles.subtitle}>Notification</Text>
                </View>

                <View style={styles.itemIcon}>
                    <Ionicons name="language" color={'black'} size={40} />
                    <Text style={styles.subtitle}>Language</Text>
                </View>

            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={settingsData}
                    renderItem={renderSettingsItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.settingsList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    profileContainer: {
        flex: 0.7,
        flexDirection: 'column',
        alignItems: 'center',
    },

    profileImage: {
        flex: 3,
        marginVertical: 10,
        width: 100,
        height: 100,
        borderRadius: 75,
        overflow: 'hidden',
    },

    email: {
        flex: 1,
        marginVertical: 5,
    },

    profileIconContainer: {
        flex: 0.30,
        flexDirection: 'row',
        elevation: 4,
    },

    listContainer: {
        flex: 1,
    },

    itemIcon: {
        alignItems: 'center',
        flex: 1,
        paddingTop: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        width: 10,
        height: 90,
        borderRadius: 50,
        elevation: 4,
        backgroundColor: '#ffebeb',
        shadowColor: 'black',
        shadowOpacity: 0.10,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },

    settingsList: {
        flexGrow: 1,
    },
    settingItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // Divider line color
        padding: 16,
    },
    settingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    settingSubtitle: {
        fontSize: 14,
        color: '#666',
    },

    followerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },

    nameContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

    name: {
        fontSize: 15,
        fontWeight: 'bold',
    },


});

export default Settings;
