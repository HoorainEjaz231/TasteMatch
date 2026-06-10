import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { moderateScale, normalize, scale, verticalScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height:moderateScale(500)
  },
  card: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  imageContainer: {
    width: scale(140),
    height: scale(140),
    borderRadius: scale(70),
    overflow: 'hidden',
    marginBottom: verticalScale(40),
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  foodText: {
    color: theme.colors.text,
    fontSize: normalize(28),
    fontWeight: theme.fontWeights.heavy,
    textAlign: 'center',
    lineHeight: normalize(34),
  },
});
