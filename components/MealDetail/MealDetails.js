import { View, Text, StyleSheet } from 'react-native';

function MealDetails({
                         duration,
                         mealtype,
                         style,
                         textStyle,
                         rating,
                     }) {
    return (
        <View style={[styles.details, style]}>
            <Text style={[styles.detailItem, textStyle]}>{duration}m</Text>
            <Text style={[styles.detailItem, textStyle]}>
                {mealtype}
            </Text>
            <Text style={[styles.detailItem, textStyle]}>
                Rating: {rating}
            </Text>
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
        fontSize: 12
    },
});