import {View, Text, StyleSheet, ScrollView} from 'react-native';
import COLORS from "../../../constants/colors";


function DiscoverSlider() {
    return (
        <View style={styles.holderContainer}>
            <Text style={styles.headingText}> Top made meals today! </Text>

            <ScrollView horizontal={true} style={styles.container}>


                <View style={[styles.card, styles.CardElevated]}>

                    <Text>sweet</Text>

                </View>


                <View style={[styles.card, styles.CardElevated]}>

                    <Text>spicy</Text>

                </View>


                <View style={[styles.card, styles.CardElevated]}>

                    <Text>mix</Text>

                </View>


                <View style={[styles.card, styles.CardElevated]}>

                    <Text>fast</Text>

                </View>



                <View style={[styles.card, styles.CardElevated]}>

                <Text>more...</Text>

            </View>



                  <View style={[styles.card, styles.CardElevated]}>
                      <Text> Hello </Text>

                  </View>

          </ScrollView>
        </View>
    )
}

export default DiscoverSlider;



const styles = StyleSheet.create({

    holderContainer: {
        flex: 1,
    },

    headingText: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingHorizontal: 8

    },
    container: {
        padding: 8
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 125,
        height: 125,
        borderRadius: 10,
        margin: 8,
    },

    CardElevated: {
        backgroundColor: COLORS.LightColor,
        elevation: 4,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowColor: '#333',
        shadowOpacity: 0.4,
        shadowRadius: 2


    },
});
