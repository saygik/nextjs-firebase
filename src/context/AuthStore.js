import React, {useReducer, useContext, useEffect} from 'react'
import authentication from '../services/firebase/authentication'
import moment from "moment";

const AuthStateContext = React.createContext()

//******* Action types *****************//
const actionTypes ={
    // SET_AUTH_USER:'SET_AUTH_USER',
    // SIGN_IN:'SIGN_IN',

    SIGN_IN_REQUEST:'SIGN_IN_REQUEST',
    SIGN_IN_SUCCESS:'SIGN_IN_SUCCESS',
    SIGN_IN_ERROR:'SIGN_IN_ERROR',
    SIGN_OUT_REQUEST:'SIGN_OUT_REQUEST',
    SIGN_OUT_SUCCESS:'SIGN_OUT_SUCCESS',
    SIGN_OUT_ERROR:'SIGN_OUT_ERROR',
    USER_UPDATE_REQUEST:'USER_UPDATE_REQUEST',
    USER_UPDATE_SUCCESS:'USER_UPDATE_SUCCESS',
    USER_UPDATE_ERROR:'USER_UPDATE_ERROR',
//    USER_UPDATE:'USER_UPDATE',
}
//**************************************//


//******* Initial state ****************//
const initialState={
    signedIn: false,
    authUser:null,
    signOutRequest: false,
    signInRequest: false,
    userUpdateRequest: false,
    counter:0
}
//**************************************//

//************* Reducer ****************//
const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.USER_UPDATE_REQUEST:
            return {...state, userUpdateRequest: true}
        case actionTypes.USER_UPDATE_SUCCESS:
            return {...state, userUpdateRequest: false, authUser: action.payload}
        case actionTypes.USER_UPDATE_ERROR:
            return {...state, userUpdateRequest: false}
        // case actionTypes.SIGN_IN:
        //     return {...state, signedIn: true}
        case actionTypes.SIGN_IN_REQUEST:
            return {...state, signInRequest: true}
        case actionTypes.SIGN_IN_SUCCESS:
            return {...state, signInRequest: false, signedIn: true, authUser: action.payload}
        case actionTypes.SIGN_IN_ERROR:
            return {...state, signInRequest: false, signedIn: false, authUser: null}
        case actionTypes.SIGN_OUT_REQUEST:
            return {...state, signOutRequest: true}
        case actionTypes.SIGN_OUT_SUCCESS:
            return {...state, signOutRequest: false, signedIn: false, authUser: null}
        case actionTypes.SIGN_OUT_ERROR:
            return {...state, signOutRequest: false}
        default:
            return state
    }
}
//**************************************//


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

//**************************************//
//*******     actions     *****************//
    const actions = {};
    actions.updateUser= () => {
        dispatch({type: actionTypes.USER_UPDATE_REQUEST})
    }
    actions.signIn= () => {
        dispatch({type: actionTypes.SIGN_IN_REQUEST})
    }
    actions.signOut= () => {
        dispatch({type: actionTypes.SIGN_OUT_REQUEST})
    }


//**************************************//
//***        side effects            ***//

//*******  authentication.onAuthStateChanged
    useEffect(()=>{
            authentication.onAuthStateChanged(authUser => {
                if(authUser) {
                    dispatch({type: actionTypes.SIGN_IN_SUCCESS, payload: {...authUser,lastSignInTime:moment(authUser.metadata.lastSignInTime).format("LLLL")}})
                }else {
                    dispatch({type: actionTypes.SIGN_IN_ERROR,})
                }
            });

        }
    ,[])

// **************** authentication.updateUser
    useEffect(()=>{
            state.userUpdateRequest
            &&  authentication.updateUser()
                .then(function (authUser) {
                    dispatch({type: actionTypes.USER_UPDATE_SUCCESS, payload: {...authUser,lastSignInTime:moment(authUser.metadata.lastSignInTime).format("LLLL")}})
                })
                .catch(function (error) {
                    console.log('NOT user updated now',)
                    dispatch({type: actionTypes.SIGN_IN_ERROR,})
                })
        }
        ,[state.userUpdateRequest])

// **************** authentication.signOut
    const signOutRequest = React.useMemo(() => {
        return state.signOutRequest
    }, [state.signOutRequest]);

    useEffect(()=>{
            state.signOutRequest
            &&  authentication.signOut()
                .then(function () {
                    dispatch({type: actionTypes.SIGN_OUT_SUCCESS})
                })
                .catch(function (error) {
                    console.log(error);
                    dispatch({type: actionTypes.SIGN_OUT_ERROR})
                })
    }
    ,[signOutRequest])

//***************** authentication.signIn
    useEffect(()=>{
            state.signInRequest
            &&  authentication.signInWithGoogleProvider()
                    .then((authCred) => {
                        dispatch({type: actionTypes.SIGN_IN_SUCCESS, payload: {...authCred.user,lastSignInTime:moment(authCred.user.metadata.lastSignInTime).format("LLLL")} })
                    })
                    .catch(err => {
                        console.log(err);
                    })
        }
        ,[state.signInRequest])
//**************************************//


//**********  Selectors  *********************//
    const userSelector = React.useMemo(() => {
        return state.authUser
    }, [state.authUser]);


    const signedIn = React.useMemo(() => {
        return state.signedIn
    }, [state.signedIn]);
//**************************************//
    const value={signedIn: signedIn, user: userSelector , actions}
    return (
            <AuthStateContext.Provider value={value}>
                {children}
            </AuthStateContext.Provider>
    )
}

export const useAuth = () => useContext(AuthStateContext)
