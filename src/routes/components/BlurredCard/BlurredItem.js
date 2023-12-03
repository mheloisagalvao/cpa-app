import {
  BlurMask,
  Canvas,
  Extrapolate,
  Group,
  LinearGradient,
  RoundedRect,
  interpolate,
} from '@shopify/react-native-skia';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import { Text, View, Image } from 'react-native';
import pavao from '../../../assets/0_Estrelas.png'

const BlurredItem = ({
  index,
  horizontalPadding = 60,
  verticalPadding = 90,
  width,
  height: blurredItemContainerHeight,
  contentOffsetY,
  post
}) => {
  const inputRange = [
    (index - 1) * blurredItemContainerHeight,
    index * blurredItemContainerHeight,
    (index + 1) * blurredItemContainerHeight,
    (index + 2) * blurredItemContainerHeight,
  ];

  const blurOutputRange = [0.1, 0.1, 40, 0.1];

  const blur = useDerivedValue(() => {
    return interpolate(
      contentOffsetY.value,
      inputRange,
      blurOutputRange,
      Extrapolate.CLAMP,
    );
  }, []);

  const rContainerStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      contentOffsetY.value,
      inputRange,
      [0, 0, Math.PI / 20, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          rotate: `${rotate}rad`,
        },
      ],
    };
  }, []);

  const transformGroup = useDerivedValue(() => {
    const scale = interpolate(
      contentOffsetY.value,
      inputRange,
      [0.8, 1, 0.8, 1],
      Extrapolate.CLAMP,
    );
    return [
      {
        scale,
      },
    ];
  }, []);

  return (
    <View style={{ position: 'relative' }}>
      <Canvas
        style={{
          width: width,
          height: blurredItemContainerHeight,
        }}>
        <Group
          transform={transformGroup}
          origin={{
            x: width / 2,
            y: 0,
          }}>
          <RoundedRect
            x={horizontalPadding / 2}
            y={verticalPadding / 8}
            width={width - horizontalPadding}
            height={blurredItemContainerHeight - 50}
            r={20}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: width, y: blurredItemContainerHeight }}
              colors={['#7D1F2A', '#cc3244']}
            />
          </RoundedRect>
          <BlurMask blur={blur} />
        </Group>
      </Canvas>
      <View style={{ position: 'absolute', flex: 1, flexDirection: 'row' }}>
        <Text
          style={{
            position: 'absolute',
            top: verticalPadding / 8 + 40,
            left: horizontalPadding / 2 + 10,
            color: '#fff',
            fontSize: 14,
            padding: 40,
            flexWrap: 'wrap',
          }}>
          {post.excerpt}
        </Text>
      </View>

      <Text
        style={{
          position: 'absolute',
          left: horizontalPadding / 2 + 10,
          color: '#fff',
          fontSize: 14,
          padding: 40,
        }}>
        {post.title}
      </Text>
      <Text
        style={{
          position: 'absolute',
          top: verticalPadding / 8 + 8,
          left: horizontalPadding / 2 + 10,
          color: '#fff',
          fontSize: 14,
          padding: 40,
        }}>
        {post.rating} / 5
      </Text>
    </View>
  );
};

export { BlurredItem };