import {FlatList, StyleSheet, Text, View} from 'react-native';
import CategoryGridTile from '../../components/Discover/CategoryGrids/CategoryGridTile';

import { CATEGORIES } from '../../data/dummydata';
import DiscoverSlider from "../../components/Discover/DiscoverSlider/DiscoverSlider";
import Search from "../../components/Discover/Search/Search";
import OptionSlider from "../../components/Discover/OptionSlider/OptionSlider";

function CategoriesScreen({ navigation }) {

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
                        <DiscoverSlider />

                        <Text style={styles.headingText}> Discover </Text>
                    </>
                }
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
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
