import { Dimensions, PixelRatio } from 'react-native';

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

