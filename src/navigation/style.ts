
import { StyleSheet } from 'react-native';

import { theme } from '../theme/theme';
import { Safeinsets } from '../utils/scale';


export const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingTop:Safeinsets('top')
  },
});