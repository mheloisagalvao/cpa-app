import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


const PressableScale = ({ children, onPress, style }) => {
  const active = useSharedValue(false);

  const gesture = Gesture.Tap()
    .maxDuration(4000)
    .onTouchesDown(() => {
      active.value = true;
    })
    .onTouchesUp(() => {
      if (onPress != null) runOnJS(onPress)();
    })
    .onFinalize(() => {
      active.value = false;
    });

  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active.value ? 0.92 : 1),
        },
      ],
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, rAnimatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export { PressableScale };
