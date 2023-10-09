import { View, FlatList, StyleSheet } from 'react-native';

import MealItem from '../../components/MealCategoryList/MealItem';
import {useContext} from "react";
import {FavoritesContext} from "../../context/favorites-context";
import IconButton from "../LoginAuth/LoginUI/IconButton";
import {MEALS} from "../../data/dummydata";

function MealFavoriteList({ items }) {
    const favoriteMealsCtx = useContext(FavoritesContext);

    function renderMealItem(itemData) {
        const item = itemData.item;

        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            affordability: item.affordability,
            complexity: item.complexity,
            duration: item.duration,
        };

        const removeFavoriteMealHandler = () => {
                favoriteMealsCtx.removeFavorite(item.id);
        };

        return (
            <View style={styles.mealContainer}>
                <MealItem {...mealItemProps} />
                <IconButton
                    icon={'trash'}
                    color="black"
                    size={28}// Change the color as needed
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
        padding: 16,
    },
    mealContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});