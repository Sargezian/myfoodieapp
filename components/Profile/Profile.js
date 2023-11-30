import React, {useContext} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, Platform, Linking} from 'react-native';
import {AuthContext} from "../../context/auth-context";
import COLORS from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import * as MailComposer from 'expo-mail-composer';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from "@react-navigation/native";



const settingsData = [
    { id: '1', title: 'Connect with Creator on Linkedin', subtitle: 'Lennart Sargezian' },
    { id: '2', title: 'Help', subtitle: 'Report technical issues or suggest new features' },
    { id: '3', title: 'Signout', subtitle: 'Signout from you re account' },
    { id: '4', title: 'Dark Mode', subtitle: 'Dark Mode' },
    { id: '5', title: 'userprofile', subtitle: 'user' },

    // Add more settings options with titles and subtitles
];

function Settings() {

    const AuthCxt = useContext(AuthContext);
    const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

    const handleFollowersPress = () => {
        // Navigate to FollowersListScreen.js
        navigation.navigate('Followers');
    };

    const handleFollowingsPress = () => {
        // Navigate to FollowersListScreen.js
        navigation.navigate('Following');
    };


    const handleSettingsItemPress = (item) => {
        console.log(`Selected: ${item.title}`);
        // You can add navigation logic here to navigate to specific settings screens

        if (item.id === '1') {
            Linking.openURL('https://www.linkedin.com/in/sargezian/');
        }

        else if (item.id === '2') {
            sendReportEmail();
        }

        else if (item.id === '3') {
            AuthCxt.logout();
        }
        else if (item.id === '4') {

        }
        else if (item.id === '5') {
            navigation.navigate('UserProfile');
        }

        else {
            // You can add navigation logic here for other items
        }

    };

    function sendReportEmail() {
        // Use MailComposer to open the email composer with a pre-filled email address
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
            style={[styles.settingItem, item.style]} // Apply custom styles if provided
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


            <View style={styles.profileContainer}>

                <View style={styles.profileImage}>

                    <Text> ProfileImage</Text>

                </View>

                <View style={styles.nameContainer}>

                    <Text style={styles.name}> Username</Text>

                </View>

                <View style={styles.followerContainer}>

                    <TouchableOpacity onPress={handleFollowersPress}>
                        <Text> 0 followers </Text>
                    </TouchableOpacity>
                    <Text> · </Text>
                    <TouchableOpacity onPress={handleFollowingsPress}>
                        <Text> 1 following</Text>
                    </TouchableOpacity>

                </View>


                <Text style={styles.email}>

                    <Text> Email</Text>

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
        flex: 5,
        marginVertical: 10,
        width: 150,
        height: 70,
        borderRadius: 75,
        elevation: 4,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    email: {
        flex: 1,
        marginVertical: 5,
    },


    profileIconContainer: {
        flex: 0.30,
        flexDirection: 'row',
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
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
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
