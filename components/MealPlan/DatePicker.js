import React, {useState, useRef, useEffect} from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Text,
    Dimensions,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import COLORS from "../../constants/colors";
import { useDate } from '../../context/date-context'; // Import the context hook


const { width } = Dimensions.get('window');

export default function DatePicker() {
    const { selectedDate, setNewDate } = useDate(); // Use the context hook
    const swiper = useRef();
    const [value, setValue] = useState(new Date());
    const [week, setWeek] = useState(0);


    const weeks = React.useMemo(() => {
        const start = moment().add(week, 'weeks').startOf('week');

        return [-1, 0, 1].map(adj => {
            return Array.from({ length: 7 }).map((_, index) => {
                const date = moment(start).add(adj, 'week').add(index, 'day');

                return {
                    weekday: date.format('ddd'),
                    date: date.toDate(),
                };
            });
        });
    }, [week]);

    useEffect(() => {
        const formattedDate = `${value.getFullYear()}-${(value.getMonth() + 1).toString().padStart(2, '0')}-${value.getDate().toString().padStart(2, '0')}`;
        setNewDate(formattedDate); // Update the context when the date changes
    }, [value, setNewDate]);


    return (

        <>

                <View style={styles.picker}>
                    <Swiper
                        index={1}
                        ref={swiper}
                        loop={false}
                        showsPagination={false}
                        onIndexChanged={ind => {
                            if (ind === 1) {
                                return;
                            }
                            setTimeout(() => {
                                const newIndex = ind - 1;
                                const newWeek = week + newIndex;
                                setWeek(newWeek);
                                const newDate = moment(value).add(newIndex, 'week').toDate();
                                setValue(newDate);
                                onDateChange(newDate); // Call the onDateChange prop
                                swiper.current.scrollTo(1, false);
                            }, 100);
                        }}>
                        {weeks.map((dates, index) => (
                            <View
                                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                                key={index}>
                                {dates.map((item, dateIndex) => {
                                    const isActive =
                                        value.toDateString() === item.date.toDateString();
                                    return (
                                        <TouchableWithoutFeedback
                                            key={dateIndex}
                                            onPress={() => setValue(item.date)}>
                                            <View
                                                style={[
                                                    styles.item,
                                                    isActive && {
                                                        backgroundColor: '#111',
                                                        borderColor: '#111',
                                                    },
                                                ]}>
                                                <Text
                                                    style={[
                                                        styles.itemWeekday,
                                                        isActive && { color: '#fff' },
                                                    ]}>
                                                    {item.weekday}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.itemDate,
                                                        isActive && { color: '#fff' },
                                                    ]}>
                                                    {item.date.getDate()}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>

                                    );
                                })}

                            </View>

                        ))}
                    </Swiper>
                </View>
            <View style={styles.dateItemStyle}><Text style={styles.dateTextItemStyle}>
                {value.toDateString()}
            </Text></View>
</>

    );

}

const styles = StyleSheet.create({

    picker: {
        flex: 1,
        maxHeight: 74,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    dateItemStyle: {
        width: 150,
    },

    dateTextItemStyle: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    content: {
        paddingHorizontal: 16,
    },
    footer: {
        marginTop: 'auto',
        paddingHorizontal: 16,
    },
    itemRow: {
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: -4,
    },
    item: {
        flex: 1,
        height: 50,
        marginHorizontal: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#e3e3e3',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    itemWeekday: {
        fontSize: 13,
        fontWeight: '500',
        color: '#737373',
        marginBottom: 4,
    },
    itemDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
    },
});