import { useLayoutEffect } from 'react';
import { MEALS, CATEGORIES } from '../data/dummydata';
import MealCategoryList from "../components/Discover/MealCategoryList/MealCategoryList";

function CategoryDetailScreen({ route, navigation }) {
    const categoryId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(categoryId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find(
            (category) => category.id === categoryId
        ).title;

        navigation.setOptions({
            title: categoryTitle,
        });
    }, [categoryId, navigation]);
    return <MealCategoryList items={displayedMeals}/>
}

export default CategoryDetailScreen;