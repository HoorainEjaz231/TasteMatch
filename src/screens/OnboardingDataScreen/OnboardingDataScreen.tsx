import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { X, Heart, Star, HelpCircle, ChevronLeft, Undo2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootState } from '../../store/store';
import { rateFood, undoRating, SwipeDirection } from '../../store/tasteProfileSlice';
import { SwipeCard } from '../../components/SwipeCard/SwipeCard';
import { SafeBlurView } from '../../utils/SafeBlurView';
import { theme } from '../../theme/theme';
import { normalize, scale } from '../../utils/scale';
import { styles } from './style';

export function OnboardingDataScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { foodData, currentIndex, isFinished } = useSelector((state: RootState) => state.tasteProfile);
  const [swipeTrigger, setSwipeTrigger] = useState<SwipeDirection | null>(null);

  const handleSwipe = (direction: SwipeDirection) => {
    setSwipeTrigger(null); // reset
    const foodId = foodData[currentIndex].id;
    let rating: 'disliked' | 'liked' | 'superliked' | 'notsure' = 'notsure';
    if (direction === 'left') rating = 'disliked';
    if (direction === 'right') rating = 'liked';
    if (direction === 'up') rating = 'superliked';
    if (direction === 'down') rating = 'notsure';

    dispatch(rateFood({ foodId, rating }));
  };

  const triggerSwipe = (direction: SwipeDirection) => {
    if (swipeTrigger === null) {
      setSwipeTrigger(direction);
    }
  };

  const handleUndo = () => {
    dispatch(undoRating());
    setSwipeTrigger(null);
  };

  const progressPercentage = foodData.length > 0 ? ((currentIndex) / foodData.length) * 100 : 0;

  if (isFinished) {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 20 }]}>
        <View style={styles.header}>
          <LinearGradient
            colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.22)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.backButtonGradient}
          >
            <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.backButton}>
              <SafeBlurView intensity={30} tint="dark" style={styles.backBlur}>
                <ChevronLeft color={theme.colors.textMuted} size={normalize(27)} strokeWidth={1.5} />
              </SafeBlurView>
            </Pressable>
          </LinearGradient>
        </View>
        <Text style={styles.finishedText}>All done for now!</Text>
        <LinearGradient
          colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.22)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.undoAloneGradient}
        >
          <Pressable onPress={handleUndo} style={styles.undoAloneButton}>
            <SafeBlurView intensity={30} tint="dark" style={styles.undoAloneBlur}>
              <Undo2 color={theme.colors.text} size={normalize(22)} strokeWidth={2} />
              <Text style={styles.undoText}>Undo Last</Text>
            </SafeBlurView>
          </Pressable>
        </LinearGradient>
      </View>
    );
  }

  const cardsToRender = foodData.slice(currentIndex, currentIndex + 3).reverse();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 20 }]}>
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.22)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.backButtonGradient}
        >
          <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.backButton}>
            <SafeBlurView intensity={30} tint="dark" style={styles.backBlur}>
              <ChevronLeft color={theme.colors.textMuted} size={normalize(27)} strokeWidth={1.5} />
            </SafeBlurView>
          </Pressable>
        </LinearGradient>
        
        {/* Undo Button in header — same glass effect as back button */}
        <LinearGradient
          colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.22)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.backButtonGradient}
        >
          <Pressable
            accessibilityRole="button"
            onPress={handleUndo}
            disabled={currentIndex === 0}
            style={styles.backButton}
          >
            <SafeBlurView intensity={30} tint="dark" style={styles.backBlur}>
              <Undo2
                color={currentIndex > 0 ? theme.colors.text : theme.colors.textMuted}
                size={normalize(22)}
                strokeWidth={2}
              />
            </SafeBlurView>
          </Pressable>
        </LinearGradient>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
      </View>

      {/* Cards Area */}
      <View style={styles.cardsArea}>
        {cardsToRender.map((food, i) => {
          const isTopCard = food.id === foodData[currentIndex].id;
          return (
            <SwipeCard
              key={food.id}
              food={food}
              onSwipe={handleSwipe}
              isTopCard={isTopCard}
              swipeTrigger={isTopCard ? swipeTrigger : null}
            />
          );
        })}
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <View style={styles.actionWrapper}>
          <Pressable style={[styles.actionButton, styles.buttonDislike]} onPress={() => triggerSwipe('left')}>
            <X color="white" size={normalize(32)} strokeWidth={3} />
          </Pressable>
          <Text style={styles.actionText}>Swipe Left</Text>
        </View>

        <View style={styles.actionWrapper}>
          <Pressable style={[styles.actionButton, styles.buttonNotSure]} onPress={() => triggerSwipe('down')}>
            <HelpCircle color="white" size={normalize(28)} strokeWidth={3} />
          </Pressable>
          <Text style={styles.actionText}>Not Sure</Text>
        </View>

        <View style={styles.actionWrapper}>
          <Pressable style={[styles.actionButton, styles.buttonSuperLike]} onPress={() => triggerSwipe('up')}>
            <Star color="white" size={normalize(28)} strokeWidth={3} fill="white" />
          </Pressable>
          <Text style={styles.actionText}>Super Like</Text>
        </View>

        <View style={styles.actionWrapper}>
          <Pressable style={[styles.actionButton, styles.buttonLike]} onPress={() => triggerSwipe('right')}>
            <Heart color="white" size={normalize(32)} strokeWidth={3} fill="white" />
          </Pressable>
          <Text style={styles.actionText}>Swipe Right</Text>
        </View>
      </View>
    </View>
  );
}
