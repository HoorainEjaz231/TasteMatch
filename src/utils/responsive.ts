import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro, common reference)
const baseWidth = 440;
const baseHeight = 957;

/**
 * Width percentage to pixels
 * @param widthPercent - Percentage of screen width (1-100)
 */
export const wp = (widthPercent: number): number => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

/**
 * Height percentage to pixels
 * @param heightPercent - Percentage of screen height (1-100)
 */
export const hp = (heightPercent: number): number => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

/**
 * Scale based on width - for elements that should scale with screen width
 */
export const widthScale = (size: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH / baseWidth) * size);
};

/**
 * Scale based on height - for elements that should scale with screen height
 */
export const heightScale = (size: number): number => {
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT / baseHeight) * size);
};

/**
 * Moderate scale - use for font sizes
 * @param size - Base size
 * @param factor - Scaling factor (default: 0.5)
 */
export const moderateScale = (size: number, factor = 0.5): number => {
  return Math.round(size + (widthScale(size) - size) * factor);
};

/**
 * Normalize font sizes based on screen density
 */
export const normalize = (size: number): number => {
  const scale = SCREEN_WIDTH / baseWidth;
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

/**
 * Get responsive dimension
 */
export const getDimensions = () => ({
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});

/**
 * Check if device is small (width < 375)
 */
export const isSmallDevice = (): boolean => SCREEN_WIDTH < 375;

/**
 * Check if device is tablet
 */
export const isTablet = (): boolean => {
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  return Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) >= 600 && aspectRatio < 1.6;
};