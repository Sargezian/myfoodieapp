import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Platform,
    ActivityIndicator,
    FlatList,
    TouchableWithoutFeedback,
    Image,
    Keyboard, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function Search() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();


    const fetchDishes = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:8181/api/dish?${searchQuery}`);
            const json = await response.json();
            setData(json);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        setIsLoading(true);
        fetchDishes();
    }, []);

    useEffect(() => {
        const results = data.filter((dish) =>
            dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(results);
    } , [data,searchQuery]);

    const handleSearch = (query) => {
        const formattedQuery = query.toLowerCase();
        setSearchQuery(formattedQuery);

    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    function selectMealItemHandler(mealId) {
        if (mealId !== null) {
            navigation.navigate('MealDetail', {
                mealId: mealId,
            });
        } else {
        }
    }
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" color="black" size={25} style={styles.icon} />
                    <TextInput
                        style={styles.searchBox}
                        placeholder="Search..."
                        clearButtonMode={'always'}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={searchQuery}
                        onChangeText={(query) => handleSearch(query)}
                    />
                </View>
                {searchQuery ? (
                    <FlatList
                        style={styles.listContainer}
                        data={filteredData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => selectMealItemHandler(item.id)}
                                style={styles.itemContainer}
                            >
                                <Image source={{ uri: item.imageURL }} style={styles.image} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.dishName}>{item.name}</Text>
                                    <Text style={styles.details}>Time: {item.timeEstimate} Minutes</Text>
                                    <Text style={styles.details}>Nutritional Content:</Text>
                                    <Text style={styles.nutritionalContent}>{item.nutritionalContent}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : null}
                {isLoading && !searchQuery && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}
                {error && !searchQuery && (
                    <View style={styles.loadingContainer}>
                        <Text>Error: {error.message}</Text>
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffebeb',
        padding: 4,
        borderRadius: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

    },
    itemContainer: {
        flexDirection: 'row', // Adjust the direction as needed
        alignItems: 'center',
        backgroundColor: '#ffebeb',
        paddingHorizontal: 10,
        paddingVertical: 8, // Add vertical padding for spacing
        borderRadius: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        marginVertical: 6, // Add vertical margin for spacing

    },
    icon: {
        marginRight: 10,
    },
    searchBox: {
        flex: 1,
        height: 40,
    },
    listContainer: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    dishName: {
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
