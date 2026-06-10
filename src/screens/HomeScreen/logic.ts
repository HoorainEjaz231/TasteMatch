import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export function useLogic() {
  const navigation = useNavigation();
  const headerProgress = useSharedValue(0);
  const cardProgress = useSharedValue(0);

  useEffect(() => {
    headerProgress.value = withTiming(1, {
      duration: 520,
      easing: Easing.out(Easing.cubic),
    });
    cardProgress.value = withDelay(
      120,
      withTiming(1, {
        duration: 620,
        easing: Easing.out(Easing.cubic),
      }),
    );
  }, [cardProgress, headerProgress]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerProgress.value,
    transform: [{ translateY: (1 - headerProgress.value) * -12 }],
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardProgress.value,
    transform: [{ translateY: (1 - cardProgress.value) * 22 }],
  }));

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleStart = () => {
    // Swipe deck navigation will be connected when the second screen is implemented.
  };

  return {
    Animated,
    cardAnimatedStyle,
    handleBack,
    handleStart,
    headerAnimatedStyle,
  };
}
