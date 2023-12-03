import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { useRef } from 'react';

import { LoadingButton } from '../../routes/components/LoadingButton';

const wait = async (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const App = () =>{
  const i = useRef(0);

  const { status, mutateAsync, reset } = useMutation(
    async () => {
      if (i.current % 2 === 0) {
        i.current++;
        return wait(2000);
      }
      await wait(2000);
      i.current++;
      throw new Error('Transaction Unsafe');
    },
    {
      onSuccess: async () => {
        wait(1500).then(() => {
          reset();
        });
      },
      onError: async () => {
        wait(1500).then(() => {
          reset();
        });
      },
    },
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LoadingButton
        status={status}
        onPress={async () => {
          await mutateAsync();
        }}
        style={{
          height: 60,
          borderRadius: 25,
        }}
        colorFromStatusMap={{
          idle: '#47A1E6',
          loading: '#47A1E6',
          success: '#5BC682',
          error: '#CD5454',
        }}
        titleFromStatusMap={{
          idle: 'Confirmar',
          loading: 'Enviando...',
          success: 'Confirmado!',
          error: 'Erro',
        }}
      />
    </View>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 5000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      suspense: false,
      useErrorBoundary: false,
    },
  },
});

const AppContainer = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { AppContainer as App };
