import React from 'react';
import LocationListItem from './LocationListItem';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { Temperature } from '../store/temperature/types';


const mockPositiveTempLocation: Temperature = { id: 1, name: 'Asd', temperature: 5 };
const mockNegativeTempLocation: Temperature = { id: 1, name: 'Asd', temperature: -10 };
const mockLocationItem = (location: Temperature) =>  <LocationListItem location={location} onFavouriteClicked={() => null} />;

test('Item renders the location', () => {
    const component = renderer.create(
        mockLocationItem(mockPositiveTempLocation),
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

describe('<LocationListItem />', () => {
    it('renders a positive temperature', () => {
        const wrapper = mount(mockLocationItem(mockPositiveTempLocation));
        expect(wrapper.contains(<div className="LocationListItem-temperatureText-3 LocationListItem-temperatureWarm-4">+5,0 °C</div>)).toEqual(true);
    });

    it('renders a negative temperature', () => {
        const wrapper = mount(mockLocationItem(mockNegativeTempLocation));
        expect(wrapper.contains(<div className="LocationListItem-temperatureText-3 LocationListItem-temperatureCold-5">-10,0 °C</div>)).toEqual(true);
    });
});