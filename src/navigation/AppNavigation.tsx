import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { BottomTabParamList, RootStackParamList } from './types';
import { theme } from '../theme/theme';
import { styles } from './style';
import { Safeinsets } from '../utils/scale';


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

function EmptyTabScreen() {
  return <View style={styles.placeholder}>
    <Text style={{color:'white', paddingTop:Safeinsets('top')}}>Hello world</Text>
  </View>;
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.colors.background },
      }}
      
    >
      <Tab.Screen name="Start" component={EmptyTabScreen} />
      <Tab.Screen name="FAQ" component={EmptyTabScreen} />
      <Tab.Screen name="TasteProfile" component={EmptyTabScreen} />
      <Tab.Screen name="Search" component={EmptyTabScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade_from_bottom',
          contentStyle: { backgroundColor: theme.colors.background },
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
