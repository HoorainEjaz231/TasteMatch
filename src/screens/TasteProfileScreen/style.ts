import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../theme/theme';
import { normalize, scale, verticalScale } from '../../utils/scale';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CARD_WIDTH = SCREEN_WIDTH - scale(40);

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: verticalScale(130),
  },
  header: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },
  backButtonGradient: {
    borderRadius: scale(44),
    height: scale(44),
    padding: 1,
    width: scale(44),
    marginBottom: verticalScale(16),
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
  pageTitle: {
    color: theme.colors.text,
    fontSize: normalize(32),
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    color: theme.colors.textMuted,
    fontSize: normalize(14),
    fontWeight: '400',
    marginTop: verticalScale(6),
    lineHeight: normalize(20),
  },
  sectionLabel: {
    color: theme.colors.textMuted,
    fontSize: normalize(13),
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(20),
  },
  // ── Highlight Cards ──
  highlightsScroll: {
    paddingHorizontal: scale(20),
  },
  highlightCard: {
    width: CARD_WIDTH,
    marginRight: scale(12),
  },
  highlightCardInner: {
    padding: scale(20),
  },
  highlightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
  },
  highlightItem: {
    alignItems: 'center',
    flex: 1,
  },
  highlightEmoji: {
    fontSize: normalize(36),
    marginBottom: verticalScale(8),
  },
  highlightLabel: {
    color: theme.colors.text,
    fontSize: normalize(13),
    fontWeight: '600',
    textAlign: 'center',
  },
  dividerV: {
    width: 1,
    height: verticalScale(50),
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  // ── Section card ──
  sectionCardInner: {
    padding: scale(20),
  },
  sectionCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: scale(10),
    marginBottom: verticalScale(4),
  },
  sectionCardTitle: {
    color: theme.colors.text,
    fontSize: normalize(15),
    fontWeight: '700',
  },
  sectionCardSubtitle: {
    color: theme.colors.textMuted,
    fontSize: normalize(12),
    marginTop: verticalScale(2),
    lineHeight: normalize(16),
  },
  dividerH: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
  // ── List row ──
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    gap: scale(12),
  },
  listRowLast: {
    borderBottomWidth: 0,
  },
  listRowIcon: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listRowIconGreen: {
    backgroundColor: 'rgba(52,199,89,0.18)',
  },
  listRowText: {
    color: theme.colors.text,
    fontSize: normalize(14),
    fontWeight: '500',
    flex: 1,
  },
  // ── Dots ──
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(6),
    paddingVertical: verticalScale(14),
  },
  dot: {
    width: scale(7),
    height: scale(7),
    borderRadius: scale(4),
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    backgroundColor: theme.colors.accent,
    width: scale(18),
  },
  // ── Empty state ──
  emptyText: {
    color: theme.colors.textMuted,
    fontSize: normalize(13),
    textAlign: 'center',
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(20),
    fontStyle: 'italic',
  },
  // ── Food tabs inside fixed card ──
  foodTabBar: {
    flexDirection: 'row',
  },
  foodTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    gap: verticalScale(2),
  },
  foodTabEmoji: {
    fontSize: normalize(18),
  },
  foodTabLabel: {
    color: theme.colors.textMuted,
    fontSize: normalize(11),
    fontWeight: '600',
  },
});
