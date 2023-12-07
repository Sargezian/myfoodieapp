import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import COLORS from "../../constants/colors";

class Ratings extends React.Component {

    render() {

        const { ratingCompleted } = this.props;

        return (
            <View>


                <View style={styles.RatingContainer}>
                <Rating
                    style={{ flexDirection: 'row', paddingHorizontal: 10 }}
                    ratingTextColor="black"
                    onFinishRating={(rating) => {
                        ratingCompleted(rating);
                    }}
                    showRating
                />
                    </View>

            </View>
        );
    }
}

export default Ratings;

const styles = StyleSheet.create({
    RatingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',

    },

});