import {View, StyleSheet, FlatList} from 'react-native';
import MealPlan from "../../components/MealPlan/MealPlan";

function MealPlanScreen() {

    return (



        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={<MealPlan />}
                // Other FlatList properties
             data={null} renderItem={null}/>
        </View>



    );

}

export default MealPlanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
