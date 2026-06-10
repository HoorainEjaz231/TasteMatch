import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, CheckCircle2, Heart, X, HelpCircle, Star } from 'lucide-react-native';
import { RootState } from '../../store/store';
import { FoodItem } from '../../store/tasteProfileSlice';
import { StartCard } from '../../components/StartCard/StartCard';
import { SafeBlurView } from '../../utils/SafeBlurView';
import { theme } from '../../theme/theme';
import { normalize, scale, verticalScale } from '../../utils/scale';
import { CARD_WIDTH, styles } from './style';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Mock data ──────────────────────────────────────────────────────────────
const LIFESTYLE_ITEMS = [
  { id: 1, label: 'Active Lifestyle' },
  { id: 2, label: 'Gym-Goer' },
  { id: 3, label: 'Walks a lot' },
  { id: 4, label: 'Health-Conscious' },
  { id: 5, label: 'PCOS & GI Diet' },
];

const FOOD_TABS = [
  { key: 'liked',      label: 'Food You Love',      subtitle: "We'll recommend these",       rating: 'liked',      color: '#FF2D55', iconBg: 'rgba(255,45,85,0.18)',    Icon: Heart,      iconFill: true,  emoji: '❤️'  },
  { key: 'superliked', label: 'Food You SuperLike', subtitle: "We'll highly recommend these", rating: 'superliked', color: '#FFD60A', iconBg: 'rgba(255,214,10,0.18)',   Icon: Star,       iconFill: true,  emoji: '⭐'  },
  { key: 'notsure',    label: 'Food You NotSure',   subtitle: "We might recommend these",    rating: 'notsure',    color: '#8E8E93', iconBg: 'rgba(142,142,147,0.18)',  Icon: HelpCircle, iconFill: false, emoji: '🤔'  },
  { key: 'disliked',   label: 'Food You Hate',      subtitle: "We'll not recommend these",   rating: 'disliked',   color: '#636366', iconBg: 'rgba(99,99,102,0.18)',    Icon: X,          iconFill: false, emoji: '🚫'  },
];

// ── Derive highlight personas from liked food tags ─────────────────────────
function deriveHighlights(
  foodData: FoodItem[],
  ratings: Record<number, string>
): { emoji: string; label: string }[] {
  const likedFoods = foodData.filter(
    (f) => ratings[f.id] === 'liked' || ratings[f.id] === 'superliked'
  );
  const tagCounts: Record<string, number> = {};
  likedFoods.forEach((f) =>
    f.tags.forEach((t) => { tagCounts[t] = (tagCounts[t] ?? 0) + 1; })
  );

  const personas: { emoji: string; label: string }[] = [];
  if ((tagCounts['protein'] ?? 0) >= 2)    personas.push({ emoji: '🥩', label: 'Meat Lover' });
  if ((tagCounts['fish'] ?? 0) >= 1 || (tagCounts['seafood'] ?? 0) >= 1)
                                            personas.push({ emoji: '🐟', label: 'Seafood Fan' });
  if ((tagCounts['plant-based'] ?? 0) >= 1) personas.push({ emoji: '🌱', label: 'Plant-Based' });
  if ((tagCounts['vegetable'] ?? 0) >= 3)   personas.push({ emoji: '🥗', label: 'Health Freak' });
  if ((tagCounts['italian'] ?? 0) >= 1)     personas.push({ emoji: '🇮🇹', label: 'Italian Food' });
  if ((tagCounts['japanese'] ?? 0) >= 1)    personas.push({ emoji: '🇯🇵', label: 'Japanese Food' });
  if ((tagCounts['mexican'] ?? 0) >= 1)     personas.push({ emoji: '🌮', label: 'Mexican Food' });
  if ((tagCounts['comfort'] ?? 0) >= 2)     personas.push({ emoji: '😋', label: 'Comfort Eater' });
  if ((tagCounts['breakfast'] ?? 0) >= 2)   personas.push({ emoji: '🍳', label: 'Breakfast Lover' });
  if ((tagCounts['indulgent'] ?? 0) >= 2)   personas.push({ emoji: '🍕', label: 'Indulgent' });
  if ((tagCounts['carb'] ?? 0) >= 3)        personas.push({ emoji: '🍞', label: 'Carb Lover' });
  if ((tagCounts['fruit'] ?? 0) >= 1)       personas.push({ emoji: '🍇', label: 'Fruit Lover' });

  if (personas.length === 0) {
    return [
      { emoji: '🥗', label: 'Health Freak' },
      { emoji: '🥩', label: 'Meat Lover' },
      { emoji: '🍇', label: 'Fruit Lover' },
    ];
  }
  return personas.slice(0, 9);
}

// ── Dots — always static, lives OUTSIDE the scrollable list ───────────────
function Dots({ total, active }: { total: number; active: number }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.dot, i === active && styles.dotActive]} />
      ))}
    </View>
  );
}

// ── Key Highlights — 1 fixed card, inner rows swipe ───────────────────────
function KeyHighlightsSection({ personas }: { personas: { emoji: string; label: string }[] }) {
  const [page, setPage] = useState(0);

  // Group into pages of 3
  const pages: { emoji: string; label: string }[][] = [];
  for (let i = 0; i < personas.length; i += 3) pages.push(personas.slice(i, i + 3));
  if (pages.length === 0) pages.push([]);

  const ITEM_WIDTH = CARD_WIDTH - scale(40); // inner padding

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setPage(Math.round(e.nativeEvent.contentOffset.x / ITEM_WIDTH));
  };

  return (
    <View style={{ marginBottom: verticalScale(16), marginHorizontal: scale(20) }}>
      <Text style={[styles.sectionLabel, { paddingHorizontal: 0, marginBottom: verticalScale(12) }]}>
        Key Highlights:
      </Text>

      {/* Single fixed card */}
      <StartCard contentStyle={styles.highlightCardInner}>
        {/* Horizontally scrollable rows INSIDE the fixed card */}
        <FlatList
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="start"
          onMomentumScrollEnd={onScroll}
          keyExtractor={(_, i) => `hl-${i}`}
          getItemLayout={(_, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
          renderItem={({ item: pageItems }) => (
            <View style={{ width: ITEM_WIDTH }}>
              <View style={styles.highlightsRow}>
                {pageItems.map((p, idx) => (
                  <React.Fragment key={p.label}>
                    <View style={styles.highlightItem}>
                      <Text style={styles.highlightEmoji}>{p.emoji}</Text>
                      <Text style={styles.highlightLabel}>{p.label}</Text>
                    </View>
                    {idx < pageItems.length - 1 && <View style={styles.dividerV} />}
                  </React.Fragment>
                ))}
              </View>
            </View>
          )}
        />

        {/* Dots are OUTSIDE the FlatList so they never swipe */}
        {pages.length > 1 && <Dots total={pages.length} active={page} />}
      </StartCard>
    </View>
  );
}

// ── Lifestyle & Goals — standalone glass card ──────────────────────────────
function LifestyleCard() {
  return (
    <View style={{ marginHorizontal: scale(20), marginBottom: verticalScale(16) }}>
      <StartCard contentStyle={styles.sectionCardInner}>
        <View style={styles.sectionCardHeader}>
          <Text style={{ fontSize: normalize(18) }}>💪</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionCardTitle}>Lifestyle & Goals</Text>
            <Text style={styles.sectionCardSubtitle}>
              We'll use this to tailor our advice & meal plan
            </Text>
          </View>
        </View>
        <View style={styles.dividerH} />
        {LIFESTYLE_ITEMS.map((item, idx) => (
          <View
            key={item.id}
            style={[
              styles.listRow,
              idx === LIFESTYLE_ITEMS.length - 1 && styles.listRowLast,
            ]}
          >
            <View style={[styles.listRowIcon, styles.listRowIconGreen]}>
              <CheckCircle2 size={normalize(14)} color="#34C759" />
            </View>
            <Text style={styles.listRowText}>{item.label}</Text>
          </View>
        ))}
      </StartCard>
    </View>
  );
}

// ── Foods card — 1 fixed card, 4 pages of inner food lists ────────────────
function FoodsCard({
  foodData,
  ratings,
}: {
  foodData: FoodItem[];
  ratings: Record<number, string>;
}) {
  const [activePage, setActivePage] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const INNER_WIDTH = CARD_WIDTH - scale(40);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setActivePage(Math.round(e.nativeEvent.contentOffset.x / INNER_WIDTH));
  };

  return (
    <View style={{ marginHorizontal: scale(20), marginBottom: verticalScale(16) }}>
      <StartCard contentStyle={[styles.sectionCardInner, { minHeight: verticalScale(595) }]}>

        {/* Swipeable food lists — only the list content moves */}
        <FlatList
          ref={flatRef}
          data={FOOD_TABS}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={INNER_WIDTH}
          snapToAlignment="start"
          onMomentumScrollEnd={onScroll}
          keyExtractor={(t) => t.key}
          getItemLayout={(_, index) => ({
            length: INNER_WIDTH,
            offset: INNER_WIDTH * index,
            index,
          })}
          renderItem={({ item: tab }) => {
            const foods = foodData.filter((f) => ratings[f.id] === tab.rating);
            const Icon = tab.Icon;
            return (
              <View style={{ width: INNER_WIDTH }}>
                {/* Tab title row */}
                <View style={[styles.sectionCardHeader, { paddingHorizontal: 0, marginTop: verticalScale(10) }]}>
                  <Text style={{ fontSize: normalize(18) }}>{tab.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.sectionCardTitle, { color: tab.color }]}>{tab.label}</Text>
                    <Text style={styles.sectionCardSubtitle}>{tab.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.dividerH} />

                {foods.length === 0 ? (
                  <Text style={styles.emptyText}>
                    No "{tab.label}" foods yet. Swipe to rate!
                  </Text>
                ) : (
                  <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: verticalScale(220) }}
                  >
                    {foods.map((food, idx) => (
                      <View
                        key={food.id}
                        style={[
                          styles.listRow,
                          { paddingHorizontal: 0 },
                          idx === foods.length - 1 && styles.listRowLast,
                        ]}
                      >
                        <View style={[styles.listRowIcon, { backgroundColor: tab.iconBg }]}>
                          <Icon
                            size={normalize(13)}
                            color={tab.color}
                            fill={tab.iconFill ? tab.color : 'none'}
                          />
                        </View>
                        <Text style={styles.listRowText}>{food.name}</Text>
                      </View>
                    ))}
                  </ScrollView>
                )}
              </View>
            );
          }}
        />

        {/* Dots are OUTSIDE the FlatList — they never swipe */}
        <Dots total={FOOD_TABS.length} active={activePage} />
      </StartCard>
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────────────
export function TasteProfileScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { foodData, ratings } = useSelector((state: RootState) => state.tasteProfile);
  const personas = deriveHighlights(foodData, ratings);

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.02)', 'rgba(255,255,255,0.22)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.backButtonGradient}
          >
            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <SafeBlurView intensity={30} tint="dark" style={styles.backBlur}>
                <ChevronLeft color={theme.colors.textMuted} size={normalize(27)} strokeWidth={1.5} />
              </SafeBlurView>
            </Pressable>
          </LinearGradient>
          <Text style={styles.pageTitle}>Your Taste Profile</Text>
          <Text style={styles.pageSubtitle}>
            Tailored to your unique needs. We'll use this for{'\n'}recommendations and meal plans
          </Text>
        </View>

        {/* Key Highlights — 1 fixed card, inner data swipes */}
        <KeyHighlightsSection personas={personas} />

        {/* Lifestyle & Goals — separate card */}
        <LifestyleCard />

        {/* Foods card — 4 inner pages, only list swipes */}
        <FoodsCard foodData={foodData} ratings={ratings} />
      </ScrollView>
    </View>
  );
}
