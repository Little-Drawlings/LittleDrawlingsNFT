import {types} from "../types";

export const initialState = {
    user: null,
    loginModal: false,
    currentDrawl: null,
    isLoader: false,
}

export const reducers = {
    [types.SET_USER]: (state, user) => ({
        ...state,
        user,
    }),
    [types.SET_LOGIN_MODAL]: (state, loginModal) => ({
        ...state,
        loginModal,
    }),
    [types.SET_CURRENT_DRAWL]: (state, currentDrawl) => ({
        ...state,
        currentDrawl,
    }),
    [types.SET_IS_LOADER]: (state, isLoader) => ({
        ...state,
        isLoader,
    }),
    [types.SET_CONTRACT_DATA]: (state, contractData) => ({
        ...state,
        contractData,
    }),
};