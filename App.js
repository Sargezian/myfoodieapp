import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import COLORS from "./constants/colors";
import CategoriesScreen from "./screens/tabs/CategoriesScreen";
import CategoryDetailScreen from "./screens/CategoryDetailScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'
import FavoritesScreen from "./screens/tabs/FavoritesScreen";
import MyFoodieScreen from "./screens/tabs/MyFoodieScreen";
import SearchScreen from "./screens/tabs/SearchScreen";
import MealPlanScreen from "./screens/tabs/MealPlanScreen";
import SignupScreen from "./screens/login/SignupScreen";
import LoginScreen from "./screens/login/LoginScreen";
import AuthContextProvider, {AuthContext} from './context/auth-context';
import {useContext, useEffect, useState} from "react";
import IconButton from "./components/LoginAuth/LoginUI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';
import FavoritesContextProvider from "./context/favorites-context"; // Make sure to use the correct import path for your project

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    const AuthCxt = useContext(AuthContext);

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.HEADERColor },
                headerTintColor: 'white',
                tabBarStyle: { backgroundColor: COLORS.HEADERColor },
                tabBarActiveTintColor: 'black'
            }} initialRouteName="MyFoodie"
            sceneContainerStyle={{backgroundColor: COLORS.BGColor}}

        >
        <Tab.Screen
            name="Discover"
            component={CategoriesScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="earth-outline" color={color} size={size} />
                ),
            }}

        />

            <Tab.Screen
                name="Search"
                component={SearchScreen}
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
                    headerRight: ({ tintColor}) => (
                        <IconButton
                            icon="exit"
                            color= {tintColor}
                            size={24}
                            onPress={AuthCxt.logout}
                        />
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

            <Tab.Screen
                name="MealPlan"
                component={MealPlanScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" color={color} size={size} />
                    ),
                }}
            />

    </Tab.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.HEADERColor },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: COLORS.BGColor },
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}



function AuthenticatedStack() {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: COLORS.HEADERColor },
                    headerTintColor: 'white',
                    contentStyle: { backgroundColor: COLORS.BGColor },
                }} >

                <Stack.Screen
                    name="CategoriesScreen"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="MyFoodieScreen"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="FavoritesScreen"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="CategoryDetailScreen"
                    component={CategoryDetailScreen}
                />

                <Stack.Screen
                    name="MealDetail"
                    component={MealDetailScreen} />

            </Stack.Navigator>

    );
}


function Navigation() {

    const authContext = useContext(AuthContext);

    return (
            <NavigationContainer>
                { !authContext.isAuthenticated && <AuthStack/> }
                {authContext.isAuthenticated && <AuthenticatedStack/>}
            </NavigationContainer>
    );
}

function Root() {
    const [isTryingLogin, setIsTryingLogin] = useState(true);

    const authCtx = useContext(AuthContext);

    useEffect(() => {
        async function fetchToken() {
            const storedToken = await AsyncStorage.getItem('token');

            if (storedToken) {
                authCtx.authenticate(storedToken);
            }

            setIsTryingLogin(false);
            await SplashScreen.preventAutoHideAsync(); // Call it here
        }

        fetchToken();
    }, []);

    if (isTryingLogin) {

        return null;
    }

    return <Navigation />;
}

export default function App() {

    return (

        <>
            <StatusBar style="Dark"/>
            <AuthContextProvider>
                <FavoritesContextProvider>
                    <Root/>
                </FavoritesContextProvider>
            </AuthContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
