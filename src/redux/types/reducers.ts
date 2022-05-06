export interface IPersistConfig {
    key: string;
    storage: typeof localStorage;
    whitelist: string[];
    blacklist: string[];
}

export interface ITimeConfig {
	hours: number;
	minutes: number;
	seconds: number;
}