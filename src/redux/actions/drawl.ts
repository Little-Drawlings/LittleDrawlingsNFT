import API from '../../api';
import types from '../reducers/drawl/types';
import { IDrawl } from '../types/reducers';

export const setDrawl = (drawl: IDrawl) => (dispatch: (arg0: { type: string; data: IDrawl }) => void) => {
    return API.post(`/drawl`, drawl).then(() => {
        dispatch({
            type: types.GET_DRAWL,
            data: drawl
        })
    }).catch((error) => {
        throw error;
    })
}

export const getDrawl = (id: string) => (dispatch: (arg0: { type: string; data: IDrawl }) => void) => {
    return API.get(`/drawl?id=${id}`).then((response) => {
        dispatch({
            type: types.GET_DRAWL,
            data: response.data
        });
    }).catch((error) => {
        throw error;
    })
}

export const getAllDrawls = () => (dispatch: (arg0: { type: string; data: IDrawl[] }) => void) => {
    return API.get(`/drawl/findAll`).then((response) => {
        dispatch({
            type: types.GET_ALL_DRAWLS,
            data: response.data
        });
    }).catch((error) => {
        throw error;
    })
}