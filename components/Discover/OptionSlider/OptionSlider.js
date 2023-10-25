import React, {  } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function OptionSlider() {


    return (
        <View style={styles.holderContainer}>

            <ScrollView horizontal={true} style={styles.container}>

                <View style={[styles.card]}>

                    <Text style={styles.headingText}>Popular</Text>

                </View>


                <View style={[styles.card]}>

                    <Text style={styles.headingText}>Recommended</Text>

                </View>


                <View style={[styles.card]}>

                    <Text style={styles.headingText}>Newly added</Text>

                </View>

            </ScrollView>
        </View>
    );
}


export default OptionSlider;

const styles = StyleSheet.create({

    holderContainer: {
        flex: 1,

    },

    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 12,

    },
    container: {
        padding: 4,


    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,

    },

});