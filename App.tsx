import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';

import { AppNavigator } from "./src/navigation/AppNavigation";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from './src/store/store';

export default function App() {
  const [fontsLoaded] = useFonts({
    SFPro: require('./src/assets/fonts/SFPro.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#0A0A0F' }}>
          <AppNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}
