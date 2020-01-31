import React, {useReducer, useContext, useEffect} from 'react'
import {auth, firebase} from '../services/firebase/firebase'
import authentication from '../services/firebase/authentication'

const AuthStateContext = React.createContext()

//******* Action types *****************//
const actions ={
    SET_AUTH_USER:'SET_AUTH_USER',
    SIGN_IN:'SIGN_IN',
    SIGNED_OUT:'SIGNED_OUT',
    SIGN_IN_REQUEST:'SIGN_IN_REQUEST',
    SIGN_OUT_REQUEST:'SIGN_OUT_REQUEST',
}

//**************************************//


//******* Initial state ****************//
const initialState={
    signedIn: false,
    authUser:null,
    signOutRequest: false,
    signInRequest: false,
    counter:0
}
//**************************************//

//************* Reducer ****************//
const reducer = (state, action) => {
    switch (action.type) {
        case actions.SET_AUTH_USER:
            return {...state, authUser: action.payload}
        case actions.SIGN_IN:
            // console.log('signedIn set true')
            return {...state, signedIn: true}
        case actions.SIGNED_OUT:
            // console.log('signedIn set false')
            return {...state, signedIn: false}
        case actions.SIGN_IN_REQUEST:
            return {...state, signInRequest: action.payload}
        case actions.SIGN_OUT_REQUEST:
            return {...state, signOutRequest: action.payload}
        default:
            return state
    }
}
//**************************************//


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(()=>{
            authentication.onAuthStateChanged(authUser => {
          //      console.log(authUser);
                if(authUser) {
//                    const token=authUser.getIdToken()
//                    console.log('-token-',token)
                    dispatch({type: actions.SET_AUTH_USER, payload: authUser})
                    dispatch({type: actions.SIGN_IN,})
                }else {
                    dispatch({type: actions.SIGNED_OUT,})
                    dispatch({type: actions.SET_AUTH_USER, payload: null})
                }
            });

        }
    ,[])
    useEffect(()=>{
            state.signOutRequest
            &&  authentication.signOut()
                .then(function () {
                    dispatch({type: actions.SIGNED_OUT,})
                })
                .catch(function (error) {
                    console.log(err);
                })
                .finally(()=>{
                    dispatch({type: actions.SIGN_OUT_REQUEST, payload: false})
                });
    }
    ,[state.signOutRequest])
    useEffect(()=>{
            state.signInRequest
            &&  authentication.signInWithGoogleProvider()
                    .then(() => {
                        console.log('You are signed In')
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(()=>{
                        dispatch({type: actions.SIGN_IN_REQUEST, payload: false})
                });
        }
        ,[state.signInRequest])


    const value={signedIn: state.signedIn,user: state.authUser , dispatch, actions}
    return (
            <AuthStateContext.Provider value={value}>
                {children}
            </AuthStateContext.Provider>
    )
}

export const useAuth = () => useContext(AuthStateContext)
