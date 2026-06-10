import { useFonts } from 'expo-font';
import { Text, View } from 'react-native';

import { AppNavigator } from "./src/navigation/AppNavigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    SFPro: require('./src/assets/fonts/SFPro.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <AppNavigator />
  );
}
