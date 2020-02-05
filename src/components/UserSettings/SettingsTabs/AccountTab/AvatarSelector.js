import React, {useEffect, useState} from 'react'
import Box from "@material-ui/core/Box"
import Badge from "@material-ui/core/Badge/Badge"
import Tooltip from "@material-ui/core/Tooltip"
import Fab from "@material-ui/core/Fab"
import CloseIcon from '@material-ui/icons/Close';
import PhotoIcon from '@material-ui/icons/Photo';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Fade from "@material-ui/core/Fade"
import CircularProgress from "@material-ui/core/CircularProgress"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import {getNameInitials} from "../../../../utils"
import Button from "@material-ui/core/Button"
import {  makeStyles } from '@material-ui/core/styles';
import authentication from "../../../../services/firebase/authentication"

const AvatarSelector = (props) => {
    const { userPhotoURL, avatar, avatarUrl,loadingAvatar, classes, performingAction } = props
    const { removeAvatar, handleAvatarChange, handleUploadAvatar, getInitials } = props
    return <>
    {/********* Badge if avatar and avatarUrl *********/}
    {(avatar && avatarUrl) &&
    <Badge classes={{ badge: classes.badge }} badgeContent={
        // ******** remove button  ********
        <Tooltip title="Remove">
            <Fab classes={{ sizeSmall: classes.small }} color="secondary"  size="small" onClick={removeAvatar}>
                <CloseIcon fontSize="small" />
            </Fab>
        </Tooltip>
    }>

        {/********* loading(CircularProgress) around avatar if loadingAvatar *********/}
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

        {/********* simply avatar if not loadingAvatar *********/}
        {!loadingAvatar &&
        <Avatar className={classes.avatar} alt="Avatar" src={avatarUrl} />
        }
        {/********** end avatar*********/}

    </Badge>
    }

    {/********* Not avatar and not avatarUrl *********/}
    {(!avatar && !avatarUrl) &&
    <>
        {/********* Badge if user.photoURL *********/}
        {userPhotoURL &&
        <Badge classes={{ badge: classes.badge }} badgeContent={
            <Tooltip title="Remove">
                <Fab classes={{ sizeSmall: classes.small }} color="secondary"  size="small" onClick={removeAvatar}>
                    <CloseIcon fontSize="small" />
                </Fab>
            </Tooltip>
        }>
            {/********* loading(CircularProgress) around avatar if loadingAvatar *********/}
            {loadingAvatar &&
            <Badge classes={{ badge: classes.loadingBadge }} badgeContent={
                <Fade
                    style={{ transitionDelay: '1s' }}
                    in={loadingAvatar}
                    unmountOnExit>
                    <CircularProgress size={120} thickness={1.8} />
                </Fade>
            }>
                <Avatar className={classes.avatar} alt="Avatar" src={userPhotoURL} />
            </Badge>
            }

            {/********* simply avatar if not loadingAvatar *********/}
            {!loadingAvatar &&
            <Avatar className={classes.avatar} alt="Avatar" src={userPhotoURL} />
            }
        </Badge>
        }
        {/********* Badge if not user.photoURL *********/}
        {!userPhotoURL &&
        <>
            {/********* loading(CircularProgress) around avatar if loadingAvatar *********/}
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
                    <Typography className={classes.nameInitials} variant="h2">{getInitials()}</Typography>
                </Avatar>
            </Badge>
            }

            {/********* simply avatar if not loadingAvatar *********/}
            {!loadingAvatar &&
            <Avatar className={classes.avatar} alt="Avatar">
                <Typography className={classes.nameInitials} variant="h2">{getInitials()}</Typography>
            </Avatar>
            }
        </>
        }
    </>
    }
        <Box mt={1.5} mb={1.5}>
    {/********* Upload button if avatar and avatarUrl *********/}
    {(avatar && avatarUrl) &&
    <Button
        color="primary"
        disabled={performingAction}
        startIcon={<CloudUploadIcon />}
        variant="contained"
        onClick={handleUploadAvatar}>
        Upload
    </Button>
    }

    {/********* Choose file button if no avatar and no avatarUrl *********/}
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
            <Button
                color="primary"
                disabled={performingAction}
                component="span"
                startIcon={<PhotoIcon />}
                variant="contained">
                Choose...
            </Button>
        </label>
    </>
    }
        </Box>

</>
}

const AvatarSelectorContainer = (props) => {
    const  classes  = useStyles();
    const {user, updateUser, performingAction, setPerformingAction}=props

    const [avatar, setAvatar]=useState(null)
    const [avatarUrl, setAvatarUrl]=useState('')
    const [loadingAvatar, setLoadingAvatar]=useState(false)

    useEffect(()=>{
        if (loadingAvatar) {
            setPerformingAction(true)
            authentication.changeAvatar(avatar).then((value) => {
            setAvatar(null)
            setAvatarUrl('')
            updateUser()
            }).catch((reason) => {
                console.log('not changed avatar', reason)
            }).finally(() => {
                setLoadingAvatar(false)
                setPerformingAction(false)
            });

        }
    }, [loadingAvatar])

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
            console.log('-image file size too big-');
            return;
        }
        setAvatar(avatarNew)
        setAvatarUrl(URL.createObjectURL(avatarNew))

    };
    const removeAvatar = () => {
        if (!user.photoURL && !avatar && !avatarUrl) {
            return;
        }
        setPerformingAction(true)

        if ((!user.photoURL && avatar && avatarUrl) || (user.photoURL && avatar && avatarUrl)) {
            URL.revokeObjectURL(avatarUrl);
            setAvatar(null)
            setAvatarUrl('')
            setPerformingAction(false)
        } else if (user.photoURL && !avatar && !avatarUrl) {
            authentication.removeAvatar()
                .then((value) => {
                    setAvatar(null)
                    setAvatarUrl('')
                    updateUser()
//                    console.log('avatar removed')
                })
                .catch((reason) => {
                const code = reason.code;
                const message = reason.message;

                switch (code) {
                    default:
                        return;
                }
                })
                .finally(() => {
                    setPerformingAction(false)
            });
        }
    };
    const handleUploadAvatar = () => {
        setLoadingAvatar(true)
    }
    const getInitials=()=>{
        return getNameInitials(user)
    }

  //  console.log('performingAction',performingAction)
//    console.log('user',user && user)
    return <AvatarSelector
        classes={classes}
        userPhotoURL={user ? user.photoURL : ''}
        avatar={avatar}
        avatarUrl={avatarUrl}
        removeAvatar={removeAvatar}
        handleAvatarChange={handleAvatarChange}
        loadingAvatar={loadingAvatar}
        performingAction={performingAction}
        handleUploadAvatar={handleUploadAvatar}
        getInitials={getInitials}
    />
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

export default AvatarSelectorContainer
