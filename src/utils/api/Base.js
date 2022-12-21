import {localStorageGet, localStorageRemove} from "../localStorage";
import axios from "axios";

export default class Base {
    constructor() {
        // eslint-disable-next-line no-undef
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        // eslint-disable-next-line no-undef
        this.url = BASE_URL;
    }

    getToken() {
        return localStorageGet("token", "");
    }

    getAuthHeader() {
        return { headers: { Authorization: `Bearer ${this.getToken()}` } };
    }

    getUrl(path) {
        return `${this.url}/${path}`;
    }

    errorCatch(error) {
        const code = error?.response?.status;
        const message = error?.response?.data?.message;

        switch (code) {
            case 401:
                localStorageRemove("token");
                window.location.pathname = "/";
                return { status: false, message };
            default:
                return { status: false, message };
        }
    }

    get(url, config) {
        return axios
            .get(this.getUrl(url), { ...this.getAuthHeader(), ...config })
            .then((res) => res.data)
            .catch(this.errorCatch);
    }

    post(url, data, config) {
        return axios
            .post(this.getUrl(url), data, { ...this.getAuthHeader(), ...config })
            .then((res) => res.data)
            .catch((error) => ({ status: false, message: error }));
    }

    put(url, data, config) {
        return axios
            .put(this.getUrl(url), data, { ...this.getAuthHeader(), ...config })
            .then((res) => res.data)
            .catch((error) => ({ status: false, message: error }));
    }

    delete(url, data, config) {
        return axios
            .delete(this.getUrl(url), { ...this.getAuthHeader(), ...config })
            .then((res) => res.data)
            .catch((error) => ({ status: false, message: error }));
    }

    postThirdParty(url, data, config) {
        return axios
            .post(url, data, config)
            .then((res) => res.data)
            .catch((error) => ({ status: false, message: error }));
    }
}