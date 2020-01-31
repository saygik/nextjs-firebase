import React, { useState, useEffect } from 'react';



//import validate from 'validate.js';
//import moment from 'moment';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

import CloseIcon from '@material-ui/icons/Close';
import PhotoIcon from '@material-ui/icons/Photo';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import EmailIcon from '@material-ui/icons/Email';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import {  makeStyles } from '@material-ui/core/styles';
const AccountTab =(props)=>{
    const  classes  = useStyles();
    const [avatar, setAvatar]=useState(null)
    const [avatarUrl, setAvatarUrl]=useState('')
    const [loadingAvatar, setLoadingAvatar]=useState(false)


   const getNameInitials = () => {

        const firstName = 'Igor'
        const lastName = 'Krapivin'
        const username = 'say'
        const displayName = ''

        if (firstName && lastName) {
            return firstName.charAt(0) + lastName.charAt(0);
        } else if (firstName) {
            return firstName.charAt(0)
        } else if (lastName) {
            return lastName.charAt(0);
        } else if (username) {
            return username.charAt(0);
        } else if (displayName) {
            return displayName.charAt(0);
        } else {
            return 'NN';
        }
    };
    useEffect(()=>{
        loadingAvatar && auth.changeAvatar(avatar).then((value) => {
            console.log('changed avatar')
        }).catch((reason) => {
            const code = reason.code;
            const message = reason.message;
            console.log('not changed avatar')
        }).finally(() => {
            setLoadingAvatar(false)
        });
    }, [loadingAvatar])

   const uploadAvatar = () => {

        if (!avatar) {
            return;
        }
       setLoadingAvatar(true)
    };
   const handleAvatarChange = (event) => {
        if (!event) {
            return;
        }

        const files = event.target.files;

        if (!files) {
            return;
        }

        const avatarNew = files[0];

        if (!avatarNew) {
            return;
        }

        const fileTypes = [
            'image/gif',
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/svg+xml'
        ];

        if (!fileTypes.includes(avatarNew.type)) {
            return;
        }

        if (avatarNew.size > (20 * 1024 * 1024)) {
            return;
        }
       setAvatar(avatarNew)
       setAvatarUrl(URL.createObjectURL(avatarNew))

    };

   const removeAvatar = () => {
        const { user } = this.props;
        const { avatar, avatarUrl } = this.state;

        if (!user.photoURL && !avatar && !avatarUrl) {
            return;
        }

        if ((!user.photoURL && avatar && avatarUrl) || (user.photoURL && avatar && avatarUrl)) {
            URL.revokeObjectURL(avatarUrl);
            setAvatar(null)
            setAvatarUrl('')
        } else if (user.photoURL && !avatar && !avatarUrl) {
                authentication.removeAvatar().then((value) => {
                    this.props.openSnackbar('Removed avatar');
                }).catch((reason) => {
                    const code = reason.code;
                    const message = reason.message;

                    switch (code) {
                        default:
                            this.props.openSnackbar(message);
                            return;
                    }
                }).finally(() => {
                    this.setState({
                        performingAction: false,
                        loadingAvatar: false
                    });
                });
        }
    };

    return (
        <>
            <Grid alignItems="center" container>
                <Grid item xs>
                    <Box textAlign="center">
                        <Box mb={1.5}>
                            {(avatar && avatarUrl) &&
                            <Badge classes={{ badge: classes.badge }} badgeContent={
                                <Tooltip title="Remove">
                                    {/*<Fab classes={{ sizeSmall: classes.small }} color="secondary"  size="small" onClick={removeAvatar}>*/}
                                    {/*    <CloseIcon fontSize="small" />*/}
                                    {/*</Fab>*/}
                                </Tooltip>
                            }>
                                {loadingAvatar &&
                                <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                                    <Fade
                                        style={{ transitionDelay: '1s' }}
                                        in={loadingAvatar}
                                        unmountOnExit>
                                        <CircularProgress size={120} thickness={1.8} />
                                    </Fade>
                                }>
                                    <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
                                </Badge>
                                }

                                {!loadingAvatar &&
                                <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
                                }
                            </Badge>
                            }

                            {(!avatar && !avatarUrl) &&
                            <>
                                {
                                <Badge classes={{ badge: classes.badge }} badgeContent={
                                    <Tooltip title="Remove">
                                        {/*<Fab classes={{ sizeSmall: classes.small }} color="secondary" size="small" onClick={removeAvatar}>*/}
                                        {/*    <CloseIcon fontSize="small" />*/}
                                        {/*</Fab>*/}
                                    </Tooltip>
                                }>
                                    {loadingAvatar &&
                                    <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                                        <Fade
                                            style={{ transitionDelay: '1s' }}
                                            in={loadingAvatar}
                                            unmountOnExit>
                                            <CircularProgress size={120} thickness={1.8} />
                                        </Fade>
                                    }>
                                        <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
                                    </Badge>
                                    }

                                    {!loadingAvatar &&
                                    <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
                                    }
                                </Badge>
                                }

                                {
                                <>
                                    {loadingAvatar &&
                                    <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                                        <Fade
                                            style={{ transitionDelay: '1s' }}
                                            in={loadingAvatar}
                                            unmountOnExit>
                                            <CircularProgress size={120} thickness={1.8} />
                                        </Fade>
                                    }>
                                        <Avatar className={classes.avatar} alt="Avatar">
                                            <Typography className={classes.nameInitials} variant="h2">{getNameInitials()}</Typography>
                                        </Avatar>
                                    </Badge>
                                    }

                                    {!loadingAvatar &&
                                    <Avatar className={classes.avatar} alt="Avatar">
                                        <Typography className={classes.nameInitials} variant="h2">{getNameInitials()}</Typography>
                                    </Avatar>
                                    }
                                </>
                                }
                            </>
                            }
                        </Box>

                        {(avatar && avatarUrl) &&
                        <Button color="primary" startIcon={<CloudUploadIcon />} variant="contained" onClick={uploadAvatar}>
                            Upload
                        </Button>
                        }

                        {(!avatar && !avatarUrl) &&
                        <>
                            <input
                                id="avatar-input"
                                type="file"
                                hidden
                                accept="image/*"

                                onChange={handleAvatarChange}
                            />

                            <label htmlFor="avatar-input">
                                <Button color="primary" component="span"  startIcon={<PhotoIcon />} variant="contained">
                                    Choose...
                                </Button>
                            </label>
                        </>
                        }
                    </Box>
                </Grid>

                <Grid item xs>

                </Grid>
                <Grid item xs>

                </Grid>

            </Grid>

        </>
    )

}

const useStyles = makeStyles(theme => ({
    dialogContent: {
        paddingTop: theme.spacing(2)
    },

    badge: {
        top: theme.spacing(2),
        right: -theme.spacing(2)
    },

    loadingBadge: {
        top: '50%',
        right: '50%'
    },

    avatar: {
        marginRight: 'auto',
        marginLeft: 'auto',

        width: theme.spacing(14),
        height: theme.spacing(14)
    },

    nameInitials: {
        cursor: 'default'
    },

    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),

        minHeight: 'initial'
    }
}));

export default AccountTab;
