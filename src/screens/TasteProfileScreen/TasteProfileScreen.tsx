import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { X, Heart, Star, HelpCircle } from 'lucide-react-native';
import { RootState } from '../../store/store';
import { rateFood, SwipeDirection } from '../../store/tasteProfileSlice';
import { SwipeCard } from '../../components/SwipeCard/SwipeCard';
import { styles } from './style';
import { normalize } from '../../utils/scale';

export function TasteProfileScreen() {
  const dispatch = useDispatch();
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

  const progressPercentage = foodData.length > 0 ? ((currentIndex) / foodData.length) * 100 : 0;

  if (isFinished) {
    return (
      <View style={styles.root}>
        <Text style={styles.finishedText}>All done for now!</Text>
      </View>
    );
  }

  // Render top 3 cards for performance, reversed so index 0 is on top in Z-index
  const cardsToRender = foodData.slice(currentIndex, currentIndex + 3).reverse();

  return (
    <View style={styles.root}>
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
