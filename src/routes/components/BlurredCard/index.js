import { StyleSheet, View, useWindowDimensions, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  FadeIn,
  Layout,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { BlurredItem } from '../BlurredCard/BlurredItem';

const BlurredCard = () => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const contentOffsetY = useSharedValue(0);

  const blurredItemContainerHeight = windowHeight * 0.45;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      contentOffsetY.value = event.contentOffset.y;
    },
  });

  return (
    <View>

      <Animated.FlatList
        layout={Layout}
        entering={FadeIn}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={new Array(10).fill(0).map((_, index) => index)}
        getItemLayout={(_, index) => {
          return {
            length: windowHeight,
            offset: blurredItemContainerHeight * index,
            index,
          };
        }}
        renderItem={({ index }) => (
          <BlurredItem
            width={windowWidth}
            height={280}
            index={index}
            contentOffsetY={contentOffsetY}
          />
        )}
      />
    </View>
  );
};

export { BlurredCard };
