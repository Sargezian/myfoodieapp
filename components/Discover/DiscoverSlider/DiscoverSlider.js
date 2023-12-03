import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions, Pressable, Platform, TouchableOpacity,
} from 'react-native';
import { MEALS } from '../../../data/dummydata';
import { CATEGORIES } from '../../../data/dummydata';
import Button from '../DiscoverSlider/Button';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import { FavoritesContext } from '../../../context/favorites-context';
import {useNavigation} from "@react-navigation/native";
import COLORS from "../../../constants/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function getCategoryTitle(categoryIds) {
    const categoryTitles = categoryIds.map((categoryId) => {
        const category = CATEGORIES.find((cat) => cat.id === categoryId);
        return category ? category.title : 'Unknown Category';
    });

    return categoryTitles.join(', ');
}

function DiscoverSlider({ route,  id}) {
    const favoriteMealsCtx = useContext(FavoritesContext);


    const mealId = route?.params?.mealId;

    const [isFavorite, setIsFavorite] = useState(favoriteMealsCtx.ids.includes(mealId));

    function changeFavoriteStatusHandler(mealId) {
        // Toggle the favorite status for the selected meal
        if (favoriteMealsCtx.ids.includes(mealId)) {
            favoriteMealsCtx.removeFavorite(mealId);
        } else {
            favoriteMealsCtx.addFavorite(mealId);
        }
    }

    useEffect(() => {
        // Update isFavorite state when favoriteMealsCtx.ids changes
        setIsFavorite(favoriteMealsCtx.ids.includes(mealId));
    }, [mealId, favoriteMealsCtx.ids]);

    const navigation = useNavigation();



    return (
        <View style={styles.holderContainer}>
            <ScrollView horizontal={true} style={styles.container}>
                {MEALS.map((meal) => (
                    <View key={meal.id} style={styles.card}>
                        <Image source={{ uri: meal.imageUrl }} style={styles.image} />

                        <View style={styles.categoryContainer}>
                            <Text style={styles.category}>{getCategoryTitle(meal.categoryIds)}  </Text>
                            <Text style={styles.category}>{meal.time_estimate} Minutes  </Text>
                        </View>

                        <Text style={styles.title}>{meal.name}, {meal.meal_type}</Text>
                        <Text style={styles.mealInfo}>
                            <View style={styles.cardContainer}>
                            <FontAwesome
                                color="#ea266d"
                                name="star"
                                solid={true}
                                size={12}
                                style={{ marginBottom: 2 }}
                            />
                            <Text style={styles.cardStars}> {meal.rating}</Text>
                            <Text style={styles.cardReviews}> {meal.review} review</Text>

                                <View style={styles.cardLike}>
                            <TouchableOpacity
                                onPress={() => {
                                    changeFavoriteStatusHandler(meal.id)}
                                }>

                            <FontAwesome
                                name={'heart'}
                                color={'#ea266d' }
                                size={22}
                            />

                            </TouchableOpacity>
                                </View>
                            </View>


                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}


export default DiscoverSlider;

const styles = StyleSheet.create({
    holderContainer: {
        flex: 1,
        padding: 10,
    },
    container: {
        backgroundColor: COLORS.BGColor,
    },
    card: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: windowWidth * 0.50,
        height: windowHeight * 0.25,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        margin: 8,
        backgroundColor: 'white',

    },
    CardElevated: {
        marginRight: 5,
        marginLeft: 5,

    },
    image: {
        flex: 3,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    category: {
        marginTop: 5,
        fontSize: windowWidth * 0.03,
    },
    title: {
        marginTop: 5,
        fontSize: windowWidth * 0.04, // Responsive font size
        fontWeight: 'bold',
        paddingHorizontal: 5,
    },
    mealInfo: {
        marginTop: 5,
        fontSize: windowWidth * 0.03,
    },
    underCardHolder: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 5,
        justifyContent: 'space-between',

    },
    categoryContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },

    cardStars: {
        marginLeft: 2,
        marginRight: 6,
        fontSize: 14,
        fontWeight: '500',
        color: '#232425',
    },
    cardReviews: {
        fontSize: 14,
        fontWeight: '400',
        color: '#595a63',
    },

    cardContainer: {
        flexDirection: 'row',
        width: '100%',
        padding: 5,

    },

    cardLike: {
        marginLeft: 30,

    },

});