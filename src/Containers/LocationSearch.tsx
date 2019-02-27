import React, { Component, createRef } from 'react';
import { Button, Paper, IconButton, InputBase, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { Temperature, TemperatureState, TemperatureAction } from '../store/temperature/types';
import { getTemperature } from '../store/temperature/actions';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';


interface IProps extends WithStyles<typeof styles> {
    onChangeHandler: (value: string) => void;
    onCancelSearch: () => void;
}

interface IStateProps {
    data: Temperature[];
}

interface IDispatchProps {
    getTemperature: (id: string, cancelRequest?: () => boolean) => void;
}

interface IState {
    inputValue: string;
}

type Props = IStateProps & IProps & IDispatchProps;


export const styles = (theme: Theme) => createStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '95%',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
});


export class LocationSearch extends Component<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = { inputValue: '' };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.setState({ inputValue: value });
        this.props.onChangeHandler(value);
    }

    cancelSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ inputValue: '' });
        this.props.onCancelSearch();
    }

    renderCancel = () => {
        const { classes } = this.props;
        if(this.state.inputValue !== '') {
            return (
                <IconButton className={classes.iconButton} aria-label="Cancel" onClick={this.cancelSearch}>
                    <CancelIcon />
                </IconButton>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <IconButton className={classes.iconButton} aria-label="Search">
                    <SearchIcon />
                </IconButton>
                <InputBase value={this.state.inputValue} className={classes.input} placeholder="Search for locations" onChange={this.handleInputChange} />
                {this.renderCancel()}
            </Paper>
          );
    }
}

const mapStateToProps = (state: TemperatureState): IStateProps => ({ data: state.data });

const mapDispatchToProps = (dispatch: ThunkDispatch<TemperatureState, {}, TemperatureAction>): IDispatchProps => {
    return {
        getTemperature: async(id: string, cancelRequest?: () => boolean) => {
            await dispatch(getTemperature(id, cancelRequest))
        }
    }
}

export const StyledLocationSearch = withStyles(styles)(LocationSearch);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LocationSearch));