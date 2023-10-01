import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoriesScreen from "./screens/CategoriesScreen";
import MealDetailScreen from "./screens/MealDetailScreen";


const Stack = createNativeStackNavigator();


export default function App() {
    return (

        <>
            <StatusBar style="dark"/>
         {/*   <SafeAreaView></SafeAreaView>*/}

            <NavigationContainer>
                <Stack.Navigator initialRouteName="MealsCategories">
                    <Stack.Screen name="MealsCategories" component={CategoriesScreen} />
                    <Stack.Screen name="MealsDetail" component={MealDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
