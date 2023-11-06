import { View, Text, StyleSheet } from 'react-native';

function MealFavoriteDetails({
                         duration,
                         complexity,
                         affordability,
                         rating,
                         style,
                         textStyle,
                     }) {
    return (
        <View style={[styles.details, style]}>
            <Text style={[styles.detailItem, textStyle]}>{duration}m</Text>
            <Text style={[styles.detailItem, textStyle]}>
                {complexity}
            </Text>
            <Text style={[styles.detailItem, textStyle]}>
                {affordability}
            </Text>
            <Text style={[styles.detailItem, textStyle]}>
                Rating: {rating}
            </Text>
        </View>
    );
}

export default MealFavoriteDetails;

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