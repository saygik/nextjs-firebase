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
import {useAuth} from "../../../../context/AuthStore"
import {getNameInitials} from "../../../../utils"
import AvatarSelector from "./AvatarSelector"

import {  makeStyles } from '@material-ui/core/styles';
const AccountTab =(props)=>{
    const {user, actions}=useAuth();
    const [performingAction, setPerformingAction]=useState(false)

    const handleDeleteAccount = () => {
        console.log('delete')
    }
    return (
        <>
            <Grid alignItems="center" container mb={3.5}>
                <Grid item xs>
                    <Box textAlign="center">
                        <Box mt={1.5} mb={1.5}>
                            <AvatarSelector
                                user={user}
                                updateUser={actions.updateUser}
                                performingAction={performingAction}
                                setPerformingAction={setPerformingAction}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs>
                </Grid>
                <Grid item xs >
                    <Box textAlign="center" >
                        <Typography variant="body1">Security rating</Typography>
                            <Typography color="primary" variant="h5">
                                90%
                            </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={3.5} >
                <List disablePadding>
                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <AccessTimeIcon />
                            </ListItemIcon>
                        </Hidden>

                        <Hidden xsDown>
                            <ListItemText
                                primary="Signed in"
                                secondary={user ? user.lastSignInTime: ''}
                            />
                        </Hidden>

                        <Hidden smUp>
                            <ListItemText
                                primary="Signed in"
                                secondary={user ? user.lastSignInTime: ''}
                            />
                        </Hidden>
                    </ListItem>

                    <Box mt={1} mb={1}>
                        <Divider light />
                    </Box>

                    <ListItem>
                        <Hidden xsDown>
                            <ListItemIcon>
                                <DeleteForeverIcon />
                            </ListItemIcon>
                        </Hidden>

                        <ListItemText
                            primary="Delete account"
                            secondary="Accounts can’t be recovered"
                        />

                        <ListItemSecondaryAction>
                            <Button
                                color="secondary"
                                disabled={performingAction}
                                variant="contained"
                                onClick={handleDeleteAccount}
                            >
                                Delete
                            </Button>
                        </ListItemSecondaryAction>
                    </ListItem>

                </List>
            </Box>

        </>
    )
}

export default AccountTab;
