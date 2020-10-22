export interface AuthTokenJWT {
    sub: string;
    rules: Rule[];
    exp: number;
    iat: number;
}

export interface Rule {
    authority: string;
}
