import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from '../UserProfile/MealFavoriteItem'
import {FavoritesContext} from "../../context/favorites-context";
import {useContext} from "react";
import {FontAwesome, Ionicons} from "@expo/vector-icons";

function MealFavoriteList({ items }) {

    const favoriteMealsCtx = useContext(FavoritesContext);


    function renderMealItem(itemData) {
        const item = itemData.item;

        const mealItemProps = {
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            meal_type: item.meal_type,
            time_estimate: item.time_estimate,
            rating: item.rating,
            review: item.review,
        };

        const removeFavoriteMealHandler = () => {
            favoriteMealsCtx.removeFavorite(item.id);
        };

        return (
            <View style={styles.card}>
                <MealItem {...mealItemProps} />

            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={renderMealItem}
            />
        </View>
    );
}

export default MealFavoriteList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mealContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    card: {
        position: 'relative',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },


});