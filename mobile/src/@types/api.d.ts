export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  registry: string;
  username: string;
  password: string;
  profile: string;
  phone: {
    areaCode: string;
    number: string;
    updatedAt: Date;
  };
  address: {
    street: string;
    number: number | null;
    neighborhood: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
    updatedAt: Date;
  };
  tickets: number;
  mercadopagoId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
