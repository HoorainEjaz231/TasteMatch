import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';
import { normalize, scale, verticalScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  root: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingHorizontal: scale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  backButtonGradient: {
    borderRadius: scale(44),
    height: scale(44),
    padding: 1,
    width: scale(44),
  },
  backButton: {
    borderRadius: scale(43),
    flex: 1,
    overflow: 'hidden',
  },
  backBlur: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  undoAloneGradient: {
    borderRadius: scale(28),
    marginTop: verticalScale(40),
    padding: 1,
    alignSelf: 'center',
  },
  undoAloneButton: {
    borderRadius: scale(27),
    overflow: 'hidden',
  },
  undoAloneBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(14),
    gap: scale(10),
  },
  undoText: {
    color: theme.colors.text,
    fontSize: normalize(15),
    fontWeight: theme.fontWeights.medium,
  },
  progressContainer: {
    height: verticalScale(6),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: scale(3),
    marginBottom: verticalScale(30),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.accent|| '#00D165',
    borderRadius: scale(3),
  },
  cardsArea: {
    flex: 1,
    position: 'relative',
    marginBottom: verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: verticalScale(40),
  },
  actionButton: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonDislike: {
    backgroundColor: '#FF2D55',
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
  },
  buttonNotSure: {
    backgroundColor: '#636366',
  },
  buttonSuperLike: {
    backgroundColor: '#0A84FF',
  },
  buttonLike: {
    backgroundColor: '#34C759',
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
  },
  actionText: {
    color: theme.colors.textMuted,
    fontSize: normalize(12),
    textAlign: 'center',
    marginTop: verticalScale(8),
  },
  actionWrapper: {
    alignItems: 'center',
  },
  finishedText: {
    color: theme.colors.text,
    fontSize: normalize(24),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: verticalScale(100),
  },
});
