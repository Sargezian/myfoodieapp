import {StatusBar} from 'expo-status-bar';
import {
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import COLORS from "./constants/colors";
import CategoriesScreen from "./screens/bottomTabs/CategoriesScreen";
import CategoryDetailScreen from "./screens/tabs/CategoryDetailScreen";
import MealDetailScreen from "./screens/tabs/MealDetailScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons'
import FavoritesScreen from "./screens/bottomTabs/FavoritesScreen";
import MyFoodieScreen from "./screens/bottomTabs/MyFoodieScreen";
import MealPlanScreen from "./screens/bottomTabs/MealPlanScreen";
import SignupScreen from "./screens/tabs/login/SignupScreen";
import LoginScreen from "./screens/tabs/login/LoginScreen";
import AuthContextProvider, {AuthContext} from './context/auth-context';
import React, {useContext, useEffect, useState} from "react";
import IconButton from "./components/LoginAuth/LoginUI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FavoritesContextProvider from "./context/favorites-context";
import Splash from "./screens/tabs/SplashScreen"
import SkipScreen from "./components/Skip/Skip";
import ProfileScreen from "./screens/bottomTabs/ProfileScreen"
import UserProfileScreen from "./screens/tabs/UserProfileScreen";
import FollowersListScreen from "./screens/tabs/FollowersListScreen";
import FollowingListScreen from "./screens/tabs/FollowingListScreen";
import BreakFastListScreen from "./screens/tabs/BreakFastListScreen";
import LunchListScreen from "./screens/tabs/LunchListScreen";
import DinnerListScreen from "./screens/tabs/DinnerListScreen";
import EditRatingScreen from "./screens/tabs/EditRatingScreen";
import {DateProvider} from "./context/date-context";
import UserListScreen from "./screens/tabs/UserListScreen";

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
            width: 80,
            height: 80,
            borderRadius: 35,
            borderWidth: 4,
            borderColor: '#ffc7c7',
            backgroundColor: '#ffd9d9',
            ...Platform.select({
                ios: {
                    shadowColor: 'black',
                    shadowOpacity: 0.25,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 8,
                    overflow: 'visible',
                },
                android: {
                    elevation: 8,
                    overflow: 'hidden',
                },
            }),
        }}
        >
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

                tabBarActiveTintColor: '#b16767',

                headerTintColor: 'black',

                headerStyle: {

                    backgroundColor: COLORS.BGColor

                },

                tabBarStyle: {
                    backgroundColor: COLORS.BGColor,

                    height: Platform.OS === 'android' ? 80 : 100,
                    ...Platform.select({
                        ios: {
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                        },
                        android: {
                            elevation: 8,
                            shadowColor: 'black',
                            shadowOpacity: 0.15,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                        },

                    }),

                },


            }}
            sceneContainerStyle={{backgroundColor: COLORS.BGColor}}

        >
            <Tab.Screen
                name="What To Cook Today?"
                component={CategoriesScreen}
                options={({ navigation }) => ({


                    headerStyle: {
                        backgroundColor: COLORS.BGColor,
                    },
                    ...Platform.select({
                        android: {
                            headerStyle: {
                                backgroundColor: COLORS.BGColor,
                                elevation: 0, // Hide shadow on Android
                            },
                        },
                        ios: {
                            headerShadowVisible: false, // Hide shadow on iOS
                        },
                    }), // Close the Platform.select
                    tabBarLabel: 'Discover',
                    tabBarLabelStyle: {
                        fontSize: 15, // Set the font size as needed
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "bold",
                    },

                    tabBarIcon: ({color, size}) => (
                        <Ionicons name="earth" color={color} size={40}/>
                    ),
                })}

            />

            <Tab.Screen
                name="MealPlan"
                component={MealPlanScreen}
                options={({ navigation }) => ({
                    headerShown: false,
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
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" color={color} size={40} />
                    ),
                    tabBarLabel: 'Meal Plan',
                    tabBarLabelStyle: {
                        fontSize: 15, // Set the font size as needed
                    },

                })}
            />



            <Tab.Screen
                name="MyFoodie"
                component={MyFoodieScreen}
                options={{

                    tabBarLabel: '',

                    tabBarIcon: () => (

                        <Image
                            source={require('./assets/Strawberry.png')}
                            resizeMode="contain"
                            style={{
                                marginTop: 10,
                                width: 60,
                                height: 60,

                            }}
                        />
                    ),
                    tabBarButton: (props) => (
                        <CustomTabBarButton {...props} />
                    ),


                    headerStyle: {
                        backgroundColor: COLORS.BGColor,
                    },
                    ...Platform.select({
                        android: {
                            headerStyle: {
                                backgroundColor: COLORS.BGColor,
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
                                icon="filter"
                                color= 'black'
                                size={30}
                                onPress={null}
                            />
                        </View>
                    ),

                    headerTitle: "",
                }}
            />

            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={({ navigation }) => ({


                    headerTitle: "",

                    headerLeft: () => (
                        <View style={{ paddingLeft: 20 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
                                Favorite Meals
                            </Text>
                        </View>
                    ),


                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" color={color} size={40} />
                    ),
                    tabBarLabel: 'Favorites',
                    tabBarLabelStyle: {
                        fontSize: 15, // Set the font size as needed
                    },

                })}
            />



            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={40} />

                    ),
                    tabBarLabel: 'Profile',
                    tabBarLabelStyle: {
                        fontSize: 15, // Set the font size as needed
                    },
                }}
            />




        </Tab.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: COLORS.BGColor },
                headerTintColor: 'black',
                contentStyle: { backgroundColor: COLORS.BGColor },
                tabBarVisible: false

            }}

        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: COLORS.BGColor,
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
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: COLORS.BGColor,
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


function AuthenticatedStack() {
    return (
            <Stack.Navigator
                screenOptions={{
                    headerStyle: { backgroundColor: COLORS.BGColor },
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
                        headerShown: true
                    }}
                />


                <Stack.Screen
                    name="ProfileScreen"
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
                            backgroundColor: COLORS.BGColor,
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
                    name="Followers"
                    component={FollowersListScreen} />

                <Stack.Screen
                    name="Following"
                    component={FollowingListScreen} />

                <Stack.Screen
                    name="BreakFastList"
                    component={BreakFastListScreen} />

                <Stack.Screen
                    name="LunchList"
                    component={LunchListScreen} />

                <Stack.Screen
                    name="DinnerList"
                    component={DinnerListScreen} />
                <Stack.Screen
                    name="EditRating"
                    component={EditRatingScreen} />



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
                                backgroundColor: COLORS.BGColor,
                            },
                            ...Platform.select({
                                android: {
                                    headerStyle: {
                                        backgroundColor: COLORS.BGColor,
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


                <Stack.Screen
                    name="UserProfile"
                    component={UserProfileScreen}
                    options={{
                        headerTitle: "",
                    }}
                />

                <Stack.Screen
                    name="UserList"
                    component={UserListScreen}
                    options={{
                        headerTitle: "User List",
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
//            await SplashScreen.preventAutoHideAsync(); // Call it here
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
                <DateProvider>
                    <FavoritesContextProvider>
                        {isLoading ? <Splash setIsLoading={setIsLoading}/> : <Root/>}
                    </FavoritesContextProvider>
                </DateProvider>
            </AuthContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
});
