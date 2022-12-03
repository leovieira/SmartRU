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
  heading: {
    marginTop: 20,
  },
  ticketsContainer: {
    width: '100%',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: THEME.COLORS.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketsInput: {
    width: 150,
    marginHorizontal: 30,
    textAlign: 'center',
    fontSize: THEME.FONT_SIZE.LG,
  },
  formMsgError: {
    marginTop: 20,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.RED,
  },
  formMsgSuccess: {
    marginTop: 20,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.GREEN,
  },
  detailsContainer: {
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.COLORS.LIGHT_GRAY,
    backgroundColor: THEME.COLORS.PURE_WHITE,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  detailsItem: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  detailsTitle: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.REGULAR,
    color: THEME.COLORS.GRAY,
  },
  detailsData: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    color: THEME.COLORS.GRAY,
  },
  divider: {
    marginVertical: 20,
    width: '100%',
    height: 1,
    borderRadius: 1,
    backgroundColor: THEME.COLORS.LIGHT_GRAY,
  },
  detailsTotalTitle: {
    fontSize: THEME.FONT_SIZE.MD,
    fontFamily: THEME.FONT_FAMILY.MEDIUM,
    color: THEME.COLORS.GRAY,
  },
  detailsTotalData: {
    fontSize: THEME.FONT_SIZE.LG,
    fontFamily: THEME.FONT_FAMILY.BOLD,
    color: THEME.COLORS.BLUE,
  },
  btnBuyTickets: {
    marginTop: 20,
  },
});
