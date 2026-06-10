import { ComponentProps } from 'react';
import { Platform, View } from 'react-native';
import { BlurView } from 'expo-blur';

type SafeBlurViewProps = ComponentProps<typeof BlurView>;

export function SafeBlurView({ style, tint, intensity, children, ...props }: SafeBlurViewProps) {
  if (Platform.OS === 'android') {
    const tintMap: Record<string, string> = {
      dark: 'rgba(0,0,0,0.75)',
      light: 'rgba(255,255,255,0.65)',
      default: 'rgba(0,0,0,0.5)',
      extraLight: 'rgba(255,255,255,0.8)',
      regular: 'rgba(0,0,0,0.55)',
      prominent: 'rgba(0,0,0,0.85)',
    };
    const bgColor = tint ? tintMap[tint] ?? tintMap.dark : tintMap.dark;
    return <View style={[style, { backgroundColor: bgColor }]}>{children}</View>;
  }

  return (
    <BlurView {...props} intensity={intensity} tint={tint} style={style} >
      {children}
    </BlurView>
  );
}
