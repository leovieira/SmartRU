declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      MERCADOPAGO_TOKEN: string;
      BASE_URL: string;
    }
  }
}

export {};
