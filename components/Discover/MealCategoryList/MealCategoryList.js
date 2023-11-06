import { View, FlatList, StyleSheet } from 'react-native';

import MealItem from '../../MealDetail/MealItem';

function MealCategoryList({items}) {
    function renderMealItem(itemData) {
        const item = itemData.item;

        const mealItemProps = {
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            affordability: item.affordability,
            complexity: item.complexity,
            duration: item.duration,
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