export interface HomeParams {
  userId: number;
}

export interface BuyTicketsParams {
  userId: number;
  userEmail: string | undefined;
  userMercadopagoId: string | null | undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      login: undefined;
      home: HomeParams;
      buyTickets: BuyTicketsParams;
      recoveryPassword: undefined;
    }
  }
}
