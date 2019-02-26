import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import temperatureReducer from './temperature/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialState } from './temperature/reducer';


export const initStore = () => createStore(temperatureReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
