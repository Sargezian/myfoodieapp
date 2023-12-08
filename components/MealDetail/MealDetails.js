import { View, Text, StyleSheet } from 'react-native';
import COLORS from "../../constants/colors";

function MealDetails({
                         nutritional_content,
                         style,
                         textStyle,
                     }) {
    return (
        <View style={[styles.details, style]}>
            {nutritional_content && nutritional_content.map((item, index) => (
                <Text key={index} style={[styles.detailItem, textStyle]}>
                    {item}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'column', // Change flexDirection to 'column'
        alignItems: 'center',
        justifyContent: 'center',
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
    detailItem: {
        marginVertical: 4, // Adjust margin to create space between items
        fontSize: 12,
    },
});

export default MealDetails;
