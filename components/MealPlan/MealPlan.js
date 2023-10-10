import {View, StyleSheet, Platform, Text} from 'react-native';

function MealPlan() {
    return (

        <View style={styles.Container}>


            <View style={styles.Calender}>
                <Text>Calendar</Text>
            </View>

            <View style={styles.InnerContainer}>
                <Text style={styles.MealHeader}> Breakfast </Text>
                <View style={styles.MealContainer}>
                    <Text> MealPictures + addImage </Text>

                    <Text style={styles.MealText}> 380 kcal </Text>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <Text style={styles.MealHeader}> Lunch </Text>
                <View style={styles.MealContainer}>
                    <Text> MealPictures + addImage </Text>

                    <Text style={styles.MealText}> 420 kcal </Text>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <Text style={styles.MealHeader}> Dinner </Text>
                <View style={styles.MealContainer}>
                    <Text> MealPictures + addImage </Text>

                    <Text style={styles.MealText}> 220 kcal </Text>
                </View>
            </View>

            <View style={styles.CalorieInnerContainer}>

                <Text style={styles.CaloriesHeader}> Calories Analysis </Text>
            <View style={styles.CaloriesAnalyst}>

                <Text> Carbo </Text>

                <Text> Fat </Text>

                <Text> Protein </Text>

                <Text> Fiber </Text>

            </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

    Calender: {
        flex: 0.25,
        backgroundColor: 'grey',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 10,
        elevation: 4,
        shadowRadius: 8,
        padding: 8,
        margin: 10,

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
    },

    CalorieInnerContainer: {
        flex: 2,
        margin: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: 'orange',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },

    CaloriesAnalyst: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 20,
    },

    MealContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    CaloriesHeader: {
        fontWeight: "bold",
        fontSize: 18,
    },

    MealHeader: {
        fontWeight: "bold",
        fontSize: 18,
    },

    MealText: {
        fontWeight: "bold",
        fontSize: 18,
    }
});

export default MealPlan;