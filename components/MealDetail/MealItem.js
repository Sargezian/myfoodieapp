import { View, Pressable, Text, Image, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MealDetails from './MealDetails';
import COLORS from "../../constants/colors";

function MealItem({id, name, imageUrl, time_estimate, meal_type,nutritional_content}) {

    const navigation = useNavigation();

    function selectMealItemHandler() {
        navigation.navigate('MealDetail', {
            mealId: id,
        });
    }

    return (
        <View style={styles.mealItem}>
            <Pressable
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={selectMealItemHandler}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                        <Text style={styles.title}>{name}</Text>
                    </View>
                    <MealDetails
                        time_estimate={time_estimate}
                        meal_type={meal_type}
                        nutritional_content={nutritional_content}
                        rating={"Rating: 1 out of 5"}
                        review={"Review given: 1"}
                    />
                </View>
            </Pressable>
        </View>
    );
}

export default MealItem;

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: COLORS.white,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
    },
});
