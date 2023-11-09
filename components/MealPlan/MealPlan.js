import {
    View,
    StyleSheet,
    Text,
    Switch,
    ScrollView,
    Image,
    Platform,
    Dimensions,
    FlatList,
    TouchableOpacity
} from 'react-native';
import COLORS from "../../constants/colors";
import {MEALS} from "../../data/dummydata";
import {Ionicons} from "@expo/vector-icons";
import React, {useState} from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MealPlan() {

    const maxImages = 3;
    const limitedMeals = MEALS.slice(0, maxImages);

    const [isBreakfastEnabled, setBreakfastEnabled] = useState(false);
    const [isLunchEnabled, setLunchIsEnabled] = useState(false);
    const [isDinnerEnabled, setDinnerEnabled] = useState(false);
    const breakfastToggleSwitch = () => setBreakfastEnabled(previousState => !previousState);
    const lunchToggleSwitch = () => setLunchIsEnabled(previousState => !previousState);
    const dinnerToggleSwitch = () => setDinnerEnabled(previousState => !previousState);



    //date
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedText, setSelectedText] = useState('');

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);

        // Format the selected date as per your requirement
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        setSelectedText(`${formattedDate}`);
    };



    return (

        <View style={styles.Container}>


            <View style={styles.Calender}>

                <Text style={styles.dateText}>{selectedText}</Text>


                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="inline"
                    onChange={onDateChange}
                />


            </View>

            <View style={styles.InnerContainer}>

                <View style={styles.MealHeader}>
                <Text style={styles.MealHeaderText}> Breakfast </Text>
                    <Text style={styles.MealHeaderClock}> <Ionicons
                        name={'time'}
                        color="black"
                        size={20}
                    /> 05.00am-07.00am </Text>
                </View>

                <View style={styles.MealContainer}>

                    {limitedMeals.map((meal) => (
                        <View style={styles.card} key={meal.id}>
                            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
                        </View>
                    ))}


                    <View style={styles.switchTextContainer}>
                    <Switch
                        trackColor={{false: '#767577', true: 'lightgreen'}}
                        thumbColor={isBreakfastEnabled ? 'ffffff' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={breakfastToggleSwitch}
                        value={isBreakfastEnabled}
                    />
                    <Text style={styles.MealText}> 380 kcal </Text>

                    </View>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <View style={styles.MealHeader}>
                    <Text style={styles.MealHeaderText}> Lunch </Text>
                    <Text style={styles.MealHeaderClock}>  <Ionicons
                        name={'time'}
                        color="black"
                        size={20}
                    /> 12.30pm-01.00pm </Text>
                </View>
                <View style={styles.MealContainer}>

                    {limitedMeals.map((meal) => (
                        <View style={styles.card} key={meal.id}>
                            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
                        </View>
                    ))}

                    <View style={styles.switchTextContainer}>
                        <Switch
                            trackColor={{false: '#767577', true: 'lightgreen'}}
                            thumbColor={isLunchEnabled ? '#ffffff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={lunchToggleSwitch}
                            value={isLunchEnabled}
                        />
                        <Text style={styles.MealText}> 380 kcal </Text>

                    </View>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <View style={styles.MealHeader}>
                    <Text style={styles.MealHeaderText}> Dinner </Text>
                    <Text style={styles.MealHeaderClock}>  <Ionicons
                        name={'time'}
                        color="black"
                        size={20}
                    /> 06.00pm-08.00pm </Text>
                </View>
                <View style={styles.MealContainer}>

                    {limitedMeals.map((meal) => (
                        <View style={styles.card} key={meal.id}>
                            <Image source={{ uri: meal.imageUrl }} style={styles.image} />
                        </View>
                    ))}

                    <View style={styles.switchTextContainer}>
                        <Switch
                            trackColor={{false: '#767577', true: 'lightgreen'}}
                            thumbColor={isDinnerEnabled ? '#ffffff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={dinnerToggleSwitch}
                            value={isDinnerEnabled}
                        />
                        <Text style={styles.MealText}> 380 kcal </Text>

                    </View>
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
    card: {
        width: windowWidth * 0.2,
        height: windowHeight * 0.1,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: 'white',
        marginRight: -50,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 8,
    },


    Calender: {
        flex: 0.25,
        flexDirection: 'column',

        alignItems: 'center',

        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 10,
        elevation: 4,
        shadowRadius: 8,
        margin: 10,

    },


    dateText: {
        fontWeight: 'bold',
        fontSize: 15,

    },


    InnerContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        borderRadius: 20,
        elevation: 4,
        shadowRadius: 8,
        padding: 8,
        marginHorizontal: 10,
        marginVertical: 2.5,
    },

    CalorieInnerContainer: {
        flex: 2,
        margin: 10,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: COLORS.white,
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
        width: '100%',
    },

    switchTextContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: '100%',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    MealHeaderText: {
        fontWeight: "bold",
        fontSize: 18,
    },

    MealHeaderClock: {

        fontSize: 15
    },

    MealText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'yellow',
    },

    selectedText: {
        marginTop: 10,
        fontSize: 16,
        color: 'blue',
    },
});

export default MealPlan;