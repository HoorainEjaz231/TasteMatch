import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronLeft } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLogic } from './logic';
import { styles } from './style';
import { BlurView } from 'expo-blur';
import { theme } from '../../theme/theme';
import { normalize } from '../../utils/scale';
import { introContent } from './helper';
import { SafeBlurView } from '../../utils/SafeBlurView';
import { StartCard } from '../../components/StartCard/StartCard';

export function HomeScreen() {
  const { Animated, cardAnimatedStyle, ctaLabel, handleBack, handleStart, headerAnimatedStyle } = useLogic();
    const insets = useSafeAreaInsets()
  return (
    <View style={styles.root}>
      <StatusBar backgroundColor="transparent" style="light" translucent />

      <Image pointerEvents="none" source={require('../../assets/images/Ellipse6.png')} style={styles.ambientTop} contentFit="contain" />
      <Image pointerEvents="none" source={require('../../assets/images/Ellipse5.png')} style={styles.ambientBottom} contentFit="contain" />

      <View style={[styles.container,{paddingTop:insets.top, zIndex:2}]}>

         <Animated.View style={[styles.header, headerAnimatedStyle]}>
          {/* Back button — LinearGradient wraps with padding:1 for gradient border */}
          <LinearGradient
            colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.22)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.backButtonGradient}
          >
            <Pressable accessibilityRole="button" onPress={handleBack} style={styles.backButton}>
              <SafeBlurView
                intensity={30}
                tint="dark"
                style={styles.backBlur}
              >
                <ChevronLeft color={theme.colors.textMuted} size={normalize(27)} strokeWidth={1.5} />
              </SafeBlurView>
            </Pressable>
          </LinearGradient>

          <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.title]}>{introContent.title}</Text>
        </Animated.View>

        <Animated.View style={[styles.cardShell, cardAnimatedStyle]}>
          <StartCard contentStyle={styles.cardContent} style={styles.card}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.emoji}>{introContent.emoji}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.cardTitle}>{introContent.cardTitle}</Text>
            <Text style={styles.description}>{introContent.description}</Text>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.helper}>{introContent.helper}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={handleStart}
              style={({ pressed }) => [
                styles.startButton,
                pressed && { backgroundColor: theme.colors.accentPressed },
              ]}
            >
              <Text style={styles.startButtonText}>{ctaLabel}</Text>
            </Pressable>
            <Text style={styles.timeHint}>{introContent.timeHint}</Text>
          </StartCard>
        </Animated.View>

      </View>
     
        

     
     
    </View>
  );
}