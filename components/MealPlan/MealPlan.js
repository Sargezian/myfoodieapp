import {
    View,
    StyleSheet,
    Text,
    Switch,
    Image,
    Platform,
    Dimensions, TouchableOpacity,
} from 'react-native';
import COLORS from "../../constants/colors";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import DatePicker from "./DatePicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useDate} from "../../context/date-context";
import {getReviewByUserIdAndDishId} from "../../API/Review/ReviewAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCalendarByUserIdAndDate} from "../../API/MealPlan/MealPlanAPI";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MealPlan() {

    const [isBreakfastEnabled, setBreakfastEnabled] = useState(false);
    const [isLunchEnabled, setLunchIsEnabled] = useState(false);
    const [isDinnerEnabled, setDinnerEnabled] = useState(false);
    const breakfastToggleSwitch = () => setBreakfastEnabled(previousState => !previousState);
    const lunchToggleSwitch = () => setLunchIsEnabled(previousState => !previousState);
    const dinnerToggleSwitch = () => setDinnerEnabled(previousState => !previousState);

    const [calendarByUserIdAndDate, setCalendarByUserIdAndDate] = useState([]);
    const [email, setEmail] = useState('');
    const { selectedDate, setNewDate } = useDate();

    const [calendarDataFetched, setCalendarDataFetched] = useState(false);

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

    const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

    const handleBreakFastListPress = () => {
        navigation.navigate('BreakFastList');
    };

    const handleLunchListPress = () => {
        navigation.navigate('LunchList');
    };


    const handleDinnerListPress = () => {
        navigation.navigate('DinnerList');
    };

    const getEmailFromAsyncStorage = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('email');
            setEmail(storedEmail || ''); // Set the username state

        } catch (error) {
            console.error('Error retrieving emaiæ:', error);
        }
    };

    useEffect(() => {
        getEmailFromAsyncStorage();
    }, []);



    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    const userId = email;
                    const date = selectedDate.toString();

                    console.log(userId, date)

                    const data = await getCalendarByUserIdAndDate(userId, date);
                    setCalendarByUserIdAndDate(data);
                    setCalendarDataFetched(true); // Update the state to indicate data has been fetched
                } catch (error) {
                    console.error('Error fetching Calendar data:', error);
                }
            };

            fetchData();
        }, [email, selectedDate]) // Include email and selectedDate in the dependencies array
    );



    return (

        <View style={styles.Container}>

            <View style={styles.CalendarContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Manage {'\n'}your meals <Icon name="pencil-alt" size={30} color='#000' /></Text>
                </View>

                <DatePicker onDateChange={onDateChange} />

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

                   {/* <View style={styles.cardImg} >

                        <Text style={styles.addSignImg}> + </Text>

                    </View>*/}

                    {/* Check if calendarByUserIdAndDate is an array before mapping */}
                    {calendarDataFetched && Array.isArray(calendarByUserIdAndDate) && calendarByUserIdAndDate.map((calendarData) => (
                        <View key={calendarData.id} style={styles.cardForDishes}>
                            <Image source={{ uri: calendarData.imageURL }} style={styles.calendarImage} />
                        </View>
                    ))}

                    <View style={styles.card} >
                        <TouchableOpacity onPress={handleBreakFastListPress}>
                        <Text style={styles.addSign}> + </Text>
                         </TouchableOpacity>
                    </View>

                    <View style={styles.switchTextContainer}>
                    <Switch
                        trackColor={{false: '#767577', true: COLORS.darkMainColor}}
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


                    {/* Check if calendarByUserIdAndDate is an array before mapping */}
                    {calendarDataFetched && Array.isArray(calendarByUserIdAndDate) && calendarByUserIdAndDate.map((calendarData) => (
                        <View key={calendarData.id} style={styles.cardForDishes}>
                            <Image source={{ uri: calendarData.imageURL }} style={styles.calendarImage} />
                        </View>
                    ))}

                        <View style={styles.card}>

                            <TouchableOpacity onPress={handleLunchListPress}>
                            <Text style={styles.addSign}> + </Text>
                            </TouchableOpacity>
                        </View>


                    <View style={styles.switchTextContainer}>
                        <Switch
                            trackColor={{false: '#767577', true: COLORS.darkMainColor}}
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


                    {/* Check if calendarByUserIdAndDate is an array before mapping */}
                    {calendarDataFetched && Array.isArray(calendarByUserIdAndDate) && calendarByUserIdAndDate.map((calendarData) => (
                        <View key={calendarData.id} style={styles.cardForDishes}>
                            <Image source={{ uri: calendarData.imageURL }} style={styles.calendarImage} />
                        </View>
                    ))}

                        <View style={styles.card}>
                            <TouchableOpacity onPress={handleDinnerListPress}>
                            <Text style={styles.addSign}> + </Text>
                            </TouchableOpacity>
                        </View>


                    <View style={styles.switchTextContainer}>
                        <Switch
                            trackColor={{false: '#767577', true: COLORS.darkMainColor}}
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
        width: windowWidth * 0.175,
        height: windowHeight * 0.085,
        marginTop: 12,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: '#545454',
        justifyContent: 'center',
        alignItems: 'center',
    },

    addSign: {
        fontSize: 42,
        color: COLORS.white,
    },

    cardImg: {
        width: windowWidth * 0.175,
        height: windowHeight * 0.085,
        marginTop: 12,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        backgroundColor: '#545454',
        justifyContent: 'center',
        alignItems: 'center',
    },

    addSignImg: {
        fontSize: 42,
        color: COLORS.white,
    },


    Calender: {
        flex: 0.25,
        flexDirection: 'column',
        alignItems: 'center',
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

    CalendarContainer: {
        flex: 1,
        padding: 8,
        marginHorizontal: 10,
        marginVertical: 2.5,

    },

    InnerContainer: {
        flex: 1,
        backgroundColor: '#ffebeb',
        shadowColor: 'black',
        shadowOpacity: 0.10,
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
        backgroundColor: '#ffebeb',
        shadowColor: 'black',
        shadowOpacity: 0.10,
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

    header: {
        paddingHorizontal: 16,
    },

    title: {
        fontSize: 50,
        fontWeight: '700',
        color: '#1d1d1d',
        lineHeight: 50,
        paddingTop: 12,
    },

    cardForDishes: {
        backgroundColor: 'green',
        width: windowWidth * 0.175,
        height: windowHeight * 0.085,
        marginTop: 12,
        borderRadius: 20,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        justifyContent: 'center',
        alignItems: 'center',

    },

    calendarImage: {
        borderRadius: 20,
        width: '100%',
        height: '100%',

    },

    imgText: {


    }

});

export default MealPlan;