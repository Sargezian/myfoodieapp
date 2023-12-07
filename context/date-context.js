import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";

const [date, setDate] = useState('');

const getDateFromAsyncStorage = async () => {
    try {
        const storedDate = await AsyncStorage.getItem('date');
        setDate(storedDate || '');
    } catch (error) {
        console.error('Error retrieving Date:', error);
    }
};