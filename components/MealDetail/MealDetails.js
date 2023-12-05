import { View, Text, StyleSheet } from 'react-native';

function MealDetails({
                         time_estimate,
                         nutritional_content,
                         meal_type,
                         style,
                         textStyle,
                         rating,
                         review
                     }) {
    return (
        <View style={[styles.details, style]}>
            <Text style={[styles.detailItem, textStyle]}>{time_estimate} Minutes</Text>
            {nutritional_content.map((item, index) => (
                <Text key={index} style={[styles.detailItem, textStyle]}>
                    {item}
                </Text>
            ))}
            <Text style={[styles.detailItem, textStyle]}>{meal_type}</Text>
            <Text style={[styles.detailItem, textStyle]}>{rating}</Text>
            <Text style={[styles.detailItem, textStyle]}>{review}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'column', // Change flexDirection to 'column'
        alignItems: 'center',
        justifyContent: 'center',

    },
    detailItem: {
        marginVertical: 4, // Adjust margin to create space between items
        fontSize: 12,
    },
});

export default MealDetails;
