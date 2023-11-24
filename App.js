import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Routes from './src/routes';
import { ThemeProvider } from 'styled-components';
import Login from './src/screens/Login';

import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from './tamagui.config';

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
          <Routes />
        </TamaguiProvider>

  );
}

