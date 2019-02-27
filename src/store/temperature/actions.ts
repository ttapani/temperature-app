import { ActionCreator } from 'redux';
import { Temperature, TemperatureState, TemperatureDataAction } from './types';
import { GetTemperatureAction, GetTemperatureSuccessAction, GetTemperatureCancelAction, GetTemperatureFailureAction, TemperatureClearAction } from './types';
import { ToggleFavouriteAction, UpdateFavouritesAction } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import moment from 'moment';


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

export const toggleFavourite: ActionCreator<ToggleFavouriteAction> = (id: number) => ({
    type: 'temperature/TOGGLE_FAVOURITE',
    payload: {
        id,
    },
});

export interface WeatherData {
    name: string;
    id: number;
    main: {
        temp: number;
    }
}

export const getTemperature = (id: string, update?: boolean,cancelRequest?: () => boolean): ThunkAction<Promise<void>, TemperatureState, {}, TemperatureDataAction> => {
    return async (dispatch: ThunkDispatch<TemperatureState, {}, TemperatureDataAction>, getState): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            dispatch(getTemperatureStarted(id))
            const response = fetch(`${process.env.REACT_APP_REQUEST_URL}?q=${id}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`);
            response.then((response) => {
                if(response.status === 200) {
                    return response.json();
                } else {
                    dispatch(getTemperatureFailure());
                    resolve();
                }
            }).then((data: WeatherData) => {
                let cancelled = false;
                if(cancelRequest) {
                    cancelled = cancelRequest();
                }
                if(data && !cancelled) {
                    dispatch(getTemperatureSuccess({ id: data.id, name: data.name, temperature: data.main.temp, lastUpdated: Date.now(), favourite: update }));
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

export const updateFavourites = (): ThunkAction<Promise<void>, TemperatureState, {}, UpdateFavouritesAction> => {
    return async (dispatch: ThunkDispatch<TemperatureState, {}, UpdateFavouritesAction>, getState): Promise<void> => {
        return new Promise<void>((resolve, reject) => {
            let state = getState();
            state.data.forEach(location => {
                if(moment(location.lastUpdated).add(1, 'm').isBefore(moment())) {
                    dispatch(getTemperature(location.name, true));
                }
            })
        });
    };
};