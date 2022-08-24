import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import * as thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducers from '../reducers';

let middleware = [thunkMiddleware.default];

const store: any = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export {store, persister};