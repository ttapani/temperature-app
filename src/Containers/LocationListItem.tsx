import React, { Component } from 'react';
import { Button, Paper, IconButton, InputBase, Divider, createStyles, Theme, withStyles, WithStyles, Typography, ListItemIcon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import Favorite from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import { Temperature } from '../store/temperature/types';


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
    text: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 8,
        marginRight: -8
    }
});


class LocationListItem extends Component<IProps> {
    static defaultProps = {
        isFavourite: false,
    }

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { classes, location, onFavouriteClicked, isFavourite } = this.props;
        return (
            <ListItem>
                <Paper className={classes.root} elevation={1}>
                    <ListItemText className={classes.text} primary={location.name + ' ' + location.temperature}/>
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