import { StyleSheet } from 'react-native';

import { theme } from '../theme/theme';
import { normalize, scale, verticalScale } from '../utils/scale';

export const styles = StyleSheet.create({
  tabBarRoot: {
    flexDirection: 'row',
    gap: scale(14),
    left: 0,
    paddingHorizontal: scale(44),
    position: 'absolute',
    right: 0,
  },
  // Gradient border shell — replaces tabPill's borderColor/borderWidth
  tabPillGradient: {
    borderRadius: scale(34),
    flex: 1,
    height: verticalScale(64),
    padding: 1,
  },
  tabPill: {
    borderRadius: scale(33),
    borderTopRightRadius:scale(25),
    borderBottomLeftRadius:scale(25),
    flex: 1,
    overflow: 'hidden',
  },
  tabPillBlur: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    flex: 1,
    flexDirection: 'row',
    padding: scale(5),
  },
  tabItem: {
    alignItems: 'center',
    borderRadius: scale(30),
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    minWidth: 0,
    marginVertical:scale(5)
  },
  tabItemFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.11)',
    marginVertical:scale(10)
  },
  tabLabel: {
    color: theme.colors.tabInactive,
    fontSize: normalize(10),
    fontWeight: theme.fontWeights.semibold,
    lineHeight: normalize(13),
    marginTop: verticalScale(2),
    textAlign: 'center',
  },
  tabLabelFocused: {
    color: theme.colors.accent,
  },
  // Gradient border shell for search circle
  searchGradient: {
    borderRadius: scale(34),
    height: verticalScale(64),
    padding: 1,
    width: scale(64),
  },
  searchButton: {
    borderRadius: scale(33),
    flex: 1,
    overflow: 'hidden',
  },
  searchBlur: {
    alignItems: 'center',
    backgroundColor: 'rgba(7, 8, 9, 0.76)',
    flex: 1,
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});