import { MotiView, motify } from "moti";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Color from "color";

import { ActivityIndicator } from "./activity-indicator";

const MotifiedAnimatedText = motify(Animated.Text)();

const LoadingButton = ({
  onPress,
  style,
  status,
  colorFromStatusMap,
  titleFromStatusMap,
}) => {
  const isActive = useSharedValue(false);

  const gesture = Gesture.Tap()
    .maxDuration(4000)
    .onTouchesDown(() => {
      isActive.value = true;
    })
    .onTouchesUp(() => {
      if (onPress) {
        runOnJS(onPress)();
      }
    })
    .onFinalize(() => {
      isActive.value = false;
    });

  const scale = useDerivedValue(() => {
    return withSpring(isActive.value ? 0.9 : 1);
  });

  const activeColor = useMemo(() => {
    return colorFromStatusMap?.[status ?? "idle"];
  }, [colorFromStatusMap, status]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  }, []);

  return (
    <>
      <GestureDetector gesture={gesture}>
        <Animated.View layout={Layout.duration(500)} style={rStyle}>
          <MotiView
            transition={{
              type: "timing",
              duration: 1000,
            }}
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              },
              style,
            ]}
            animate={{
              backgroundColor: Color(activeColor).lighten(0.6).hex(),
            }}
          >
            <ActivityIndicator status={status} color={activeColor} />

            <MotifiedAnimatedText
              entering={FadeIn}
              exiting={FadeOut}
              transition={{
                type: "timing",
                duration: 1000,
              }}
              animate={{
                color: activeColor,
              }}
              style={[styles.title]}
            >
              {titleFromStatusMap?.[status ?? "idle"]}
            </MotifiedAnimatedText>
          </MotiView>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export { LoadingButton };
