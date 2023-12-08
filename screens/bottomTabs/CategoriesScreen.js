import {FlatList, StyleSheet, Text, View} from 'react-native';
import CategoryGridTile from '../../components/Discover/CategoryGrids/CategoryGridTile';

import { CATEGORIES } from '../../data/dummydata';
import DiscoverSlider from "../../components/Discover/DiscoverSlider/DiscoverSlider";
import Search from "../../components/Discover/Search/Search";
import OptionSlider from "../../components/Discover/OptionSlider/OptionSlider";
import {useEffect, useState} from "react";
import {getDishByType, getDishes} from "../../API/Dish/DishAPI";
import {getAllCategories} from "../../API/Dish/CategoryAPI";

function CategoriesScreen({ navigation }) {
    const [category, setCategory] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getAllCategories();
                setCategory(categories);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };
        fetchCategories();
        console.log(category)
    }, []);
    function renderCategoryItem(itemData) {
        function pressHandler() {
            navigation.navigate('CategoryDetailScreen', {
                categoryId: itemData.item.id,
            });
        }


        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onPress={pressHandler}
            />
        );
    }

    return (

        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Search />
                        <OptionSlider />


                        <Text style={styles.headingText}> Discover </Text>
                    </>
                }
                data={category}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategoryItem}
                numColumns={2}
            />
        </View>
    );
}

export default CategoriesScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        marginBottom: 10,
        marginTop: 10,

    },
});
