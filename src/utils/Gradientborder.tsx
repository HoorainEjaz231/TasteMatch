import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Reusable diagonal gradient border wrapper.
 * Mimics a glassmorphism border: bright on top-left & bottom-right,
 * transparent on top-right & bottom-left — matching the Figma design.
 *
 * Usage: wrap any component that previously used borderColor + borderWidth
 */
type GradientBorderProps = PropsWithChildren<{
  borderRadius: number;
  style?: StyleProp<ViewStyle>;
  /** 1 = default hair-line-ish border thickness */
  thickness?: number;
  /** Override gradient colors if needed */
  colors?: [string, string, string];
}>;

export function GradientBorder({
  children,
  borderRadius,
  style,
  thickness = 1,
  colors = ['rgba(255,255,255,0.20)', 'rgba(255,255,255,0.03)', 'rgba(255,255,255,0.20)'],
}: GradientBorderProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ borderRadius, padding: thickness }, style]}
    >
      {children}
    </LinearGradient>
  );
}