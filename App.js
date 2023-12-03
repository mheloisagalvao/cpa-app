import React from 'react';
import Routes from './src/routes';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import { UserProvider } from './src/contexts/userContext';

import Home from './src/screens/Home';


export default function App() {
  return (
      <TamaguiProvider config={tamaguiConfig}>
        <UserProvider>
          <Routes />
        </UserProvider>
      </TamaguiProvider>
  );
}
