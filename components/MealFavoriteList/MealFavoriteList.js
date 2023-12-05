import {FontAwesome} from "@expo/vector-icons";
import {FavoritesContext} from "../../context/favorites-context";
import {useContext} from "react";
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from '../MealFavoriteList/MealFavoriteItem';

function MealFavoriteList({ items }) {
    const favoriteMealsCtx = useContext(FavoritesContext);
    function renderMealItem(itemData) {
        const item = itemData.item;

        const mealItemProps = {
            id: item.dishId,
            name: item.name,
            imageUrl: item.imageURL,
            meal_type: item.mealType,
            time_estimate: item.timeEstimate,
            rating: item.rating,
            review: item.review,
        };
        const removeFavoriteMealHandler = () => {
            favoriteMealsCtx.removeFavorite(item.userId, item.dishId);
        };
        return (
            <View style={styles.card}>
                <MealItem {...mealItemProps} />
                    <View style={styles.cardLikeWrapper}>

                        <View style={styles.cardLike}>
                            <FontAwesome
                                color={'black'}
                                name="trash"
                                solid={'black'}
                                size={22}
                                onPress={removeFavoriteMealHandler}
                            />
                        </View>

                    </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.dishId}
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

    cardLike: {
        width: 48,
        height: 48,
        borderRadius: 9999,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLikeWrapper: {
        position: 'absolute',
        zIndex: 1,
        top: 12,
        right: 12,
    },

});