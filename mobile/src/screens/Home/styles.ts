import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  header: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hello: {
    width: '100%',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  helloImg: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  helloHeader: {
    marginLeft: 20,
  },
  helloTitle: {
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.BLUE,
  },
  helloSubtitle: {
    marginTop: 5,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.BLUE,
  },
  ticketsContainer: {
    width: '100%',
    marginTop: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: THEME.COLORS.LIGHT_GRAY,
    backgroundColor: THEME.COLORS.PURE_WHITE,
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketsTitle: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.GRAY,
  },
  ticketsCount: {
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.BLUE,
  },
  btnBuyTickets: {
    marginTop: 20,
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  menuBtn: {
    width: '100%',
    height: 60,
    marginVertical: 10,
    borderRadius: 30,
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textMenuBtn: {
    marginLeft: 15,
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    color: THEME.COLORS.BLUE,
  },
});
