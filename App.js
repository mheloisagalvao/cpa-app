import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Routes from './src/routes';
import { ThemeProvider } from 'styled-components';

import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from './tamagui.config';
import { UserProvider } from './src/contexts/userContext';
import SignIn from './src/screens/SignIn';
import Settings from './src/screens/Settings';

export default function App() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <UserProvider>
        <Routes />
      </UserProvider>
    </TamaguiProvider>

  );
}

