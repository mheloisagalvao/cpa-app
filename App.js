import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Routes from './src/routes';
import { ThemeProvider } from 'styled-components';
import theme from './src/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
          <Routes />
    </ThemeProvider>
  );
}

