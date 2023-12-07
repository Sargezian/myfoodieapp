import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

function List({ data }) {
    return (
        <View>
            {Array.isArray(data) &&
                data.map((dataPoint, index) => (
                    <View key={index} style={styles.listItem}>
                        {Array.isArray(dataPoint) ? (
                            // If the dataPoint is an array (multi-line), render each line
                            dataPoint.map((line, subIndex) => (
                                <Text key={subIndex} style={styles.itemText}>
                                    {line}
                                </Text>
                            ))
                        ) : (
                            // If the dataPoint is a single-line string, render it
                            <Text style={styles.itemText}>{dataPoint}</Text>
                        )}
                    </View>
                ))}
        </View>
    );
}
export default List;

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: COLORS.white,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,

    },
    itemText: {
        color: '#000000',
        textAlign: 'center',
    },
});
