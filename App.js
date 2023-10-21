import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';
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
import MealPlanScreen from "./screens/tabs/MealPlanScreen";
import SignupScreen from "./screens/login/SignupScreen";
import LoginScreen from "./screens/login/LoginScreen";
import AuthContextProvider, {AuthContext} from './context/auth-context';
import React, {useContext, useEffect, useState} from "react";
import IconButton from "./components/LoginAuth/LoginUI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';
import FavoritesContextProvider from "./context/favorites-context";
import Splash from "./screens/SplashScreen"
import FluidStack from "./components/Fluid/Fluid";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function BottomTabNavigator() {
    const AuthCxt = useContext(AuthContext);

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.HEADERColor },
                headerTintColor: 'black',
                tabBarStyle: { backgroundColor: COLORS.HEADERColor },
                tabBarActiveTintColor: 'black'
            }} initialRouteName="MyFoodie"
            sceneContainerStyle={{backgroundColor: COLORS.BGColor}}

        >
        <Tab.Screen
            name="What To Cook Today?"
            component={CategoriesScreen}
            options={{
                headerStyle: {
                    backgroundColor: 'white',
                },
                ...Platform.select({
                    android: {
                        headerStyle: {
                            elevation: 0, // Hide shadow on Android
                        },
                    },
                    ios: {
                        headerShadowVisible: false, // Hide shadow on iOS
                    },
                }),
                tabBarLabel: ({ focused, color }) => (
                    <Text style={{ color: color }}>Discover</Text>
                ),
                headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                },

                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="earth" color={color} size={size} />
                ),
            }}

        />


            <Tab.Screen
                name="MyFoodie"
                component={MyFoodieScreen}
                options={{
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    ...Platform.select({
                        android: {
                            headerStyle: {
                                elevation: 0, // Hide shadow on Android
                            },
                        },
                        ios: {
                            headerShadowVisible: false, // Hide shadow on iOS
                        },
                    }), // Close the Platform.select



                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="fast-food" color={color} size={size} />
                    ),
                    headerRight: () => (
                        <View style={{ paddingRight: 10 }}>
                        <IconButton
                            icon="exit"
                            color= 'black'
                            size={30}
                            onPress={AuthCxt.logout}
                        />
                        </View>
                    ),
                    headerLeft: () => (
                        <View style={{ paddingLeft: 10 }}>
                            <IconButton
                                icon="person"
                                color="black"
                                size={30}
                                onPress={AuthCxt.logout}
                            />
                        </View>
                    ),
                    headerTitle: "",
                }}
            />

            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="MealPlan"
                component={MealPlanScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" color={color} size={size} />
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
                }} initialRouteName="fluid" >

                <Stack.Screen
                    name="CategoriesScreen"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false,
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


                <Stack.Screen
                    name="fluid"
                    component={FluidStack}
                    options={({ navigation }) => ({
                        headerStyle: {
                            backgroundColor: 'white',
                        },
                        ...Platform.select({
                            android: {
                                headerStyle: {
                                    elevation: 0, // Hide shadow on Android
                                },
                            },
                            ios: {
                                headerShadowVisible: false, // Hide shadow on iOS
                            },
                        }), // Close the Platform.select

                        title: 'My Foodie Screen', // Set a static title

                        // Custom header title component with navigation onPress
                        headerRight: () => (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('MyFoodieScreen')}>
                                <Text style={{ color: 'black', fontSize: 20, }}>Skip</Text>
                            </TouchableWithoutFeedback>
                        ),
                    })}
                />

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

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 4000);
    }, []);

    return (
        <>
            <StatusBar style="Dark"/>
            <AuthContextProvider>
                <FavoritesContextProvider>
                    {isLoading ? <Splash setIsLoading={setIsLoading} /> : <Root />}
                </FavoritesContextProvider>
            </AuthContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
