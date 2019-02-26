import { Action } from 'redux';


export interface TemperatureState {
    data: Temperature[];
    favourites: Temperature[];
    isLoading: boolean;
    error?: string;
}

export interface Temperature {
    id: number;
    name: string;
    temperature: number;
}

export interface GetTemperatureAction extends Action {
    type: 'temperature/GET';
    payload: {
        id: number;
    };
}

export interface GetTemperatureSuccessAction extends Action {
    type: 'temperature/GET_SUCCESS';
    payload: {
        data: Temperature;
    };
}

export interface GetTemperatureCancelAction extends Action {
    type: 'temperature/GET_CANCEL';
}

export interface GetTemperatureFailureAction extends Action {
    type: 'temperature/GET_FAILURE';
    payload: {
        error: string;
    };
}

export interface TemperatureClearAction extends Action {
    type: 'temperature/CLEAR';
}

export interface AddFavouriteAction extends Action {
    type: 'temperature/ADD_FAVOURITE';
    payload: {
        location: Temperature;
    };
}

export interface RemoveFavouriteAction extends Action {
    type: 'temperature/REMOVE_FAVOURITE';
    payload: {
        location: Temperature;
    };
}

export type TemperatureDataAction = GetTemperatureAction | GetTemperatureSuccessAction | GetTemperatureCancelAction | TemperatureClearAction | GetTemperatureFailureAction;
export type TemperatureFavouriteAction = AddFavouriteAction | RemoveFavouriteAction;
export type TemperatureAction = TemperatureDataAction | TemperatureFavouriteAction;