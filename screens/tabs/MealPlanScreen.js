import {View, StyleSheet, FlatList, SafeAreaView, StatusBar, Platform} from 'react-native';
import MealPlan from "../../components/MealPlan/MealPlan";

function MealPlanScreen() {

    return (


        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={<MealPlan />}
                // Other FlatList properties
             data={null} renderItem={null}/>
        </View>
        </SafeAreaView>


    );

}

export default MealPlanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,


    },
});
