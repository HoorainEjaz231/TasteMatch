import { NativeStackNavigationProp, NativeStackNavigatorProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  MainTabs: undefined;
  OnboardingData: undefined;
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  FAQ: undefined;
  TasteProfile: undefined;
  Search: undefined;
};

export type RootStack = NativeStackNavigationProp<RootStackParamList>