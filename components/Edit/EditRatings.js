import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import COLORS from "../../constants/colors";

class EditRatings extends React.Component {

    render() {

        return (
            <View>


                <View style={styles.RatingContainer}>
                    <Rating
                        style={{ flexDirection: 'row', paddingHorizontal: 10 }}
                        ratingTextColor="black"
                        onFinishRating={this.ratingCompleted}
                        showRating

                    />
                </View>

            </View>
        );
    }
}

export default EditRatings;

const styles = StyleSheet.create({
    RatingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',

    },

});