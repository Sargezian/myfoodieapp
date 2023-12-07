import {
    View,
    Pressable,
    Text,
    Image,
    StyleSheet,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome} from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import React from "react";

function MealFavoriteItem({
                      id,
                      name,
                      imageUrl, nutritional_content,
                              time_estimate,
                              meal_type,
                      rating,
                      review
                  }) {

    const navigations = useNavigation();

    function selectMealItemHandler() {
        navigations.navigate('MealDetail', {
            mealId: id,
        });
    }


    return (
        <View style={styles.container}>

            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={selectMealItemHandler}
            >

                <View style={styles.innerContainer}>

                    <View style={styles.cardTop}>
                    <Image
                        alt=""
                        resizeMode="cover"
                        style={styles.cardImg}
                        source={{ uri: imageUrl }}
                    />
                </View>

                    <View style={styles.TextHolder}>

                        <View style={styles.opHolder}>
                            <Text style={styles.title}>{name}, {meal_type}</Text>


                        </View>

                        <Text style={styles.title}>Time: {time_estimate} Minutes</Text>



                        <View style={styles.cardFooter}>

                            <Text style={styles.cardStars}> <FontAwesome
                                color="#ea266d"
                                name="star"
                                solid={true}
                                size={12}
                                style={{ marginBottom: 2, marginHorizontal: 8, }}
                            />3 out of 5 {rating} </Text>



                        <Text style={styles.cardReviews}>{review} 10 review</Text>

                        </View>

                    </View>
                </View>
            </Pressable>


        </View>

    );
}

export default MealFavoriteItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        flex: 1,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: COLORS.white,
        elevation: 4,
        flexDirection: 'column',
        borderRadius: 10,
        height: 255,

    },

    cardTop: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardImg: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    TextHolder: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 8,
    },

    opHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        marginBottom: 4,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    cardFooter: {
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cardStars: {

        fontSize: 14,
        fontWeight: '500',
        color: '#232425',
        marginHorizontal: 2,
    },
    cardReviews: {
        fontSize: 14,
        fontWeight: '400',
        color: '#595a63',
    },
    cardFooterHolder: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

});
