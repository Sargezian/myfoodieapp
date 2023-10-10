import {View, StyleSheet, Text} from 'react-native';
import COLORS from "../../constants/colors";

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

                <View style={styles.CalorieHeader}>
                <Text style={styles.CaloriesText}> Calories Analysis </Text>
                    <Text> See more Detail </Text>
                </View>

            <View style={styles.CaloriesAnalyst}>

                <Text> Carbs {'\n'} chart here </Text>

                <Text> Fat {'\n'} chart here</Text>

                <Text> Protein {'\n'} chart here</Text>

                <Text> Fiber {'\n'} chart here</Text>

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
        backgroundColor: COLORS.LightColor,
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
        backgroundColor: COLORS.LightColor,
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
        backgroundColor: COLORS.LightColor,
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
        marginTop: 10,
        marginBottom: 10,
    },

    MealContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    CalorieHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },

    CaloriesText: {
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