import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.BLUE,
  },
  subtitle: {
    marginTop: 5,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.BLUE,
  },
});
