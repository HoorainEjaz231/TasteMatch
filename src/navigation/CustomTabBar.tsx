import { ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Carrot, CircleHelp, Home, LucideProps, Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';


import { theme } from '../theme/theme';
import { normalize, verticalScale } from '../utils/scale';
import { styles } from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeBlurView } from '../utils/SafeBlurView';

const GRADIENT_COLORS: [string, string, string,string] = [
   'rgba(255, 255, 255, 0.34)',  // top-left: bright
    'rgba(255,255,255,0.00)',  // fades out early
    'rgba(255,255,255,0.00)',  // stays transparent (covers top-right & bottom-left)
    'rgba(255, 255, 255, 0.53)',  // bottom-right: bright
];

const tabMeta: Record<string, { label: string; Icon: ComponentType<LucideProps> }> = {
  HomeScreen:   { label: 'Start',         Icon: Home },
  FAQ:          { label: 'FAQ',           Icon: CircleHelp },
  TasteProfile: { label: 'Taste Profile', Icon: Carrot },
  Search:       { label: 'Search',        Icon: Search },
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const pillRoutes = state.routes.filter((route) => route.name !== 'Search');
  const searchRoute = state.routes.find((route) => route.name === 'Search');

  const renderTab = (route: (typeof state.routes)[number]) => {
    const focused = state.index === state.routes.findIndex((item) => item.key === route.key);
    const { options } = descriptors[route.key];
    const { Icon, label } = tabMeta[route.name];

    const handlePress = () => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
    };

    return (
      <Pressable
        accessibilityLabel={options.tabBarAccessibilityLabel}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        key={route.key}
        onPress={handlePress}
        style={[styles.tabItem, focused && styles.tabItemFocused]}
      >
        <Icon
          color={focused ? theme.colors.accent : theme.colors.tabInactive}
          size={normalize(route.name === 'FAQ' ? 22 : 20)}
          strokeWidth={route.name === 'FAQ' ? 2.6 : 2.8}
        />
        <TabLabel focused={focused} label={label} />
      </Pressable>
    );
  };

  return (
    <View pointerEvents="box-none" style={[styles.tabBarRoot, { bottom: insets.bottom + verticalScale(20) }]}>

      {/* Pill with gradient border */}
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={styles.tabPillGradient}
        pointerEvents="box-none"
      >
        <View style={styles.tabPill} pointerEvents="box-none">
          <SafeBlurView intensity={28} tint="dark" style={styles.tabPillBlur}>
            <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0, 0, 0, 0.95)' }]} />
            {pillRoutes.map(renderTab)}
          </SafeBlurView>
        </View>
      </LinearGradient>

      {/* Search circle with gradient border */}
      {searchRoute ? (
        <LinearGradient
          colors={GRADIENT_COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.searchGradient}
        >
          <Pressable
            accessibilityLabel="Search"
            accessibilityRole="button"
            onPress={() => navigation.navigate(searchRoute.name)}
            style={styles.searchButton}
          >
            <SafeBlurView  intensity={28} tint="dark" style={styles.searchBlur}>
              <View pointerEvents="none" style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0, 0, 0, 0.95)' }]} />
              <Search color={theme.colors.tabInactive} size={normalize(31)} strokeWidth={1.5} />
            </SafeBlurView>
          </Pressable>
        </LinearGradient>
      ) : null}
    </View>
  );
}

function TabLabel({ focused, label }: { focused: boolean; label: string }) {
  return <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>{label}</Text>;
}