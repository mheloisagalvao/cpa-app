import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet, TextInput } from 'react-native';
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
import { Input } from 'tamagui'
import axios from 'axios';
import { useUser } from '../../contexts/userContext';


function Settings() {

  const [titleInput, setTitleInput] = useState('')
  const [description, setDescription] = useState('')
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const { userData } = useUser();
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
    return interpolate(step, [0, 1, 2], [80, 160, 60], Extrapolate.CLAMP);
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

  const handleSubmit = async () => {
    try {
      const token = userData.token; 

      const response = await axios.post(
        'https://server-gold-pi.vercel.app/posts',
        {
          title: titleInput,
          content: description,
          rating:  selectedRating,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        close();
      } else {
        console.error('Error posting data:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  return (

    <View style={styles.container}>
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 15, }}>
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
            <Animated.View
              layout={Layout.easing(Easing.linear).duration(250)}
              exiting={FadeOut.delay(100)}
              style={styles.contentText}>
              <Input id="titleInput" placeholder="Matéria" value={titleInput} onChangeText={setTitleInput} height={35} width={320} borderWidth={2} borderColor={colors.unicap} />
            </Animated.View>
          )}
          {step === 1 && (
            <Animated.View
              layout={Layout.easing(Easing.linear).duration(250)}
              entering={FadeIn.delay(100)}
              exiting={FadeOut.delay(100)}
              style={{
                flex: 1, marginTop: 15,
                marginBottom: 25,
              }}>
                         <Input id="description" style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                textAlignVertical: 'top',
              }}
                placeholder="Sua avaliação" value={description} onChangeText={setDescription} height={120} width={320} borderWidth={2} borderColor={colors.unicap} multiline />



            </Animated.View>
          )}
          {step === 2 && (
            <Animated.View
              layout={Layout.easing(Easing.linear).duration(250)}
              entering={FadeIn.delay(100)}
              exiting={FadeOut.delay(100)}
              style={{ flex: 1 }}>

              <Rating onRatingChange={handleRatingChange} />
            </Animated.View>
          )}
        </Animated.View>

        <PressableScale
                style={styles.continueButton}
                onPress={() => {
                  if (step === 2) {
                    handleSubmit(); 
                    close();
                    return;
                  }
                  setStep((currentStep) => currentStep + 1);
                }}
        >
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
