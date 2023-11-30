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
            <Text style={[styles.detailItem, textStyle]}>{nutritional_content}</Text>
            <Text style={[styles.detailItem, textStyle]}>
                {meal_type}
            </Text>
            <Text style={[styles.detailItem, textStyle]}>{rating}
            </Text>
            <Text style={[styles.detailItem, textStyle]}>{review}</Text>
        </View>
    );
}

export default MealDetails;

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,

    },
    detailItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
});