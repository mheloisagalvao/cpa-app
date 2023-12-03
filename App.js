import React, { useEffect } from 'react';
import Routes from './src/routes';
import { Spinner, TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import { UserProvider } from './src/contexts/userContext';
import { useFonts } from 'expo-font'
import { colors } from './src/utils/colors';



export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      <Spinner large color={colors.unicap} />
    }
  }, [loaded])

  if (!loaded) {
    return null;
  }

  return (
      <TamaguiProvider config={tamaguiConfig}>
        <UserProvider>
          <Routes />
        </UserProvider>
      </TamaguiProvider>
  );
}
