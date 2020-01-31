import React, { useState } from 'react';


import {makeStyles} from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Hidden from '@material-ui/core/Hidden';

import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import SecurityIcon from '@material-ui/icons/Security';

//import SwipeableViews from 'react-swipeable-views';


import AccountTab from './SettingsTabs/AccountTab';
import SecurityTab from './SettingsTabs/SecurityTab';


const useStyles = makeStyles(theme => ({
    root: {
        width: '550px',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1)
    },

    tabs: {
        display: 'initial'
    }
}));

const tabs = [
    {
        key: 'account',
        icon: <AccountCircleIcon />,
        label: 'Account',
    },
    {
        key: 'security',
        icon: <SecurityIcon />,
        label: 'Security',
    }
];

const  SettingsDialog =()=>{

    const handleTabChange = (event, value) => {
        setSelectedTab(value)
    };
        // Styling
    const  classes  = useStyles();

    const [ selectedTab, setSelectedTab ] = useState(0);
    return "vfvfvfv"
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
        >

            <Grid
                item xs={5}
                className={classes.root}
            >
                    <Tabs
                        classes={{ root: classes.tabs }}
                        style={{ overflow: 'initial', minHeight: 'initial' }}
                        indicatorColor="primary"
                        textColor="primary"
                        value={selectedTab}
                        variant="fullWidth"
                        onChange={handleTabChange}>
                        {tabs.map((tab) => {
                            return (
                                <Tab key={tab.key} icon={tab.icon} label={tab.label} />
                            );
                        })}
                    </Tabs>
                    {selectedTab=== 0 && <AccountTab />}
                    {selectedTab=== 1 && <SecurityTab />}
            </Grid>

        </Grid>

        );
}


export default SettingsDialog;
