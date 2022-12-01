import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 55,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimary: {
    backgroundColor: THEME.COLORS.BLUE,
  },
  btnSecondary: {
    backgroundColor: THEME.COLORS.GRAY,
  },
  btnDisabled: {
    backgroundColor: THEME.COLORS.LIGHT_GRAY,
  },
  txtBtn: {
    textAlign: 'center',
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    color: THEME.COLORS.WHITE,
  },
});
