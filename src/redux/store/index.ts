import {applyMiddleware, createStore} from 'redux';
import {persistStore} from 'redux-persist';
import * as thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

let middleware = [thunkMiddleware.default];

const dev = true;

if (dev) {
    const logger = require('redux-logger');
    const loggerMiddleware = logger.createLogger({
        duration: true
    });
    middleware = [...middleware, loggerMiddleware];
}
const store: any = createStore(reducers, applyMiddleware(...middleware));

const persister = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export {store, persister};