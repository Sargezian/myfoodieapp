import {
    View,
    Pressable,
    Text,
    Image,
    StyleSheet,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {FontAwesome} from "@expo/vector-icons";

function MealFavoriteItem({
                              id,
                              name,
                              imageUrl,
                              time_estimate,
                              meal_type,
                              rating,
                              review
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

                    <View style={styles.cardTop}>
                        <Image
                            alt=""
                            resizeMode="cover"
                            style={styles.cardImg}
                            source={{ uri: imageUrl }}
                        />
                    </View>

                    <View style={styles.TextHolder}>

                        <View style={styles.opHolder}>
                            <Text style={styles.title}>{name}, {meal_type}</Text>

                            <Text style={styles.title}>{time_estimate} Minutes</Text>
                        </View>

                        <Text >Pasta salad mainly consists of pasta mixed with vegetables</Text>

                        <View style={styles.cardFooter}>
                            <FontAwesome
                                color="#ea266d"
                                name="star"
                                solid={true}
                                size={12}
                                style={{ marginBottom: 2 }}
                            />

                            <Text style={styles.cardStars}>{rating}</Text>


                            <Text style={styles.cardReviews}>{review} review</Text>


                        </View>

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
        flex: 1,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        elevation: 4,

        flexDirection: 'column',
        borderRadius: 10,
        height: 255,
    },

    cardTop: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardImg: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    TextHolder: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 8,
    },

    opHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        marginBottom: 4,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    cardFooter: {
        marginVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    cardStars: {
        marginLeft: 2,
        marginRight: 6,
        fontSize: 14,
        fontWeight: '500',
        color: '#232425',
    },
    cardReviews: {
        fontSize: 14,
        fontWeight: '400',
        color: '#595a63',
    },
    cardFooterHolder: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

});
