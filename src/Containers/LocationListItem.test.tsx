import React from 'react';
import LocationListItem from './LocationListItem';
import renderer from 'react-test-renderer';
import { Temperature } from '../store/temperature/types';

test('Item renders the location', () => {
    const location: Temperature = { id: 1, name: 'Asd', temperature: 5 };
    const component = renderer.create(
        <LocationListItem location={location} onFavouriteClicked={() => null} />,
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });