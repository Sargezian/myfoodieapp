import { FlatList } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';

import { CATEGORIES } from '../data/dummydata';

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
        <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
        />
    );
}

export default CategoriesScreen;
