import { View, FlatList, StyleSheet } from 'react-native';

import MealItem from '../../MealDetail/MealItem';

function MealCategoryList({items}) {
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
        return <MealItem {...mealItemProps} />;
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

export default MealCategoryList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});