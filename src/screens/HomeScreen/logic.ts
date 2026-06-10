import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { RootStack } from '../../navigation/types';
import { RootState } from '../../store/store';
import { resetProfile } from '../../store/tasteProfileSlice';

export function useLogic() {
  const navigation = useNavigation<RootStack>();
  const dispatch = useDispatch();
  const headerProgress = useSharedValue(0);
  const cardProgress = useSharedValue(0);

  const { currentIndex, isFinished } = useSelector(
    (state: RootState) => state.tasteProfile
  );

  const hasStarted = currentIndex > 0 || isFinished;
  const ctaLabel = isFinished
    ? 'Restart Swiping'
    : hasStarted
    ? 'Continue Swiping'
    : 'Start Swiping';

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
    if (isFinished) {
      dispatch(resetProfile());
    }
    navigation.navigate('OnboardingData');
  };

  return {
    Animated,
    cardAnimatedStyle,
    ctaLabel,
    handleBack,
    handleStart,
    headerAnimatedStyle,
  };
}
