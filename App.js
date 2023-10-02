import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from "./constants/colors";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryDetailScreen from "./screens/CategoryDetailScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import FavoritesScreen from "./screens/FavoritesScreen";
import MyFoodieScreen from "./screens/MyFoodieScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.HEADERColor },
                headerTintColor: 'white',
                tabBarStyle: { backgroundColor: Colors.BGColor },
                tabBarActiveTintColor: 'black'
            }}
            sceneContainerStyle={{backgroundColor: Colors.BGColor}}

        >
        <Tab.Screen
            name="Discover"
            component={CategoriesScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search-outline" color={color} size={size} />
                ),
            }}

        />

            <Tab.Screen
                name="MyFoodie"
                component={MyFoodieScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="fast-food-outline" color={color} size={size} />
                    ),
                }}

            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart-outline" color={color} size={size} />
                    ),
                }}
            />

    </Tab.Navigator>
    );
}


export default function App() {
    return (

        <>
            <StatusBar style="dark"/>
            {/*   <SafeAreaView></SafeAreaView>*/}

            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                    headerStyle: { backgroundColor: Colors.HEADERColor },
                    headerTintColor: 'white',
                    contentStyle: { backgroundColor: Colors.BGColor },
                }} initialRouteName="CategoriesScreen">

                    <Stack.Screen
                        name="CategoriesScreen" component={BottomTabNavigator}
                                  options={{
                                      headerShown: false
                                  }}
                    />

                    <Stack.Screen
                        name="MyFoodieScreen" component={BottomTabNavigator}
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen
                        name="FavoritesScreen" component={BottomTabNavigator}
                        options={{
                            headerShown: false
                        }}
                    />





                    <Stack.Screen
                        name="CategoryDetailScreen"
                        component={CategoryDetailScreen}
                    />
                    <Stack.Screen name="MealDetail" component={MealDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
