import { Reducer } from 'redux';
import { TemperatureState, TemperatureAction, Temperature, AddFavouriteAction } from './types'; 


export const initialState: TemperatureState = {
    data: [],
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
            return { ...state, data: state.data.filter(loc => loc.favourite) };
        case 'temperature/GET_FAILURE':
            return { ...state, error: action.payload.error, isLoading: false };
        case 'temperature/ADD_FAVOURITE':
            return { ...state, data: addFavouriteLocation(state, action as AddFavouriteAction) };
        case 'temperature/REMOVE_FAVOURITE':
            return { ...state, data: state.data.filter(favourite => favourite.id !== action.payload.location.id) };
        default:    
            return state;
        }
};

const addFavouriteLocation = (state: TemperatureState, action: AddFavouriteAction) => {
    const { data } = state;
    const { id } = action.payload.location;
    return data.map(location => (location.id === id) ? {...location, favourite: !location.favourite } : location );
};

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