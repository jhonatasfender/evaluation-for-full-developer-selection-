export interface Address {
    cep: number;
    city: string;
    id: number;
    neighborhood: string;
    street: string;
    state: string;
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

export enum TyptePhone {
    RESIDENTIAL,
    COMMERCIAL,
    CELLULAR
}

export interface ClientsList {
    content: Client[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    sort: Sort;
    size: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}
