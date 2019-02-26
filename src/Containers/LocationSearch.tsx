import React, { Component } from 'react';
import { Button, Paper, IconButton, InputBase, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import { Temperature, TemperatureState, TemperatureAction } from '../store/temperature/types';
import { getTemperature } from '../store/temperature/actions';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import SearchIcon from '@material-ui/icons/Search';


interface IProps extends WithStyles<typeof styles> {
    onChangeHandler: (value: string) => void;
}

interface IStateProps {
    data: Temperature[];
}

interface IDispatchProps {
    getTemperature: (id: string, cancelRequest?: () => boolean) => void;
}

interface IState {
}

type Props = IStateProps & IProps & IDispatchProps;


const styles = (theme: Theme) => createStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '60vh',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
});


class LocationSearch extends Component<Props, IState> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <IconButton className={classes.iconButton} aria-label="Search">
                    <SearchIcon />
                </IconButton>
                <InputBase className={classes.input} placeholder="Search for locations" onChange={event => this.props.onChangeHandler(event.target.value)}  />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LocationSearch));