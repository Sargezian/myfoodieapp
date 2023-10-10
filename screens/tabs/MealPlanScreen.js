import {View, StyleSheet} from 'react-native';
import MealPlan from "../../components/MealPlan/MealPlan";

function MealPlanScreen() {

    return (
        <View style={styles.container} >
            <MealPlan/>
        </View>
    );
}

export default MealPlanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});
