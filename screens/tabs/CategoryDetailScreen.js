import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getCategoryById } from '../../API/Dish/CategoryAPI';
import MealCategoryList from "../../components/Discover/MealCategoryList/MealCategoryList";

function CategoryDetailScreen({ route, navigation }) {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryId = route.params.categoryId;

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoryData = await getCategoryById(categoryId);
                setCategory(categoryData);
            } catch (error) {
                console.error('Error fetching category:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [categoryId]);

    useLayoutEffect(() => {
        if (!loading) {
            const categoryTitle = category[0]?.title; // Assuming category is an array with one item
            navigation.setOptions({
                title: categoryTitle,
            });
            console.log("this is the category title " + categoryTitle);
        }
    }, [categoryId, navigation, category, loading]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <MealCategoryList items={category} />;
}

export default CategoryDetailScreen;
