import { createSelector } from 'reselect'
import { TemperatureState, Temperature } from './types';


const getData = (state: TemperatureState) => state.data;

export const getFavouriteLocations = createSelector(
    [getData],
        (data: Temperature[]) => {
            return data.filter(loc => loc.favourite);
        }
)

export const getSearchResultLocations = createSelector(
    [getData],
        (data: Temperature[]) => {
            return data.filter(loc => !loc.favourite);
        }
)