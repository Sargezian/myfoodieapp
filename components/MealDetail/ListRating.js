import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-elements';
import COLORS from "../../constants/colors";

class ListRating extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.RatingContainer}>
                    <Rating
                        type="star" // Set type to 'star'
                        ratingCount={5} // Number of stars
                        imageSize={20} // Size of each star
                        onFinishRating={this.ratingCompleted}
                        ratingTextColor="black"
                        readonly // Make the rating non-editable
                        startingValue={3.5} // Set the initial value (if needed)
                    />
                </View>
            </View>
        );
    }
}

export default ListRating;

const styles = StyleSheet.create({
    RatingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
