export interface IPersistConfig {
    key: string;
    storage: typeof localStorage;
    whitelist: string[];
    blacklist: string[];
}
