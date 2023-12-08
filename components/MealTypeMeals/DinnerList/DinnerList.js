import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Platform} from 'react-native';
import { getDishByType } from '../../../API/Dish/DishAPI';
import COLORS from "../../../constants/colors";
import { addDishToCalendar } from '../../../API/MealPlan/MealPlanAPI'; // Update the import path accordingly
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDate} from "../../../context/date-context"; // Update the import path accordingly


const DinnerList = () => {
    const [dinnerData, setDinnerData] = useState([]);
    const [email, setEmail] = useState('');
    const { selectedDate, setNewDate } = useDate();


    useEffect(() => {
        const fetchDishByType = async () => {
            try {
                const data = await getDishByType('dinner');
                setDinnerData(data);
            } catch (error) {
                console.error('Error fetching breakfast data:', error);
            }
        };

        fetchDishByType();
    }, []);

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


    const handleAddToCalendar = async (dishId) => {
        try {

            const userId = email;

            const currentDateSelected = selectedDate.toString();

            await addDishToCalendar(userId, dishId, currentDateSelected);

        } catch (error) {
            console.error('Error adding dish to calendar:', error.message);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                {dinnerData.map((dinner, index) => (
                    <View key={dinner.id || index} style={styles.breakfastItem}>
                        <Image source={{ uri: dinner.imageURL }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.dishName}>{dinner.name}</Text>
                            <Text style={styles.details}>Time: {dinner.timeEstimate} Minutes</Text>
                            <Text style={styles.details}>Nutritional Content:</Text>
                            <Text style={styles.nutritionalContent}>{dinner.nutritionalContent}</Text>
                        </View>
                        <View style={styles.TopRightContainer}>
                            <Text
                                style={styles.addSymbol}
                                onPress={() => {
                                    handleAddToCalendar(dinner.id);
                                }}
                            >
                                +
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    breakfastItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row', // Align image and text horizontally
        alignItems: 'center', // Center items vertically
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

    TopRightContainer: {
        width: 40,
        height: 40,
        borderRadius: 60,
        backgroundColor: COLORS.darkMainColor,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    addSymbol: {
        fontSize: 22,
        fontWeight: 'bold'
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

export default DinnerList;
