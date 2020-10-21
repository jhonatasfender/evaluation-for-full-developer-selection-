export interface Address {
  cep: number;
  city: string;
  id: number;
  neighborhood: string;
  street: string;
  uf: string;
}

export interface Email {
  email: string;
  id: number;
}

export interface Phone {
  id: number;
  phone: string;
  typePhone: string;
}

export interface Client {
  address: Address[];
  cpf: string;
  emails: Email[];
  id: number;
  name: string;
  phones: Phone[];
}
