import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import temperatureReducer from './temperature/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from './temperature/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    whitelist: ['favourites'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, temperatureReducer);

export default () => {
    let store = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
    let persistor = persistStore(store);
    return { store, persistor };
}
