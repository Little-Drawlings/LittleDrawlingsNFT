import axios from 'axios';
import { BASE_URL } from '../constants/data';

const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
});

Api.defaults.headers.common['Content-Type'] = `application/json`;
Api.defaults.headers.common['Accept'] = `application/json`;

const storageToken = localStorage.getItem('@storage_Key');
if(storageToken) {
    Api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
}

Api.interceptors.response.use(
    (request) => {
        return request;
    },
    (error) => {
        throw error.response;
    }
);

export const setToken = (token: string) => {
    localStorage.setItem('@storage_Key', token);
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const deleteToken = () => {
    localStorage.setItem('@storage_Key', '');
    delete Api.defaults.headers.common['Authorization'];
};

export default Api;