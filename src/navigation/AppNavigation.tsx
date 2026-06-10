import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { BottomTabParamList, RootStackParamList } from './types';
import { theme } from '../theme/theme';
import { styles } from './style';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { TasteProfileScreen } from '../screens/TasteProfileScreen/TasteProfileScreen';
import { CustomTabBar } from './CustomTabBar';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.colors.background,
    card: theme.colors.background,
    primary: theme.colors.accent,
    text: theme.colors.text,
  },
};

// Prevent white flash on navigation by setting the global background
const NAVIGATION_CONTAINER_STYLE = { backgroundColor: theme.colors.background };

function EmptyTabScreen() {
  return <View style={styles.placeholder}>
    <Text style={{color:'white'}}>Hello world</Text>
  </View>;
}

import { OnboardingDataScreen } from '../screens/OnboardingDataScreen/OnboardingDataScreen';

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.background },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="FAQ" component={EmptyTabScreen} />
      <Tab.Screen name="TasteProfile" component={TasteProfileScreen} />
      <Tab.Screen name="Search" component={EmptyTabScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade',
          contentStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="OnboardingData"
          component={OnboardingDataScreen}
          options={{ animation: 'slide_from_right' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
