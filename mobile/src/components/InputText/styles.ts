import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 55,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.COLORS.BLUE,
    paddingHorizontal: 20,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    color: THEME.COLORS.BLUE,
  },
});
