import React from "react";
import {StyleSheet, View, Dimensions, Text, Platform} from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";

import Slide from "../Skip/Slide";
import COLORS from "../../constants/colors";

const { width } = Dimensions.get("window");

const slides = [
    {
        color: "#39ffb4",
        picture: require("../../assets/2.png"),
        aspectRatio: 500.5 / 429.5,
        TitleText: "Healthy Foods",
        text:
            "Discover healthy recipes that are easy to do with detailed cooking instructions from top chefs",
    },
    {
        color: "#ff4a6a",
        picture: require("../../assets/1.png"),
        aspectRatio: 479.75 / 440.5,
        TitleText: "Dessert Recipes",
        text:
            "Hot or cold, our dessert recipes can turn an average meal into a memorable event",

    },
    {
        color: "#ffb439",
        picture: require("../../assets/3.png"),
        aspectRatio: 100 / 80,
        TitleText: "Delicious Drinks",
        text:
            "Sip in style with our top chef-inspired, easy-to-make beverages that redefine the art of drink crafting",
    },
];

const Skip = () => {
    const x = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });


    return (
        <Animated.ScrollView
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            snapToInterval={width}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            horizontal
        >
            {slides.map((slide, index) => {
                const isFirst = index === 0;
                const isLast = index === slides.length - 1;

                return (
                    <View key={index} style={styles.container}>
                        <Slide
                            x={x}
                            index={index}
                            aspectRatio={slide.aspectRatio}
                            picture={slide.picture}
                            colors={[
                                isFirst ? slide.color : slides[index - 1].color,
                                slide.color,
                                isLast ? slide.color : slides[index + 1].color,
                            ]}
                        />
                        <Text style={styles.TitleText}>{slide.TitleText}</Text>
                        <Text style={styles.text}>{slide.text}</Text>

                        {index === 0 && (
                            <View style={styles.firstDotContainer}>
                                <Text style={styles.firstMainDotStyle}></Text>
                                <Text style={styles.firstDotStyle}></Text>
                                <Text style={styles.firstDotStyle}></Text>
                            </View>
                        )}

                        {index === 1 && (
                            <View style={styles.firstDotContainer}>
                                <Text style={styles.firstDotStyle}></Text>
                                <Text style={styles.firstMainDotStyle}></Text>
                                <Text style={styles.firstDotStyle}></Text>
                            </View>
                        )}

                        {index === 2 && (
                            <View style={styles.firstDotContainer}>
                                <Text style={styles.firstDotStyle}></Text>
                                <Text style={styles.firstDotStyle}></Text>
                                <Text style={styles.firstMainDotStyle}></Text>
                            </View>
                        )}

                    </View>
                );
            })}
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.BGColor,
    },
    TitleText: {
        fontSize: 50,
        marginTop: 10,
        fontWeight: "bold",
    },
    text: {
        fontSize: 25,
        marginTop: 10,
    },

    firstDotContainer: {
        marginTop: 35,
        flexDirection: 'row',
        width: 115,
        height: 35,
        borderRadius: 20,
    },

    firstMainDotStyle: {
        flex: 1,
        elevation: 8,
        backgroundColor: COLORS.darkMainColor,
        margin: 5,
        shadowColor: 'black',
        shadowOpacity: 0.75,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

    firstDotStyle: {
        flex: 1,
        elevation: 8,
        backgroundColor: COLORS.mainColor,
        margin: 5,
        shadowColor: 'black',
        shadowOpacity: 0.75,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },

});

export default Skip;
