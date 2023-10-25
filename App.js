import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, TouchableWithoutFeedback, Text, View, TouchableOpacity, Image} from 'react-native';
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
import SkipScreen from "./components/Skip/Skip";
import TestScreen from "./screens/tabs/TestScreen"


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const CustomTabBarButton = ({children, onPress}) => (

    <TouchableOpacity
        style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
    }}
        onPress= {onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: COLORS.HEADERColor,
            shadowColor: 'black',
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
        }}>
            {children}
        </View>
    </TouchableOpacity>
);




function BottomTabNavigator() {
    const AuthCxt = useContext(AuthContext);

    return (
        <Tab.Navigator

            initialRouteName="MyFoodie"

            screenOptions={{

                tabBarActiveTintColor: 'black',

                headerTintColor: 'black',

                headerStyle: {

                    backgroundColor: COLORS.HEADERColor

                },

                tabBarStyle: {

                    position: 'absolute',
                    backgroundColor: COLORS.HEADERColor,
                    right: 20,
                    left: 20,
                    bottom: 25,
                    elevation: 0,
                    borderRadius: 15,
                    height: 90,
                    shadowColor: 'black',
                    shadowOpacity: 0.25,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 8,
                    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',

                },


            }}
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
                name="Favorites"
                component={FavoritesScreen}
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
                    headerTitle: "",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="MyFoodie"
                component={MyFoodieScreen}
                options={{

                    tabBarLabel: '',

                    tabBarIcon: () => (

                        <Image
                            source={require('./assets/1.png')}
                            resizeMode="contain"
                            style={{
                                width: 80,
                                height: 80,

                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),


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
                            />
                        </View>
                    ),
                    headerTitle: "",
                }}
            />

            <Tab.Screen
                name="MealPlan"
                component={MealPlanScreen}
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
                    headerTitle: "",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" color={color} size={size} />
                    ),
                }}
            />


            <Tab.Screen
                name="Tester"
                component={TestScreen}
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
                    headerTitle: "",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="flag" color={color} size={size} />
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
                headerTintColor: 'black',
                contentStyle: { backgroundColor: COLORS.BGColor },
                tabBarVisible: false

            }}

        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
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
                }}



            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
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
                }}

            />


        </Stack.Navigator>
    );
}


const style = StyleSheet.create({

    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,

    }
});


function AuthenticatedStack() {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: COLORS.HEADERColor },
                    headerTintColor: 'black',
                    contentStyle: { backgroundColor: COLORS.BGColor },
                }} initialRouteName="skip" >

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
                    name="MealPlanScreen"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="TestScreen"
                    component={BottomTabNavigator}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="CategoryDetailScreen"
                    component={CategoryDetailScreen}
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
                    }}
                />

                <Stack.Screen
                    name="MealDetail"
                    component={MealDetailScreen} />

                <Stack.Screen
                    name="skip"
                    component={SkipScreen}
                    options={({ navigation }) => {
                        const [showSkipText, setShowSkipText] = useState(false);

                        useEffect(() => {
                            // Use a 5-second timeout to show the "Skip" text
                            const timeoutId = setTimeout(() => {
                                setShowSkipText(true);
                            }, 5000);

                            // Clear the timeout when the component unmounts
                            return () => clearTimeout(timeoutId);
                        }, []);

                        return {
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
                            headerTitle: "",
                            // Custom header title component with navigation onPress
                            headerRight: () => (
                                showSkipText ? (
                                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MyFoodieScreen')}>
                                        <Text style={{ color: 'black', fontSize: 20, }}>Skip</Text>
                                    </TouchableWithoutFeedback>
                                ) : null
                            ),
                        };
                    }}
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
