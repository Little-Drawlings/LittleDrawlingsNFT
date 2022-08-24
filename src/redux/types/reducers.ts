export interface IPersistConfig {
    key: string;
    storage: typeof localStorage;
    whitelist: string[];
    blacklist: string[];
}

export interface IDrawl {
    name: string;
    image: string;
    time?: number;
    format: string;
    hash?: string;
    createdAt?: string;
    updatedAt?: string;
    userID?: string;
    id?: string;
    _id?: string;
    ipnsLink: string
}

