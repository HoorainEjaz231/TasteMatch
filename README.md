APK LINK: https://drive.google.com/file/d/1r87pkhU2AxqMLlTHAGFHXRNmxkQkpxoe/view?usp=sharing
# TasteMatch 🍽️

TasteMatch is a sleek, highly interactive React Native (Expo) mobile application designed to build a personalized **Taste Profile** for users through a fun, Tinder-like swiping interface. By learning what foods users love, hate, or are just "not sure" about, the app aims to eventually provide highly tailored meal recommendations and diet plans.

## ✨ Features

*   **Interactive Food Swiping:** 
    *   Swipe Right (❤️ Love)
    *   Swipe Left (🚫 Hate)
    *   Swipe Up (⭐ SuperLike)
    *   Swipe Down (🤔 Not Sure)
*   **Dynamic Taste Profiling:** Automatically derives "Personas" (e.g., *Meat Lover*, *Health Freak*, *Carb Lover*) based on the tags of the foods you swipe right/up on.
*   **Premium Glassmorphism UI:** Built with custom glass effects (`expo-blur`, `expo-linear-gradient`) and smooth micro-interactions powered by `react-native-reanimated`.
*   **Persistent State:** Uses Redux Toolkit and Redux Persist to ensure your taste profile and swiped foods are saved locally across app restarts.
*   **Undo Functionality:** Made a mistake? Quickly undo your last swipe to correct your food ratings.
*   **Detailed Profile Dashboard:** View your automatically generated Key Highlights, Lifestyle & Goals, and browse through your categorized food ratings in a beautiful, swipeable tabbed interface.

## 🛠️ Tech Stack

*   **Framework:** [React Native](https://reactnative.dev/) / [Expo](https://expo.dev/)
*   **Navigation:** React Navigation v7 (Bottom Tabs & Native Stack)
*   **State Management:** Redux Toolkit & Redux Persist (with custom AsyncStorage wrapper for stability)
*   **Animations:** React Native Reanimated (for gesture-based swiping and fluid layout transitions)
*   **Styling:** Vanilla StyleSheet with custom responsive scaling utilities (`scale`, `verticalScale`, `normalize`)
*   **Icons & Images:** `lucide-react-native`, `expo-image`

## 🚀 Getting Started

### Prerequisites
*   Node.js installed
*   Expo CLI (`npm install -g expo-cli`)
*   Expo Go app on your physical device, or an iOS Simulator / Android Emulator.

### Installation

1.  Clone the repository and navigate to the project directory:
    ```bash
    cd TasteMatch
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the Expo development server:
    ```bash
    npx expo start
    ```

4.  Scan the QR code with the Expo Go app on your phone, or press `i` to open in iOS simulator, or `a` to open in Android emulator.

## 📂 Project Structure

*   `src/components/`: Reusable UI components (e.g., `StartCard`, `SwipeCard`).
*   `src/navigation/`: App routing and custom Tab Bar implementation.
*   `src/screens/`: Main application screens (`HomeScreen`, `OnboardingDataScreen`, `TasteProfileScreen`).
*   `src/store/`: Redux configuration, slices (`tasteProfileSlice.ts`), and mock food data.
*   `src/theme/`: Global theme definitions (colors, fonts, radius).
*   `src/utils/`: Utility functions for responsive scaling and platform-safe components (e.g., `SafeBlurView`).

## 💡 How it Works

The core interaction revolves around the `OnboardingDataScreen`, where users are presented with a stack of food cards. As they swipe, the `rateFood` action is dispatched to the Redux store, categorizing the food by its ID. 

The `TasteProfileScreen` then reads this persisted state, calculating tag frequencies to generate the user's "Key Highlights" and organizing the rated foods into respective tabs (Love, SuperLike, Not Sure, Hate) for easy review.
