import React, { Component } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { Provider } from 'react-redux';
import { initStore } from './store/store';
import TemperatureApp from './Containers/TemperatureApp';


const theme = createMuiTheme({
    palette: {
        primary: red,
    },
    typography: {
        useNextVariants: true,
    },
});

interface IProps {
}

const store = initStore();

class App extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <Provider store={store}>
                    <TemperatureApp/>
                </Provider>
            </MuiThemeProvider>
            );
        }
    }

export default App;