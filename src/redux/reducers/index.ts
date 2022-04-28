import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

const persistConfig: any = {
    key: 'root',
    storage: localStorage,
    whitelist: ['auth, report'],
    blacklist: ['error'],
    timeout: null
};

export interface RootState {
}

const rootReducer = combineReducers({
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
