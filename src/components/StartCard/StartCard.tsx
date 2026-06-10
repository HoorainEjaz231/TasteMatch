import { PropsWithChildren } from 'react';
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme/theme';
import { scale } from '../../utils/scale';
import { styles } from './style';
import { SafeBlurView } from '../../utils/SafeBlurView';

type AppCardProps = PropsWithChildren<{
  intensity?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}>;

const RADIUS = scale(theme.radius.xl);

export function StartCard({ children, intensity = 20, style, contentStyle }: AppCardProps) {
  // Flatten the style prop so we can forward minHeight / flex to the gradient shell
  const flatStyle = StyleSheet.flatten(style) ?? {};

  return (
    <View style={[styles.shadow]}>
     <LinearGradient
  colors={[
    'rgba(255, 255, 255, 0.34)',  // top-left: bright
    'rgba(255,255,255,0.00)',  // fades out early
    'rgba(255,255,255,0.00)',  // stays transparent (covers top-right & bottom-left)
    'rgba(255, 255, 255, 0.53)',  // bottom-right: bright
  ]}
  locations={[0., 0.7, 0.5, 1]}
  start={{ x: 1, y: 1 }}
  end={{ x: 1, y: 1 }}
  style={[{ borderRadius: RADIUS, padding: 0.5 }, flatStyle]}
>
        <SafeBlurView
          intensity={intensity}
          tint='dark'
          style={[styles.blur, { flex: 1 }, contentStyle]}
        >
          <View pointerEvents="none" style={styles.overlay} />
          {children}
        </SafeBlurView>
      </LinearGradient>
    </View>
  );
}