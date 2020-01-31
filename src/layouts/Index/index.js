import Container from "@material-ui/core/Container";
import React from "react";
import { useAuth } from '../../context/AuthStore'


export default function App() {
    const {signedIn,user,dispatch, actions}= useAuth()
    //   const {signedIn}=state
    const handleLogout = () => {
        dispatch({type: actions.SIGN_OUT_REQUEST, payload: true})
    }
    const handleSignIn = () => {
        dispatch({type: actions.SIGN_IN_REQUEST, payload: true})
    }
//    console.log('--user--',user)
    return <Container maxWidth="lg">

        Hello Next.js 👋
        {!signedIn && <button onClick={handleSignIn}>Sign In using google</button>}
        {signedIn && <button onClick={handleLogout}>Logout</button>}
    </Container>;
}
