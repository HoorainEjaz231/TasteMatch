import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_FOOD_DATA } from './foodData';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';
export type RatingType = 'disliked' | 'liked' | 'superliked' | 'notsure';

export interface FoodItem {
  id: number;
  name: string;
  image: string;
  category: string;
  tags: string[];
}

interface TasteProfileState {
  foodData: FoodItem[];
  currentIndex: number;
  ratings: Record<number, RatingType>;
  isFinished: boolean;
}

const initialState: TasteProfileState = {
  foodData: INITIAL_FOOD_DATA,
  currentIndex: 0,
  ratings: {},
  isFinished: false,
};

export const tasteProfileSlice = createSlice({
  name: 'tasteProfile',
  initialState,
  reducers: {
    rateFood: (
      state,
      action: PayloadAction<{ foodId: number; rating: RatingType }>
    ) => {
      state.ratings[action.payload.foodId] = action.payload.rating;
      
      if (state.currentIndex < state.foodData.length - 1) {
        state.currentIndex += 1;
      } else {
        state.isFinished = true;
      }
    },
    resetProfile: (state) => {
      state.currentIndex = 0;
      state.ratings = {};
      state.isFinished = false;
    },
    undoRating: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.isFinished = false;
        const foodId = state.foodData[state.currentIndex].id;
        delete state.ratings[foodId];
      }
    },
  },
});

export const { rateFood, resetProfile, undoRating } = tasteProfileSlice.actions;
export default tasteProfileSlice.reducer;
