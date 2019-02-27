import { Action } from 'redux';


export interface TemperatureState {
    data: Temperature[];
    isLoading: boolean;
    error?: string;
}

export interface Temperature {
    id: number;
    name: string;
    temperature: number;
    lastUpdated?: number;
    favourite: boolean;
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

export interface UpdateFavouritesAction extends Action {
    type: 'temperature/UPDATE';
}

export interface ToggleFavouriteAction extends Action {
    type: 'temperature/TOGGLE_FAVOURITE';
    payload: {
        id: number;
    };
}


export type TemperatureDataAction = GetTemperatureAction | GetTemperatureSuccessAction | GetTemperatureCancelAction | TemperatureClearAction | GetTemperatureFailureAction;
export type TemperatureFavouriteAction = ToggleFavouriteAction | UpdateFavouritesAction;
export type TemperatureAction = TemperatureDataAction | TemperatureFavouriteAction;