import React, { useCallback, useImperativeHandle } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Backdrop } from './Backdrop';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ActionTray = React.forwardRef(
  ({ children, style, maxHeight = SCREEN_HEIGHT, onClose }, ref) => {
    const translateY = useSharedValue(maxHeight);
    const MAX_TRANSLATE_Y = -maxHeight;
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination) => {
      'worklet';
      active.value = destination !== maxHeight;

      translateY.value = withSpring(destination, {
        mass: 0.4,
      });
    }, []);

    const close = useCallback(() => {
      'worklet';
      return scrollTo(maxHeight);
    }, [maxHeight, scrollTo]);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          'worklet';
          scrollTo(0);
        },
        close,
        isActive: () => {
          return active.value;
        },
      }),
      [close, scrollTo, active.value],
    );

    const context = useSharedValue({ y: 0 });

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        if (event.translationY > -50) {
          translateY.value = event.translationY + context.value.y;
        }
      })
      .onEnd((event) => {
        if (event.translationY > 100) {
          if (onClose) {
            runOnJS(onClose)();
          } else close();
        } else {
          scrollTo(context.value.y);
        }
      });

    const rActionTrayStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP,
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    return (
      <>
        <Backdrop onTap={onClose ?? close} isActive={active} />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.actionTrayContainer, rActionTrayStyle, style]}>
            <Animated.View>{children}</Animated.View>
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

const styles = StyleSheet.create({
  actionTrayContainer: {
    backgroundColor: '#FFF',
    width: '95%',
    position: 'absolute',
    bottom: 30,
    borderCurve: 'continuous',
    alignSelf: 'center',
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  fill: { flex: 1 },
});

export { ActionTray };
