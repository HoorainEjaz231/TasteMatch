import { Dimensions, PixelRatio } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export const REFERENCE_WIDTH = 440;
export const REFERENCE_HEIGHT = 956;

export const scale = (size: number) => (width / REFERENCE_WIDTH) * size;
export const verticalScale = (size: number) => (height / REFERENCE_HEIGHT) * size;

export const moderateScale = (size: number, factor = 0.5) => {
  const scaledSize = scale(size);
  return size + (scaledSize - size) * factor;
};

export const normalize = (size: number) => {
  const roundedSize = PixelRatio.roundToNearestPixel(moderateScale(size));
  return Math.max(1, roundedSize);
};

export const screen = {
  width,
  height,
  horizontalPadding: scale(32),
} as const;

// Store insets globally (will be updated by a component)
let globalInsets = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

// Component to initialize the insets (must be placed at root of your app)
export const SafeInsetsInitializer = () => {
  const insets = useSafeAreaInsets();
  
  // Update global insets when they change
  globalInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
  };
  
  return null;
};

// The function you want - returns safe area value by string parameter
export const Safeinsets = (position: 'top' | 'bottom' | 'left' | 'right'): number => {
  return globalInsets[position];
};