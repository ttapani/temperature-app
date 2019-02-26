import { ActionCreator } from 'redux';
import { Temperature, TemperatureState, TemperatureDataAction } from './types';
import { GetTemperatureAction, GetTemperatureSuccessAction, GetTemperatureCancelAction, GetTemperatureFailureAction, TemperatureClearAction } from './types';
import { AddFavouriteAction, RemoveFavouriteAction } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';


export const getTemperatureStarted: ActionCreator<GetTemperatureAction> = (id: number) => ({
    type: 'temperature/GET',
    payload: {
        id,
    },
});

export const getTemperatureSuccess: ActionCreator<GetTemperatureSuccessAction> = (data: Temperature) => ({
    type: 'temperature/GET_SUCCESS',
    payload: {
        data,
    },
});

export const getTemperatureCancel: ActionCreator<GetTemperatureCancelAction> = () => ({
    type: 'temperature/GET_CANCEL',
});

export const getTemperatureFailure: ActionCreator<GetTemperatureFailureAction> = (error: string) => ({
    type: 'temperature/GET_FAILURE',
    payload: {
        error,
    },
});

export const clearTemperature: ActionCreator<TemperatureClearAction> = () => ({
    type: 'temperature/CLEAR',
});

export const addFavourite: ActionCreator<AddFavouriteAction> = (location: Temperature) => ({
    type: 'temperature/ADD_FAVOURITE',
    payload: {
        location,
    },
});

export const removeFavourite: ActionCreator<RemoveFavouriteAction> = (location: Temperature) => ({
    type: 'temperature/REMOVE_FAVOURITE',
    payload: {
        location,
    },
});

export interface WeatherData {
    main: {
        temp: number;
    }
}

export const getTemperature = (id: string, cancelRequest?: () => boolean): ThunkAction<Promise<void>, TemperatureState, {}, TemperatureDataAction> => {
    return async (dispatch: ThunkDispatch<TemperatureState, {}, TemperatureDataAction>, getState): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            dispatch(getTemperatureStarted(id))
            const response = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${id}&APPID=eb4836697d2cdb9246701fb7a78ba3a5&units=metric`);
            response.then((response) => {
                if(response.status === 200) {
                    return response.json();
                } else {
                    dispatch(getTemperatureFailure());
                    resolve();
                }
            }).then((data) => {
                let cancelled = false;
                if(cancelRequest) {
                    cancelled = cancelRequest();
                }
                if(data && !cancelled) {
                    dispatch(getTemperatureSuccess({ id: data.id, name: data.name, temperature: data.main.temp}));
                } else {
                    dispatch(getTemperatureCancel());
                }
                resolve();
            }).catch((error) => {
                dispatch(getTemperatureFailure(error));
                resolve();
            });
        });
    };
};
