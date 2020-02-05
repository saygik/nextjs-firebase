import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import React from 'react';
import MenuAppDrawer from './MenuAppDrawer';
import {useAuth} from "../context/AuthStore"
import router from 'next/router';



function MenuAppBar(props) {
    const {signedIn, anchorEl,open, classes}= props
    const {handleLogout, handleSignIn,handleClose,handleMenu, handleUserSettings}= props

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <MenuAppDrawer />
                    <Typography variant="h6" className={classes.title}>
                        AJ's Books
                    </Typography>
                    {signedIn && (
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleUserSettings}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!signedIn && (
                        <div>
                            <Button onClick={handleSignIn} color="inherit">Sign In</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

function MenuAppBarContainer() {
    const classes = useStyles();
    const {signedIn, actions}= useAuth()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleMenu=(event)=>
        setAnchorEl(event.currentTarget);
    const handleClose=()=>
        setAnchorEl(null);

    const handleUserSettings = () => {
        setAnchorEl(null);
        router.push('/usersettings')
    }
    const handleLogout = () => {
        setAnchorEl(null);
        actions.signOut()
//        dispatch({type: actions.SIGN_OUT_REQUEST, payload: true})
    }
    const handleSignIn = () => {
        setAnchorEl(null);
        actions.signIn()
//        dispatch({type: actions.SIGN_IN_REQUEST, payload: true})
    }

    return  <MenuAppBar
        classes={classes}
        signedIn={signedIn}
        anchorEl={anchorEl}
        open={open}
        handleLogout={handleLogout}
        handleSignIn={handleSignIn}
        handleMenu={handleMenu}
        handleClose={handleClose}
        handleUserSettings={handleUserSettings}
    />
}

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            paddingBottom: '10px'
        },
        title: {
            flexGrow: 1
        }
    })
);

export default MenuAppBarContainer;
