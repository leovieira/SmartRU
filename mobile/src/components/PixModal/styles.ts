import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.OVERLAY,
  },
  content: {
    width: 320,
    padding: 26,
    backgroundColor: THEME.COLORS.WHITE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    alignSelf: 'flex-end',
    margin: -8,
  },
  heading: {
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },
  headingTitle: {
    textAlign: 'center',
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.BLUE,
  },
  headingSubtitle: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.BLUE,
  },
  pixBtn: {
    width: '100%',
    height: 55,
    marginTop: 30,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.BLUE,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pixBtnDisabled: {
    opacity: 0.8,
  },
  pixBtnText: {
    marginRight: 10,
    textAlign: 'center',
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    color: THEME.COLORS.WHITE,
  },
  label: {
    marginTop: 26,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.BLUE,
  },
});
