declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      MERCADOPAGO_TOKEN: string;
    }
  }
}

export {};
