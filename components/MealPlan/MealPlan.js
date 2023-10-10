import {View, StyleSheet, Platform, Text} from 'react-native';

function MealPlan() {
    return (

        <View style={styles.Container}>

            <View style={styles.InnerContainer}>
                <Text> Breakfast </Text>
                <View style={styles.MealContainer}>
                    <Text> MealPictures </Text>

                    <Text> 380 kcal </Text>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <Text> Lunch </Text>
                <View style={styles.MealContainer}>
                    <Text> MealPictures </Text>

                    <Text> 420 kcal </Text>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <Text> Dinner </Text>
                <View style={styles.MealContainer}>
                    <Text> MealPictures </Text>

                    <Text> 220 kcal </Text>
                </View>
            </View>

            <View style={styles.CaloriesAnalyst}>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

    InnerContainer: {
        flex: 1,
        backgroundColor: 'grey',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 10,
        elevation: 4,
        shadowRadius: 8,
        padding: 8,
        margin: 10,
        height: 50,

    },

    MealContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CaloriesAnalyst: {
        flex: 2,
        margin: 10,
        height: 50,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: 'orange',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
});

export default MealPlan;