import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MealItem from '../../MealDetail/MealItem';

function MealCategoryList({ items }) {


    // Check if items is an array and has a length greater than 0
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text>No items to display</Text>
            </View>
        );
    }
    function renderMealItem(itemData) {
        const item = itemData.item;

        const mealItemProps = {
            id: item.dishId, // Assuming dishId is the correct property
            name: item.name,
            imageUrl: item.imageURL,
            meal_type: item.mealType,
            time_estimate: item.timeEstimate,
            nutritional_content: item.nutritionalContent
        };
        console.log('MealItemProps:', mealItemProps)
        return <MealItem {...mealItemProps} />;
    }



    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.dishId.toString()} // Assuming dishId is the correct property
                renderItem={(itemData) => {
                    console.log('Item: ', itemData.item);
                    return renderMealItem(itemData);
                }}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
