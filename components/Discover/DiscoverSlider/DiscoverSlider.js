import React, { useContext, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions, Pressable, Platform,
} from 'react-native';
import { MEALS } from '../../../data/dummydata';
import { CATEGORIES } from '../../../data/dummydata';
import Button from '../DiscoverSlider/Button';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../../../context/favorites-context';
import {useNavigation} from "@react-navigation/native";

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

    useEffect(() => {
        setIsFavorite(favoriteMealsCtx.ids.includes(mealId));
    }, [mealId, favoriteMealsCtx.ids]);

    function changeFavoriteStatusHandler(mealId) {

        // Toggle the favorite status for the selected meal
        if (favoriteMealsCtx.ids.includes(mealId)) {
            favoriteMealsCtx.removeFavorite(mealId);

        } else {
            favoriteMealsCtx.addFavorite(mealId);

        }
    }

    const navigation = useNavigation();

    function selectMealItemHandler() {
        navigation.navigate('MealDetail', {
            mealId: id,
        });
    }

    return (
        <View style={styles.holderContainer}>
            <ScrollView horizontal={true} style={styles.container}>
                {MEALS.map((meal) => (
                    <View key={meal.id} style={styles.card}>
                        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
                        <Text style={styles.category}>{getCategoryTitle(meal.categoryIds)}</Text>
                        <Text style={styles.title}>{meal.name}</Text>
                        <Text style={styles.mealInfo}>
                            {meal.duration}m | {meal.complexity} | {meal.affordability} | Rating: {meal.rating}
                        </Text>
                        <View style={styles.underCardHolder}>
                            <Ionicons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                color="black"
                                size={30}
                                onPress={() => changeFavoriteStatusHandler(meal.id)}
                            />

                            <Button onPress={selectMealItemHandler}>View Recipe</Button>

                        </View>
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
        backgroundColor: 'white',

    },
    card: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: windowWidth * 0.7,
        height: windowHeight * 0.4,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        margin: 8,
        padding: 20,
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
        borderRadius: 10,
    },
    category: {
        marginTop: 5,
        fontSize: windowWidth * 0.03,
    },
    title: {
        marginTop: 5,
        fontSize: windowWidth * 0.04, // Responsive font size
        fontWeight: 'bold',
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

});