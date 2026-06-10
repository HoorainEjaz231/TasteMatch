import { StyleSheet } from 'react-native';

import { theme } from '../../theme/theme';
import { moderateScale, scale } from '../../utils/scale';

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.42,
    shadowRadius: 40,
    elevation: 18,
  },
  blur: {
    // backgroundColor: 'rgba(0, 0, 0, 0.91)',
    // borderColor + borderWidth removed — LinearGradient padding:1 acts as border
    borderRadius: scale(theme.radius.xl),
    borderBottomLeftRadius:moderateScale(30),
    borderTopRightRadius:moderateScale(30),
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.93)',
  },
});