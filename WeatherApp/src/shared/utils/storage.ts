export const LS_KEYS = {
    USER_STORE: "user-store",
    WEATHER_STORAGE: "weather-storage",
} as const

export type LS_VALUES = typeof LS_KEYS[keyof typeof LS_KEYS]

export class Storage {
   static setToLS<T extends LS_VALUES>(key: T, value:string ) {
        localStorage.setItem(key, value);
    }
    static getFromLS<T extends LS_VALUES>(key: T) {
        const storageData = localStorage.getItem(key);

        if (storageData) {
            const parsedData = JSON.parse(storageData);
                return parsedData ? parsedData : null
            }
    }

    static removeFromLS<T extends LS_VALUES>(key: T) {
        localStorage.removeItem(key);
    }
    static removeFromSS<T extends LS_VALUES>(key: T) {
        sessionStorage.removeItem(key);
    }

}