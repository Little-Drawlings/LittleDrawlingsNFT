import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mintReducer from './mint/reducer';
import { MintAppState } from './../types/store';

const rootPersistConfig = {
	key: 'root',
	storage: storage
};

export interface RootState {
    mintReducer: MintAppState;
}

const rootReducer = combineReducers({
	mintReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
