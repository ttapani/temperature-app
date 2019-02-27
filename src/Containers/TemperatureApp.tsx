import React, { Component } from 'react';
import '../App.css';
import { Temperature, TemperatureState, TemperatureAction } from '../store/temperature/types';
import { getTemperature, clearTemperature, addFavourite, removeFavourite, updateFavourites } from '../store/temperature/actions';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import List from '@material-ui/core/List';
import LocationSearch from './LocationSearch';
import LocationListItem from './LocationListItem';
import debounce from 'lodash/debounce';
import { getFavouriteLocations, getSearchResultLocations } from '../store/temperature/selectors';


interface IProps {
}

interface IStateProps {
    data: Temperature[];
    favourites: Temperature[];
    searchResults: Temperature[];
}

interface IDispatchProps {
    getTemperature: (id: string, cancelRequest?: () => boolean) => void;
    clearTemperature: () => void;
    addFavourite: (location: Temperature) => void;
    removeFavourite: (location: Temperature) => void;
    updateFavourites: () => void;
}

interface IState {
    timeout?: NodeJS.Timeout;
    updateTimer?: NodeJS.Timeout;
}

type Props = IStateProps & IProps & IDispatchProps;


class TemperatureApp extends Component<Props, IState> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        this.setState({ updateTimer: setInterval(() => this.props.updateFavourites(), 15000) });
    }

    handleSearchInputChanged = (value: string) => {
        this.props.clearTemperature();
        if(value.length > 0) {
            this.props.getTemperature(value, () => false);
        }
    }

    handleItemFavouriteClicked = (location: Temperature) => {
        if(this.props.favourites.includes(location)) {
            this.props.removeFavourite(location);
        } else {
            this.props.addFavourite(location);
            this.props.clearTemperature();
        }
    }

    render() {
        return (
                <div className="App">
                    <div className="App-base">
                        <div style={{ display: 'flex', maxWidth: 1500, flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }} >
                            <LocationSearch onChangeHandler={debounce(this.handleSearchInputChanged, 500)} onCancelSearch={() => this.props.clearTemperature()} />
                            <List id={'search-list'} style={{  }}>
                                {this.props.searchResults.map(row => <LocationListItem key={row.id} location={row} isFavourite={row.favourite} onFavouriteClicked={this.handleItemFavouriteClicked}/>)}
                            </List>
                            <List id={'favourites-list'} style={{  }}>
                                {this.props.favourites.map(row => <LocationListItem key={row.id} location={row} isFavourite={row.favourite} onFavouriteClicked={this.handleItemFavouriteClicked}/>)}
                            </List>
                        </div>
                    </div>
                </div>
            );
        }
    }

const mapStateToProps = (state: TemperatureState): IStateProps => ({ data: state.data, favourites: getFavouriteLocations(state), searchResults: getSearchResultLocations(state) });

const mapDispatchToProps = (dispatch: ThunkDispatch<TemperatureState, {}, TemperatureAction>): IDispatchProps => {
    return {
        getTemperature: async(id: string, cancelRequest?: () => boolean) => {
            await dispatch(getTemperature(id, cancelRequest))
        },
        clearTemperature: () => {
            dispatch(clearTemperature())
        },
        addFavourite: (location: Temperature) => {
            dispatch(addFavourite(location))
        },
        removeFavourite: (location: Temperature) => {
            dispatch(removeFavourite(location))
        },
        updateFavourites: () => {
            dispatch(updateFavourites())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureApp);