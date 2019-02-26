import React, { Component } from 'react';
import { Button, Paper, IconButton, InputBase, Divider, createStyles, Theme, withStyles, WithStyles, Typography, ListItemIcon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Favorite from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import { Temperature } from '../store/temperature/types';
import classNames from 'classnames';


interface IProps extends WithStyles<typeof styles> {
    location: Temperature;
    isFavourite?: boolean;
    onFavouriteClicked: (location: Temperature) => void;
}


const styles = (theme: Theme) => createStyles({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    locationText: {
        marginLeft: 8,
        flexShrink: 1,
        minWidth: 100,
        maxWidth: 100,
    },
    temperatureText: {
        margin: 8,
        flexGrow: 1,
        fontSize: 40,
        textAlign: 'right',
        minWidth: 150,
        textOverflow: 'ellipsis',
    },
    temperatureWarm: {
        color: 'red',
    },
    temperatureCold: {
        color: 'blue',
    },
    iconButton: {
        padding: 8,
        marginRight: -8,
        minWidth: 50,
    }
});


class LocationListItem extends Component<IProps> {
    static defaultProps = {
        isFavourite: false,
    }

    constructor(props: IProps) {
        super(props);
    }

    formatTemperature = (temperature: number): string => {
        let formatted = temperature.toFixed(1).toString();
        if(temperature > 0) {
            formatted = '+' + formatted;
        }
        formatted = formatted.replace('.', ',');
        formatted = formatted + ' °C';
        return formatted;
    }

    render() {
        const { classes, location, onFavouriteClicked, isFavourite } = this.props;
        return (
            <ListItem>
                <Paper className={classes.root} elevation={1}>
                    <ListItemText className={classes.locationText} primary={location.name}/>
                    {/* <ListItemText className={classNames(classes.temperatureText, { [classes.temperatureWarm]: true, })} primary={location.temperature}/> */}
                    <div
                        className={classNames(classes.temperatureText, { [classes.temperatureWarm]: this.props.location.temperature > 0, [classes.temperatureCold]: this.props.location.temperature <= 0 })}>{this.formatTemperature(location.temperature)}
                    </div>
                    <ListItemIcon>
                        <Tooltip title={isFavourite ? 'Unfavourite' : 'Favourite'} aria-label='Favourite' >
                            <IconButton className={classes.iconButton} onClick={() => onFavouriteClicked(location)}>
                                {this.props.isFavourite ? <Favorite/> : <FavoriteBorderOutlined />}
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>
                </Paper>
            </ListItem>
          );
    }
}

export default withStyles(styles)(LocationListItem);