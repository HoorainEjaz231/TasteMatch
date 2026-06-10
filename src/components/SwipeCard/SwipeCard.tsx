import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { StartCard } from '../StartCard/StartCard';
import { styles } from './style';
import { SwipeDirection } from '../../store/tasteProfileSlice';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const VERTICAL_THRESHOLD = SCREEN_HEIGHT * 0.15;

interface SwipeCardProps {
  food: { id: number; name: string; image: string };
  onSwipe: (direction: SwipeDirection) => void;
  isTopCard: boolean;
  swipeTrigger?: SwipeDirection | null;
}

export function SwipeCard({ food, onSwipe, isTopCard, swipeTrigger }: SwipeCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (swipeTrigger && isTopCard) {
      // Programmatic swipe
      if (swipeTrigger === 'left') {
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 400 }, () => runOnJS(onSwipe)('left'));
      } else if (swipeTrigger === 'right') {
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 400 }, () => runOnJS(onSwipe)('right'));
      } else if (swipeTrigger === 'up') {
        translateY.value = withTiming(-SCREEN_HEIGHT * 1.5, { duration: 400 }, () => runOnJS(onSwipe)('up'));
      } else if (swipeTrigger === 'down') {
        translateY.value = withTiming(SCREEN_HEIGHT * 1.5, { duration: 400 }, () => runOnJS(onSwipe)('down'));
      }
    }
  }, [swipeTrigger, isTopCard]);

  const panGesture = Gesture.Pan()
    .enabled(isTopCard)
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      const absX = Math.abs(event.translationX);
      const absY = Math.abs(event.translationY);

      if (absX > absY) {
        if (event.translationX > SWIPE_THRESHOLD) {
          translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 }, () => runOnJS(onSwipe)('right'));
        } else if (event.translationX < -SWIPE_THRESHOLD) {
          translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 }, () => runOnJS(onSwipe)('left'));
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      } else {
        if (event.translationY > VERTICAL_THRESHOLD) {
          translateY.value = withTiming(SCREEN_HEIGHT * 1.5, { duration: 300 }, () => runOnJS(onSwipe)('down'));
        } else if (event.translationY < -VERTICAL_THRESHOLD) {
          translateY.value = withTiming(-SCREEN_HEIGHT * 1.5, { duration: 300 }, () => runOnJS(onSwipe)('up'));
        } else {
          translateX.value = withSpring(0);
          translateY.value = withSpring(0);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [-10, 0, 10],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  return (
    <View style={styles.cardContainer} pointerEvents="box-none">
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <StartCard style={styles.card} contentStyle={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Image 
                source={food.image} 
                style={styles.image} 
                cachePolicy="memory-disk"
                contentFit="cover"
              />
            </View>
            <Text style={styles.foodText}>I love eating {food.name.toLowerCase()}</Text>
          </StartCard>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
