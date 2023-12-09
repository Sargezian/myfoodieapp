import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import COLORS from "../../constants/colors";
import { getUsers } from "../../API/User/UserAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserList = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const getEmailFromAsyncStorage = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            setEmail(storedEmail || ''); // Set the username state

        } catch (error) {
            console.error('Error retrieving emaiæ:', error);
        }
    };

    useEffect(() => {
        getEmailFromAsyncStorage();
    }, []);



    useEffect(() => {
        const fetchUserList = async () => {
            try {
                setLoading(true);
                const data = await getUsers();
                setUserList(data.filter(user => user.id !== email));
            } catch (error) {
                console.error('Error fetching user list:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserList();
    }, [email]);

    const filteredUserList = userList.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));

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
            <TextInput
                style={styles.searchInput}
                placeholder="Search users..."
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />
            ) : (
                <ScrollView>
                    {filteredUserList.map((user, index) => (
                        <TouchableOpacity
                            key={user.id || index}
                            style={styles.breakfastItem}
                            onPress={() => selectUserItemHandler(user.id)}
                        >
                            <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.username}>{user.username}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 8,
        padding: 8,
        borderRadius: 8,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    breakfastItem: {
        borderRadius: 40,
        marginVertical: 4,
        marginHorizontal: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        backgroundColor: '#ffebeb',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 30,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    details: {
        fontSize: 14,
        marginBottom: 4,
    },
    nutritionalContent: {
        fontSize: 12,
        color: '#555',
    },
});

export default UserList;
