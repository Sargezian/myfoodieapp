import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
    Platform, ActivityIndicator, Pressable,
} from 'react-native';
import DiscoverSlider from '../DiscoverSlider/DiscoverSlider';
import { CATEGORIES, MEALS } from '../../../data/dummydata';
import { FavoritesContext } from '../../../context/favorites-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import COLORS from '../../../constants/colors';
import {getNewlyAddedDishes} from "../../../API/Dish/DishAPI";
import {getHighestRatedDish, getMostReviewedDish} from "../../../API/Review/ReviewAPI";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function OptionSlider({ route, id }) {
    const favoriteMealsCtx = useContext(FavoritesContext);
    const [selectedCategory, setSelectedCategory] = useState('popular');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    const fetchData = async (category) => {
        try {
            setLoading(true);
            let responseData = [];

            switch (category) {
                case 'popular':
                    responseData = await getMostReviewedDish();
                    break;
                case 'recommended':
                    responseData = await getHighestRatedDish();
                    break;
                case 'newlyAdded':
                    responseData = await getNewlyAddedDishes();
                    break;
                default:
                    console.error('Invalid category:', category);
                    break;
            }

            if (responseData && responseData.length > 0) {
                setData(responseData);
                const firstMealId = responseData[0].dishId ||responseData[0].id ;
                console.log('this is the meal id ' + firstMealId);
            } else {
                console.log(`${category} data is empty or not in the expected format.`);
            }
        } catch (error) {
            console.error(`Error fetching ${category} dishes:`, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedCategory);
    }, [selectedCategory]);

    function selectMealItemHandler(mealId) {
        if (mealId !== null) {
            navigation.navigate('MealDetail', {
                mealId: mealId,
            });
        } else {
            console.log('MealId is not available yet.');
        }
    }

    return (
        <View style={styles.holderContainer}>
            <ScrollView horizontal={true} style={styles.container}>
                <TouchableOpacity
                    onPress={() => setSelectedCategory('popular')}
                    style={[styles.card, selectedCategory === 'popular' && styles.selectedCard]}
                >
                    <Text style={[styles.headingText, selectedCategory === 'popular' && styles.selectedText]}>
                        Popular
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedCategory('recommended')}
                    style={[styles.card, selectedCategory === 'recommended' && styles.selectedCard]}
                >
                    <Text style={[styles.headingText, selectedCategory === 'recommended' && styles.selectedText]}>
                        Recommended
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setSelectedCategory('newlyAdded')}
                    style={[styles.card, selectedCategory === 'newlyAdded' && styles.selectedCard]}
                >
                    <Text style={[styles.headingText, selectedCategory === 'newlyAdded' && styles.selectedText]}>
                        Newly added
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.holderContainer2}>
                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    <ScrollView horizontal={true} style={styles.container2}>
                        {data.map((meal) => (
                            <Pressable
                                android_ripple={{ color: '#ccc' }}
                                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                                onPress={() => selectMealItemHandler(meal.dishId || meal.id)}>
                                <View key={meal.dishId || meal.id} style={styles.card2}>
                                    <Image source={{ uri: meal.imageURL }} style={styles.image} />

                                    <View style={styles.categoryContainer}>
                                        <Text style={styles.category}>{meal.timeEstimate} Minutes </Text>
                                    </View>

                                    <Text style={styles.title}>{meal.name}, {meal.mealType}</Text>
                                    <Text style={styles.mealInfo}>
                                        <View style={styles.cardContainer}>

                                            <View style={styles.cardLike}>
                                            </View>
                                        </View>
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

export default OptionSlider;

const styles = StyleSheet.create({
    holderContainer: {
        flex: 1,
    },

    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 12,
    },

    container: {
        padding: 4,
    },

    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },

    selectedCard: {
        borderBottomColor: 'white',
        borderBottomWidth: 2,
    },

    selectedText: {
        color: 'white',
    },

    holderContainer2: {
        flex: 1,
        padding: 10,
    },

    container2: {
        backgroundColor: COLORS.BGColor,
    },

    card2: {
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
        fontSize: windowWidth * 0.03,
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
