import React from 'react';
import { FlatList, Text } from 'react-native';
import { CircularCarouselListItem, ListItemWidth } from './list-item';
import { useSharedValue } from 'react-native-reanimated';

const CircularCarousel = ({ data, textData }) => {
    const contentOffset = useSharedValue(0);

    return (
        <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            scrollEventThrottle={16}
            onScroll={(event) => {
                contentOffset.value = event.nativeEvent.contentOffset.x;
            }}
            pagingEnabled
            snapToInterval={ListItemWidth}
            style={{
                position: 'absolute',
                bottom: 0,
                height: 300,
            }}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 1.5 * ListItemWidth,
            }}
            horizontal
            renderItem={({ item, index }) => {
                return (
                    <CircularCarouselListItem
                        contentOffset={contentOffset}
                        imageSrc={item}
                        text={textData[index]} // Pass the corresponding text
                        index={index}
                    />
                );
            }}
        />
    );
};

export { CircularCarousel };