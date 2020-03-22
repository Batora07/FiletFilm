import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import '../css/Login.css';

import { FILETFILM_APP_LOGGEDIN } from '../utils/helpers';

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: { 
        signInSuccessWithAuthResult : () => {
            console.log('connection réussie');
            localStorage.setItem(FILETFILM_APP_LOGGEDIN, true);
            console.log('utilisateur connecté', firebase.auth().currentUser)
            debugger;
            return true;
        }
    }
};

class Login extends Component{
    render () {
        return (
            <div className="login">
                <Alert color="primary">
                    <h3>VOUS DEVEZ VOUS CONNECTER POUR CONTINUER</h3>
                </Alert>
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                    uiCallback={ui => ui.disableAutoSignIn()}
                />
            </div>
        )
    }
}

export { Login };