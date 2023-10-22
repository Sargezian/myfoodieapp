import React from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import {textData} from "../../screens/tabs/TestScreen";

const { width: windowWidth } = Dimensions.get('window');

export const ListItemWidth = windowWidth / 4;

const CircularCarouselListItem = ({
                                      imageSrc,
                                      text,
                                      index,
                                      contentOffset,
                                  }) => {
    const navigation = useNavigation();

    const rStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 2) * ListItemWidth,
            (index - 1) * ListItemWidth,
            index * ListItemWidth,
            (index + 1) * ListItemWidth,
            (index + 2) * ListItemWidth,
        ];

        const translateYOutputRange = [
            0,
            -ListItemWidth / 3,
            -ListItemWidth / 2,
            -ListItemWidth / 3,
            0,
        ];

        const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

        const scaleOutputRange = [0.7, 0.8, 1, 0.8, 0.7];

        const translateY = interpolate(
            contentOffset.value,
            inputRange,
            translateYOutputRange,
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            contentOffset.value,
            inputRange,
            opacityOutputRange,
            Extrapolate.CLAMP
        );

        const scale = interpolate(
            contentOffset.value,
            inputRange,
            scaleOutputRange,
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [
                {
                    translateY: translateY,
                },
                {
                    scale,
                },
            ],
        };
    });

    const ScreenNames = {
        'Discover': 'CategoriesScreen',
        'MyFoodie': 'MyFoodieScreen',
        'Favorites': 'FavoritesScreen',
        'MealPlan': 'MealPlanScreen',
        'Tester': 'TestScreen',
    };

    const handleImagePress = () => {
        if (index >= 0 && index < textData.length) {
            const text = textData[index];
            const screenName = ScreenNames[text];
            if (screenName) {
                console.log(`Navigating to ${screenName}`);
                navigation.navigate(screenName);
            } else {
                console.log(`Screen name not found for text: ${text}`);
            }
        }
    };


    return (
        <TouchableOpacity onPress={handleImagePress}>
            <Animated.View
                style={[
                    {
                        width: ListItemWidth,
                        aspectRatio: 1,
                        elevation: 5,
                        shadowOpacity: 0.2,
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowRadius: 20,
                    },
                    rStyle,
                ]}
            >
                <Image
                    source={imageSrc}
                    style={{
                        margin: 3,
                        height: ListItemWidth,
                        width: ListItemWidth,
                        borderRadius: 200,
                        borderWidth: 2,
                        borderColor: 'white',
                    }}
                />
                <Text style={{ textAlign: 'center' }}>{text}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

export { CircularCarouselListItem };
