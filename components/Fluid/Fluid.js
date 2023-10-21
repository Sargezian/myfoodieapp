import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";

import Slide from "./Slide";

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

const Fluid = () => {
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
        backgroundColor: "white",
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
});

export default Fluid;
