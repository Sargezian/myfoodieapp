import React, {useContext} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import {AuthContext} from "../../context/auth-context";
import COLORS from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";

const settingsData = [
    { id: '1', title: 'Connect with Creators on Linkedin', subtitle: 'Lennart Sargezian \n\nAbdullahi Isse' },
    { id: '2', title: 'Notification Settings', subtitle: 'Customize notification preferences' },
    { id: '3', title: 'Help', subtitle: 'Report technical issues or suggest new features' },
    { id: '4', title: 'Signout', subtitle: 'Signout from you re account' },

    // Add more settings options with titles and subtitles
];



function Settings() {

    const AuthCxt = useContext(AuthContext);

    const handleSettingsItemPress = (item) => {
        console.log(`Selected: ${item.title}`);
        // You can add navigation logic here to navigate to specific settings screens

        if (item.id === '1') {

        }

        else if (item.id === '2') {

        }

        else if (item.id === '3') {

        }

        else if (item.id === '4') {
            AuthCxt.logout();
        }
        else {
            // You can add navigation logic here for other items
        }

    };

    function sendReportEmail() {



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

                <Text style={styles.name}>

                    <Text> Name + 0 followers + 1 following</Text>

                </Text>

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

    name: {
        flex: 1,
        marginVertical: 5,
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
        justifyContent: 'center',
        flex: 1,
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

    subtitle: {
        flex: 1,

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
});

export default Settings;
