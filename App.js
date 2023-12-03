import React from 'react';
import Routes from './src/routes';
import { QueryClient, QueryClientProvider } from 'react-query'; 
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import { UserProvider } from './src/contexts/userContext';

import Home from './src/screens/Home';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <UserProvider>
          <Routes />
        </UserProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
