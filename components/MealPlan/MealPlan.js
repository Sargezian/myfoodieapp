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
import React, {useEffect, useMemo, useState} from "react";
import DatePicker from "./DatePicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useDate} from "../../context/date-context";
import {getReviewByUserIdAndDishId} from "../../API/Review/ReviewAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCalendarByUserIdAndDate} from "../../API/MealPlan/MealPlanAPI";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { PieChart } from 'react-native-chart-kit';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MealPlan() {


    const [isBreakfastEnabled, setBreakfastEnabled] = useState(false);
    const [isLunchEnabled, setLunchIsEnabled] = useState(false);
    const [isDinnerEnabled, setDinnerEnabled] = useState(false);


    const [calendarByUserIdAndDate, setCalendarByUserIdAndDate] = useState([]);
    const [email, setEmail] = useState('');
    const { selectedDate, setNewDate } = useDate();

    const [calendarDataFetched, setCalendarDataFetched] = useState(false);

    //date
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedText, setSelectedText] = useState('');
    const [show, setShow] = useState(false);

    // time

    const [breakfastTime, setBreakfastTime] = useState(new Date());
    const [lunchTime, setLunchTime] = useState(new Date());
    const [dinnerTime, setDinnerTime] = useState(new Date());
    const [showBreakfastTimePicker, setShowBreakfastTimePicker] = useState(false);
    const [showLunchTimePicker, setShowLunchTimePicker] = useState(false);
    const [showDinnerTimePicker, setShowDinnerTimePicker] = useState(false);
    const [mealTimesByDate, setMealTimesByDate] = useState({});


    const [nutritionalData, setNutritionalData] = useState({
        carbs: 0,
        fat: 0,
        protein: 0,
        fiber: 0
    });

    const showDatepicker = () => {
        setShowDatePicker(true);
    };


    useEffect(() => {
        const loadMealTimes = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('mealTimesByDate');
                if (jsonValue != null) {
                    const parsedMealTimes = JSON.parse(jsonValue);

                    // Convert string dates back to Date objects for breakfast, lunch, and dinner
                    Object.keys(parsedMealTimes).forEach(date => {
                        if (parsedMealTimes[date].breakfastTime) {
                            parsedMealTimes[date].breakfastTime = new Date(parsedMealTimes[date].breakfastTime);
                        }
                        if (parsedMealTimes[date].lunchTime) {
                            parsedMealTimes[date].lunchTime = new Date(parsedMealTimes[date].lunchTime);
                        }
                        if (parsedMealTimes[date].dinnerTime) {
                            parsedMealTimes[date].dinnerTime = new Date(parsedMealTimes[date].dinnerTime);
                        }
                    });

                    setMealTimesByDate(parsedMealTimes);
                }
            } catch (e) {
                console.error("Error loading meal times data", e);
            }
        };

        loadMealTimes();
    }, []);



    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);

        // Format the selected date as per your requirement
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        setSelectedText(`${formattedDate}`);
    };


    const onChangeBreakfastTime = async (event, selectedTime) => {
        const currentTime = selectedTime || breakfastTime;
        setShowBreakfastTimePicker(Platform.OS === 'ios');
        const formattedSelectedDate = selectedDate;

        const newMealTimesByDate = {
            ...mealTimesByDate,
            [formattedSelectedDate]: {
                ...mealTimesByDate[formattedSelectedDate],
                breakfastTime: currentTime
            }
        };

        setMealTimesByDate(newMealTimesByDate);

        setBreakfastTime(currentTime);

        try {
            const jsonValue = JSON.stringify(newMealTimesByDate);
            await AsyncStorage.setItem('mealTimesByDate', jsonValue);
        } catch (e) {
            // Saving error
            console.error("Error saving meal times data", e);
        }
    };



    const onChangeLunchTime = async (event, selectedTime) => {
        const currentTime = selectedTime || lunchTime;
        setShowLunchTimePicker(Platform.OS === 'ios');
        const formattedSelectedDate = selectedDate;

        const newMealTimesByDate = {
            ...mealTimesByDate,
            [formattedSelectedDate]: {
                ...mealTimesByDate[formattedSelectedDate],
                lunchTime: currentTime
            }
        };

        setMealTimesByDate(newMealTimesByDate);
        setLunchTime(currentTime);

        try {
            const jsonValue = JSON.stringify(newMealTimesByDate);
            await AsyncStorage.setItem('mealTimesByDate', jsonValue);
        } catch (e) {
            console.error("Error saving meal times data", e);
        }
    };



    const onChangeDinnerTime = async (event, selectedTime) => {
        const currentTime = selectedTime || dinnerTime;
        setShowDinnerTimePicker(Platform.OS === 'ios');
        const formattedSelectedDate = selectedDate;

        const newMealTimesByDate = {
            ...mealTimesByDate,
            [formattedSelectedDate]: {
                ...mealTimesByDate[formattedSelectedDate],
                dinnerTime: currentTime
            }
        };

        setMealTimesByDate(newMealTimesByDate);
        setDinnerTime(currentTime);

        try {
            const jsonValue = JSON.stringify(newMealTimesByDate);
            await AsyncStorage.setItem('mealTimesByDate', jsonValue);
        } catch (e) {
            console.error("Error saving meal times data", e);
        }
    };


    const navigation = useNavigation();

    const handleBreakFastListPress = (date) => {
        navigation.navigate('BreakFastList', { date });
        console.log(date)
    };

    const handleLunchListPress = (date) => {
        navigation.navigate('LunchList', { date });
    };

    const handleDinnerListPress = (date) => {
        navigation.navigate('DinnerList', { date });
    };

    const selectMealItemHandler = (mealId) => {
        navigation.navigate('MealDetail', { mealId });
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
                    const userId = email; // Ensure you have 'email' state defined
                    const dateStr = selectedDate.toString();

                    const calendarData = await getCalendarByUserIdAndDate(userId, dateStr);
                    setCalendarByUserIdAndDate(calendarData);
                    setCalendarDataFetched(true);

                    let totalCarbs = 0, totalFat = 0, totalProtein = 0, totalFiber = 0;

                    if (calendarData && calendarData.length > 0) {
                        calendarData.forEach(dish => {
                            dish.nutritionalContent.forEach(content => {
                                if (content.includes("Kulhydrat")) {
                                    totalCarbs += parseFloat(content.split(":")[1].split("g")[0].trim());
                                } else if (content.includes("Fedt")) {
                                    totalFat += parseFloat(content.split(":")[1].split("g")[0].trim());
                                } else if (content.includes("protein")) {
                                    totalProtein += parseFloat(content.split(":")[1].split("g")[0].trim());
                                } else if (content.includes("Fiber")) {
                                    totalFiber += parseFloat(content.split(":")[1].split("g")[0].trim());
                                }
                            });
                        });
                    }

                    setNutritionalData({
                        carbs: totalCarbs,
                        fat: totalFat,
                        protein: totalProtein,
                        fiber: totalFiber
                    });

                } catch (error) {
                    console.error('Error fetching Calendar data:', error);
                }
            };

            fetchData();
        }, [email, selectedDate])
    );



    const chartData = useMemo(() => {
        const total = nutritionalData.carbs + nutritionalData.fat + nutritionalData.protein + nutritionalData.fiber;

        // Return an empty array if there is no nutritional data
        if (total === 0) {
            return [];
        }

        return [
            {
                name: 'g Carbs',
                amount: nutritionalData.carbs, // Converts to percentage
                color: 'skyblue',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15
            },
            {
                name: 'g Fat',
                amount: nutritionalData.fat,
                color: 'orange',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15
            },
            {
                name: 'g Protein',
                amount: nutritionalData.protein,
                color: 'green',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15
            },
            {
                name: 'g Fiber',
                amount: nutritionalData.fiber,
                color: 'red',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15
            }
        ];
    }, [nutritionalData.carbs, nutritionalData.fat, nutritionalData.protein, nutritionalData.fiber]);

    const breakfastToggleSwitch = async () => {
        const formattedSelectedDate = selectedDate;
        const currentSettings = mealTimesByDate[formattedSelectedDate] || {};


        const newBreakfastEnabled = !currentSettings.isBreakfastEnabled;

        const updatedSettings = {
            ...currentSettings,
            isBreakfastEnabled: newBreakfastEnabled,
        };


        const updatedMealTimesByDate = {
            ...mealTimesByDate,
            [formattedSelectedDate]: updatedSettings,
        };

        setMealTimesByDate(updatedMealTimesByDate);


        try {
            const jsonValue = JSON.stringify(updatedMealTimesByDate);
            await AsyncStorage.setItem('mealTimesByDate', jsonValue);
        } catch (e) {
            console.error("Error saving meal times data", e);
        }

        console.log("Breakfast notification for", formattedSelectedDate, "is now", newBreakfastEnabled ? "enabled" : "disabled");

        if (newBreakfastEnabled) {
            await scheduleNotification('breakfast');
        } else {
            console.log("Notification will not be scheduled because the switch is off.");
        }
    };


    const lunchToggleSwitch = async () => {
        const formattedSelectedDate = selectedDate;
        const currentSettings = mealTimesByDate[formattedSelectedDate] || {};


        const newLunchEnabled = !currentSettings.isLunchEnabled;

        const updatedSettings = {
            ...currentSettings,
            isLunchEnabled: newLunchEnabled,
        };


        const updatedMealTimesByDate = {
            ...mealTimesByDate,
            [formattedSelectedDate]: updatedSettings,
        };

        setMealTimesByDate(updatedMealTimesByDate);


        try {
            const jsonValue = JSON.stringify(updatedMealTimesByDate);
            await AsyncStorage.setItem('mealTimesByDate', jsonValue);
        } catch (e) {
            console.error("Error saving meal times data", e);
        }

        console.log("Lunch notification for", formattedSelectedDate, "is now", newLunchEnabled ? "enabled" : "disabled");

        if (newLunchEnabled) {
            await scheduleNotification('lunch');
        } else {
            console.log("Notification will not be scheduled because the switch is off.");
        }
    };


    const dinnerToggleSwitch = async () => {
        const formattedSelectedDate = selectedDate;
        const currentSettings = mealTimesByDate[formattedSelectedDate] || {};


        const newDinnerEnabled = !currentSettings.isDinnerEnabled;

        const updatedSettings = {
            ...currentSettings,
            isDinnerEnabled: newDinnerEnabled,
        };


        const updatedMealTimesByDate = {
            ...mealTimesByDate,
            [formattedSelectedDate]: updatedSettings,
        };

        setMealTimesByDate(updatedMealTimesByDate);


        try {
            const jsonValue = JSON.stringify(updatedMealTimesByDate);
            await AsyncStorage.setItem('mealTimesByDate', jsonValue);
        } catch (e) {
            console.error("Error saving meal times data", e);
        }

        if (newDinnerEnabled) {
            await scheduleNotification('dinner');
        } else {
            console.log("Notification will not be scheduled because the switch is off.");
        }
    };


    const scheduleNotification = async (mealType) => {
        console.log("Attempting to schedule a notification...");

        // Check and request for notification permissions
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
            const { status: newStatus } = await Notifications.requestPermissionsAsync();
            if (newStatus !== 'granted') {
                console.error("Failed to get notification permission!");
                return;
            }
        }

        // Determine the time for the notification based on meal type
        let mealTime;
        if (mealType === 'breakfast') {
            mealTime = mealTimesByDate[selectedDate]?.breakfastTime;
        } else if (mealType === 'lunch') {
            mealTime = mealTimesByDate[selectedDate]?.lunchTime;
        } else if (mealType === 'dinner') {
            mealTime = mealTimesByDate[selectedDate]?.dinnerTime;
        }

        if (!mealTime) {
            console.log(`No ${mealType} time set for the selected date.`);
            return;
        }

        // Calculate time until the meal
        const now = new Date();
        const timeUntilMeal = mealTime.getTime() - now.getTime();
        console.log("Time until meal:", timeUntilMeal, "ms")

        if (timeUntilMeal <= 0) {
            console.log(`It's past the time for ${mealType} on the selected date.`);
            return;
        }

        // Schedule the notification
        try {
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Meal Reminder',
                    body: `It's time for your ${mealType}!`,
                },
                trigger: {
                    seconds: timeUntilMeal / 1000,
                },
            });

            console.log(`Scheduled notification for ${mealType} with id:`, notificationId);
        } catch (error) {
            console.error("Error scheduling notification:", error);
        }
    };


    return (
        <View style={styles.Container}>
            <View style={styles.CalendarContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Manage {'\n'}your meals <Icon name="pencil-alt" size={30} color="#000" />
                    </Text>
                </View>
                <DatePicker onDateChange={onDateChange} />
            </View>

            <View style={styles.InnerContainer}>
                <View style={styles.MealHeader}>
                    <Text style={styles.MealHeaderText}> Breakfast </Text>
                    <Text style={styles.MealHeaderClock} onPress={() => setShowBreakfastTimePicker(true)}>
                        <Ionicons name={'time'} color="black" size={20} />

                        {/* Display the breakfast time for the selected date */}
                        {mealTimesByDate[selectedDate]?.breakfastTime?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) || 'Set Time'}
                    </Text>

                    {showBreakfastTimePicker && (
                        <DateTimePicker
                            value={mealTimesByDate[selectedDate]?.breakfastTime || new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeBreakfastTime}
                        />
                    )}


                </View>
                <View style={styles.MealContainer}>
                    {calendarDataFetched &&
                        Array.isArray(calendarByUserIdAndDate) &&
                        calendarByUserIdAndDate
                            .filter((c) => c.mealType === 'Breakfast')
                            .map((calendarData) => (
                                <TouchableOpacity
                                    key={calendarData.id}
                                    onPress={() => selectMealItemHandler(calendarData.dishId)}
                                >
                                    <View style={styles.cardForDishes}>
                                        <Image
                                            source={{ uri: calendarData.imageURL }}
                                            style={styles.calendarImage}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                    <TouchableOpacity onPress={() => handleBreakFastListPress(selectedDate)}>
                        <View style={styles.card}>
                            <Text style={styles.addSign}> + </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.switchTextContainer}>
                        <Switch
                            trackColor={{ false: '#767577', true: COLORS.darkMainColor }}
                            thumbColor={mealTimesByDate[selectedDate]?.isBreakfastEnabled ? 'ffffff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={breakfastToggleSwitch}
                            value={mealTimesByDate[selectedDate]?.isBreakfastEnabled || false}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <View style={styles.MealHeader}>
                    <Text style={styles.MealHeaderText}> Lunch </Text>
                    <Text style={styles.MealHeaderClock} onPress={() => setShowLunchTimePicker(true)}>
                        <Ionicons name={'time'} color="black" size={20} />
                        {mealTimesByDate[selectedDate]?.lunchTime
                            ? mealTimesByDate[selectedDate].lunchTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                            : 'Set Lunch Time'}
                    </Text>
                    {showLunchTimePicker && (
                        <DateTimePicker
                            value={mealTimesByDate[selectedDate]?.lunchTime || new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeLunchTime}
                        />
                    )}

                </View>
                <View style={styles.MealContainer}>
                    {calendarDataFetched &&
                        Array.isArray(calendarByUserIdAndDate) &&
                        calendarByUserIdAndDate
                            .filter((c) => c.mealType === 'Lunch')
                            .map((calendarData) => (
                                <TouchableOpacity
                                    key={calendarData.id}
                                    onPress={() => selectMealItemHandler(calendarData.dishId)}
                                >
                                    <View style={styles.cardForDishes}>
                                        <Image
                                            source={{ uri: calendarData.imageURL }}
                                            style={styles.calendarImage}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                    <TouchableOpacity onPress={() => handleLunchListPress(selectedDate)}>
                        <View style={styles.card}>
                            <Text style={styles.addSign}> + </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.switchTextContainer}>
                        <Switch
                            trackColor={{ false: '#767577', true: COLORS.darkMainColor }}
                            thumbColor={mealTimesByDate[selectedDate]?.isLunchEnabled ? '#ffffff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={lunchToggleSwitch}
                            value={mealTimesByDate[selectedDate]?.isLunchEnabled || false}
                        />

                    </View>
                </View>
            </View>

            <View style={styles.InnerContainer}>
                <View style={styles.MealHeader}>
                    <Text style={styles.MealHeaderText}> Dinner </Text>
                    <Text style={styles.MealHeaderClock} onPress={() => setShowDinnerTimePicker(true)}>
                        <Ionicons name={'time'} color="black" size={20} />
                        {mealTimesByDate[selectedDate]?.dinnerTime
                            ? mealTimesByDate[selectedDate].dinnerTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                            : 'Set Dinner Time'}
                    </Text>
                    {showDinnerTimePicker && (
                        <DateTimePicker
                            value={mealTimesByDate[selectedDate]?.dinnerTime || new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDinnerTime}
                        />
                    )}

                </View>
                <View style={styles.MealContainer}>
                    {calendarDataFetched &&
                        Array.isArray(calendarByUserIdAndDate) &&
                        calendarByUserIdAndDate
                            .filter((c) => c.mealType === 'Dinner')
                            .map((calendarData) => (
                                <TouchableOpacity
                                    key={calendarData.id}
                                    onPress={() => selectMealItemHandler(calendarData.dishId)}
                                >
                                    <View style={styles.cardForDishes}>
                                        <Image
                                            source={{ uri: calendarData.imageURL }}
                                            style={styles.calendarImage}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                    <TouchableOpacity onPress={() => handleDinnerListPress(selectedDate)}>
                        <View style={styles.card}>
                            <Text style={styles.addSign}> + </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.switchTextContainer}>
                        <Switch
                            trackColor={{ false: '#767577', true: COLORS.darkMainColor }}
                            thumbColor={mealTimesByDate[selectedDate]?.isDinnerEnabled ? '#ffffff' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={dinnerToggleSwitch}
                            value={mealTimesByDate[selectedDate]?.isDinnerEnabled || false}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.CalorieInnerContainer}>
                <View style={styles.CalorieHeader}>
                    <Text style={styles.CaloriesText}>Calories Analysis</Text>
                    <Text>See more Detail</Text>
                </View>
                {chartData.length > 0 && (
                    <PieChart
                        data={chartData}
                        width={Dimensions.get('window').width}  // Make sure you have imported Dimensions from 'react-native'
                        height={220}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: { borderRadius: 16 }
                        }}
                        accessor={"amount"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        absolute
                    />
                )}
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