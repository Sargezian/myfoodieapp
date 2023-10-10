import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (

        <View style={styles.container}>
            <Ionicons name="search" color="black" size={25} style={styles.icon} />

            <TextInput
                style={styles.searchBox}
                placeholder="Search for your favorite meal..."
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 10,
        marginLeft: 8,
        marginRight: 8,
    },
    icon: {
        marginRight: 10,
    },
    searchBox: {
        flex: 1,
        height: 40,

    },
});