import React from 'react';
import { StyledLocationSearch } from './LocationSearch';
import renderer from 'react-test-renderer';
import { Temperature } from '../store/temperature/types';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: red,
    },
    typography: {
        useNextVariants: true,
    },
});

test('Renders a search bar', () => {
    const locations: Temperature[] = [ { id: 1, name: 'Asd', temperature: 5 }, { id: 1, name: 'Asd', temperature: 5 }];
    const component = renderer.create(
        <MuiThemeProvider theme={theme}>
            <StyledLocationSearch data={locations} getTemperature={() => null} onChangeHandler={() => null} onCancelSearch={() => null} />
        </MuiThemeProvider>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });