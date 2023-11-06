import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from '../MealFavoriteList/MealFavoriteItem';
import {FavoritesContext} from "../../context/favorites-context";
import {useContext} from "react";
import {Ionicons} from "@expo/vector-icons";

function MealFavoriteList({ items }) {
    const favoriteMealsCtx = useContext(FavoritesContext);

    function renderMealItem(itemData) {
        const item = itemData.item;

        const mealItemProps = {
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            affordability: item.affordability,
            duration: item.duration,
            rating: item.rating,
        };

        const removeFavoriteMealHandler = () => {
            favoriteMealsCtx.removeFavorite(item.id);
        };

        return (
            <View style={styles.mealContainer}>
                <MealItem {...mealItemProps} />
                <Ionicons
                    name={'trash'}
                    color="black"
                    size={28}
                    onPress={removeFavoriteMealHandler}
                />
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
        padding: 4,
    },
    mealContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});