import React, {useEffect, useState} from 'react';
import {Alert, Platform, StyleSheet, Text, TextInput, View} from 'react-native';

import EditRatings from './EditRatings';
import COLORS from "../../constants/colors";
import Subtitle from "../MealDetail/Subtitle";
import {
    addReviewToDish,
    getReviewByUserId,
    getReviewByUserIdAndDishId,
    updateReviewByUserIdAndReviewId
} from "../../API/Review/ReviewAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
export default function Edit() {

    const [email, setEmail] = useState('');
    const [reviewId, setReviewId] = useState('');
    const [dishId, setDishId] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [reviewByUserAndDishId, setReviewByUserIdAndDishId] = useState([]);
    const [forceUpdateId, setForceUpdateId] = useState(0);
    const navigation = useNavigation();

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

    const getReviewIdFromAsyncStorage = async () => {
        try {
            const storedReviewId = await AsyncStorage.getItem('reviewId');
            setReviewId(storedReviewId || ''); // Set the username state

        } catch (error) {
            console.error('Error retrieving meal id :', error);
        }
    };

    useEffect(() => {
        getReviewIdFromAsyncStorage();
    }, []);

    const getDishIdFromAsyncStorage = async () => {
        try {
            const storedDishId = await AsyncStorage.getItem('dishId');
            setDishId(storedDishId || '');

        } catch (error) {
            console.error('Error retrieving dish id :', error);
        }
    }

    useEffect(() => {
        getDishIdFromAsyncStorage();
    }, []);

    useEffect(() => {
        const fetchReviewByUserIdAndDishId = async () => {
            try {

                const data = await getReviewByUserIdAndDishId(email,dishId);
                setReviewByUserIdAndDishId(data);
            } catch (error) {
                console.error('Error fetching reviews data:', error);
            }
        };
        fetchReviewByUserIdAndDishId();

    }, [email,dishId, forceUpdateId ]);

    const handleUpdateReview = async (rating, comment) => {
        try {
            const dateCreated = new Date().toISOString().split('T')[0];
            const reviewRating = rating || 3;

            // Check if comment is empty
            if (!comment.trim()) {
                Alert.alert('Comment Error', 'Comment is mandatory. Please enter a comment.');
                return;
            }

            await updateReviewByUserIdAndReviewId({ rating: reviewRating, comment, dateCreated }, email, reviewId);

            console.log('Review updated successfully!');
            setForceUpdateId((prevId) => prevId + 1);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating review:', error.message);
        }
    };




    return (
        <View style={styles.container}>
            <Subtitle>Edit star rating</Subtitle>
            <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                    <EditRatings ratingCompleted={(rating) => setRating(rating)}/>
                </View>
            </View>
            <Subtitle>Edit comment</Subtitle>
            <View style={styles.commentContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Type your comment here"
                    multiline
                    onChangeText={(text) => setComment(text)}
                />
            </View>

            <View style={styles.EnterContainer}>
                <Text style={styles.EnterSubmit}
                      onPress={() => {

                          handleUpdateReview(rating,comment);
                      }}

                > Submit updated Review</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BGColor,
        padding: 16,
        alignItems: 'center',
    },
    ratingContainer: {
        flex: 0.20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        borderRadius: 20,
        elevation: 4,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentContainer: {
        flex: 0.35,
        width: '100%',
        marginVertical: 20,
        borderRadius: 20,
        elevation: 4,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

    },
    commentInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,

    },
    EnterContainer: {
        backgroundColor: 'black',
        borderRadius: 25,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },

    EnterSubmit: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 8,
    },
});
