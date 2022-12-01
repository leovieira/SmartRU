import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 160,
    height: 150,
  },
  form: {
    width: '100%',
    marginTop: 50,
  },
  formItem: {
    marginVertical: 10,
  },
  formMsg: {
    marginVertical: 5,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.RED,
  },
});
