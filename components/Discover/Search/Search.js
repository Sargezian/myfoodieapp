import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Text, Platform} from 'react-native';
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
                placeholder="Search..."
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
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        margin: 10,
    },
    icon: {
        marginRight: 10,
    },
    searchBox: {
        flex: 1,
        height: 40,

    },
});