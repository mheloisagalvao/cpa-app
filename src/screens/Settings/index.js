import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, {
  Easing,
  Extrapolate,
  FadeIn,
  FadeOut,
  Layout,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { PressableScale } from '../../routes/components/TouchableScale';
import { ActionTray } from '../../routes/components/ActionTray';
import { colors } from '../../utils/colors';
import Rating from '../../routes/components/Rating';

function Settings() {
  const ref = useRef(null);
  const { height: screenHeight } = useWindowDimensions();

  const [step, setStep] = useState(0);

  const isActionTrayOpened = useSharedValue(false);

  const close = useCallback(() => {
    ref.current?.close();
    isActionTrayOpened.value = false;
    setStep(0);
  }, []);

  const toggleActionTray = useCallback(() => {
    const isActive = ref.current?.isActive() ?? false;
    isActionTrayOpened.value = !isActive;
    isActive ? close() : ref.current?.open();
  }, [close, isActionTrayOpened]);

  const rContentHeight = useDerivedValue(() => {
    return interpolate(step, [0, 1, 2], [80, 80, 80], Extrapolate.CLAMP);
  }, [step]);

  const rContentStyle = useAnimatedStyle(() => {
    return {
      height: withSpring(rContentHeight.value),
    };
  }, []);

  const title = useMemo(() => {
    switch (step) {
      case 0:
        return 'Qual matéria vai avaliar?';
      case 1:
        return 'Qual sua avaliação da matéria?';
      case 2:
        return 'Quantos pavãozinhos você daria para essa matéria?';
      default:
        return '';
    }
  }, [step]);

  const actionTitle = useMemo(() => {
    switch (step) {
      case 0:
        return 'Continuar';
      case 1:
        return 'Continuar';
      case 2:
        return 'Enviar';
      default:
        return '';
    }
  }, [step]);

  const rToggleButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isActionTrayOpened.value ? '45deg' : '0deg'),
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 15,}}>
        <PressableScale
        style={[styles.button, rToggleButtonStyle]}
        onPress={toggleActionTray}>
        <MaterialCommunityIcons
          name="plus"
          size={25}
          color={colors.Palette.background}
        />
      </PressableScale>
      </View>


      <ActionTray
        ref={ref}
        maxHeight={screenHeight * 0.6}
        style={styles.actionTray}
        onClose={close}
        >
        
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>{title}</Text>
          <View style={styles.fill} />
          <PressableScale onPress={close} style={styles.closeButton}>
            <MaterialCommunityIcons
              name="close-thick"
              size={15}
              color={colors.Palette.text}
            />
          </PressableScale>
        </View>

        <Animated.View style={rContentStyle}>
          {step === 0 && (
            <Animated.Text
              layout={Layout.easing(Easing.linear).duration(250)}
              exiting={FadeOut.delay(100)}
              style={styles.contentText}>
              Content here
            </Animated.Text>
          )}
          {step === 1 && (
            <Animated.View
              layout={Layout.easing(Easing.linear).duration(250)}
              entering={FadeIn.delay(100)}
              exiting={FadeOut.delay(100)}
              style={{ flex: 1 }}>
              <Text style={styles.contentText}>
                You know what? I really don't know what to write here.{'\n\n'}I
                just want to make this text long enough to test the animation.
                So I am just typing some random words here.{'\n'}I hope this is
                enough.
              </Text>
            </Animated.View>
          )}
          {step === 2 && (
            <Animated.View
              layout={Layout.easing(Easing.linear).duration(250)}
              entering={FadeIn.delay(100)}
              exiting={FadeOut.delay(100)}
              style={{ flex: 1 }}>
              {/* <Text style={styles.contentText}>
                Waaait a second! Actually I have something to say.{'\n\n'}
                If you are reading this, you're probably searching for the
                source code!{'\n\n'}
                If I'm right, you can find it here:{'\n'}
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'rgba(0,0,0,0.5)',
                  }}>
                  patreon.com/reactiive
                </Text>
              </Text> */}

              <Rating />
            </Animated.View>
          )}
        </Animated.View>

        <PressableScale
          style={styles.continueButton}
          onPress={() => {
            if (step === 2) {
              close();
              return;
            }
            setStep(currentStep => currentStep + 1);
          }}>
          <Text style={styles.buttonText}>{actionTitle}</Text>
        </PressableScale>
      </ActionTray>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fill: { flex: 1 },
  button: {
    marginTop: '100%',
    height: 50,
    backgroundColor: colors.unicap,
    borderRadius: 25,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTray: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 25,
    position: 'relative',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    height: 24,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: colors.Palette.surface,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentText: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 25,
    fontWeight: '600',
    color: colors.Palette.text,
  },
  continueButton: {
    backgroundColor: colors.unicap,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 25,
  },
  buttonText: {
    color: colors.Palette.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Settings;
