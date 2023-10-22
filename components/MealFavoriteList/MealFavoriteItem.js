import {
    View,
    Pressable,
    Text,
    Image,
    StyleSheet,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MealDetails from '../../components/MealFavoriteList/MealFavoriteDetails';

function MealFavoriteItem({
                      id,
                      title,
                      imageUrl,
                      duration,
                      complexity,
                      affordability,
                  }) {

    const navigations = useNavigation();

    function selectMealItemHandler() {
        navigations.navigate('MealDetail', {
            mealId: id,
        });
    }

    return (
        <View style={styles.container}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={selectMealItemHandler}
            >
                <View style={styles.innerContainer}>



                    <Image source={{ uri: imageUrl }} style={styles.image} />

                    <View style={styles.TextHolder}>

                        <Text style={styles.title}>{title}</Text>

                        <Text >Pasta salad mainly consists of pasta mixed with vegetables</Text>

                        <MealDetails
                            duration={duration}
                            affordability={affordability}
                            complexity={complexity}
                        />

                    </View>
                </View>
            </Pressable>
        </View>
    );
}

export default MealFavoriteItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        borderRadius: 30,
        height: 150,
    },
    image: {
        flex: 1.5,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        height: '100%',
    },

    TextHolder: {
        flex: 2,
        justifyContent: 'space-between',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 15,
    },
});
