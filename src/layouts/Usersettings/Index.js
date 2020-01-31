import React, { useState, useEffect } from 'react';
import withAuth from '../../helpers/withAuth'
import UserSettings from '../../components/UserSettings'


const UserSettingsPage = () => {
    return <>
        <UserSettings/>
    </>
}
export default withAuth(UserSettingsPage)
