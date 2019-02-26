import { Reducer } from 'redux';
import { TemperatureState, TemperatureAction, Temperature } from './types'; 


export const initialState: TemperatureState = {
    data: [],
    favourites: [],
    isLoading: false,
};

const temperatureReducer: Reducer<TemperatureState> = (state: TemperatureState = initialState, action): TemperatureState => {
    switch ((action as TemperatureAction).type) {
        case 'temperature/GET':
            return { ...state, isLoading: true };
        case 'temperature/GET_SUCCESS':
            return { ...state, data: updateOrAddObjectInArray(state.data, action.payload.data), isLoading: false };
        case 'temperature/GET_CANCEL':
            return { ...state, isLoading: false };
        case 'temperature/CLEAR':
            return { ...state, data: [] };
        case 'temperature/GET_FAILURE':
            return { ...state, error: action.payload.error, isLoading: false };
        case 'temperature/ADD_FAVOURITE':
            return { ...state, favourites: [...state.favourites, action.payload.location] };
        case 'temperature/REMOVE_FAVOURITE':
            return { ...state, favourites: state.favourites.filter(favourite => favourite.id !== action.payload.location.id) };
        default:    
            return state;
        }
};
    
// This would be a cool case to use generics, but all our types would have to extend a type that always has id..
const updateOrAddObjectInArray = (array: Temperature[], updatedItem: Temperature) => {
    const index = array.findIndex(item => item.id === updatedItem.id);
    if(index > -1) {
        let newArray = array.slice(0, index);
        newArray = newArray.concat(updatedItem);
        newArray = newArray.concat(array.slice(index + 1, array.length));
        return newArray;
    }
    else {
        return [...array, updatedItem];
    }
};


export default temperatureReducer;