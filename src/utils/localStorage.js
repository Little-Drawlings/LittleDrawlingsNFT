export const localStorageSet = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageGet = (key, defaultValue) => {
    let data = defaultValue;
    try {
        const storageData = localStorage.getItem(key)
        if (storageData) data = JSON.parse(storageData);

    } catch (e) {
        console.error(e);
    }

    return data || defaultValue;
};

export const localStorageRemove = (key) => localStorage.removeItem(key);
