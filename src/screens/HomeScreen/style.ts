import { moderateScale } from './../../utils/responsive';
import { StyleSheet } from 'react-native';

import { theme } from '../../theme/theme';
import { normalize, scale, screen, verticalScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background,
    flex: 1,
    overflow: 'hidden',
  },
  container:{
    flex: 1,
    paddingHorizontal:moderateScale(18),
    paddingBottom: verticalScale(110),
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  ambientTop: {
    height: verticalScale(288),
    position: 'absolute',
    top: verticalScale(40),
    left: scale(-50),
    width: scale(230),
    zIndex: 1,
  },
  ambientBottom: {
    bottom: verticalScale(-70),
    height: verticalScale(900),
    position: 'absolute',
    right: scale(-10),
    width: scale(350),
    zIndex: 1,
  },
  safeArea: {
    flex: 1,
    paddingBottom: verticalScale(118),
    paddingHorizontal: screen.horizontalPadding,
    paddingTop: verticalScale(34),
  },
  header: {
    gap: verticalScale(10),
    paddingTop:moderateScale(26),
    paddingHorizontal:moderateScale(9)
  },
  // Gradient border shell — exact same size as old button
  backButtonGradient: {
    borderRadius: scale(44),
    height: scale(44),
    padding: 1,
    width: scale(44),
  },
  backButton: {
    borderRadius: scale(43), // 1px less than gradient shell
    flex: 1,
    overflow: 'hidden',
  },
  backBlur: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.text,
    fontSize: normalize(36),
    fontFamily: theme.fontFamily,
    fontWeight: theme.fontWeights.heavy,
    letterSpacing: 0,
    lineHeight: normalize(43),
    
  },
  cardShell: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: verticalScale(30),
  },
  card: {
    minHeight: verticalScale(596),
  },
  cardContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(12),
  },
  emoji: {
    fontSize: moderateScale(70),
    lineHeight: normalize(84),
  },
  cardTitle: {
    color: theme.colors.textMuted,
    fontSize: normalize(26),
    fontWeight: theme.fontWeights.heavy,
    letterSpacing: 0,
    lineHeight: normalize(34),
    marginTop: verticalScale(31),
    textAlign: 'center',
    fontFamily:theme.fontFamily
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: normalize(22),
    fontWeight: '300',
    lineHeight: normalize(30),
    marginTop: verticalScale(31),
    textAlign: 'center',
    letterSpacing: -0.56
  },
  helper: {
    color: theme.colors.textMuted,
    fontSize: normalize(17),
    fontWeight: '400',
    lineHeight: normalize(25),
    marginTop: verticalScale(31),
    textAlign: 'center',
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
    borderRadius: scale(28),
    height: verticalScale(51),
    justifyContent: 'center',
    marginTop: verticalScale(31),
    paddingHorizontal: scale(35),
    paddingVertical:verticalScale(14)
  },
  startButtonText: {
    color: theme.colors.black,
    fontSize: normalize(16),
    fontWeight: theme.fontWeights.medium,
    lineHeight: normalize(21),
  },
  timeHint: {
    color: theme.colors.textMuted,
    fontSize: normalize(16),
    fontWeight: theme.fontWeights.regular,
    lineHeight: normalize(21),
    textAlign: 'center',
    marginTop:verticalScale(31)
  },
});