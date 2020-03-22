import React from 'react';
import firebase from 'firebase';
import { Paypal } from '../components';

const client = {
    sandbox: "", // mettre Paypal SANDBOX API KEY
    production: "" // mettre Paypal API KEY PROD
};

const env = process.env.NODE_ENV === "production" ? "production" : "sandbox";

const total = 1;

const currency = "USD";

const onError = (error) => {
    console.log('erreur', error);
}

const onCancel = data => console.log('paiement annulé', data);

const Payment = props => {
    const onSuccess = payment => {
        console.log('paiement réussi');
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const user = firebase.auth().currentUser;
                console.log('user', user);
                const dbRef = firebase.database().ref(`users/${user.uid}`);
                console.log('dbRef', dbRef);
                const now = new Date();
                const newDate = now.setDate(now.getDate() + 30);
                console.log('newDate', newDate);
                dbRef
                    .set({validUntil: newDate})
                        .then(() => {
                            console.log('opération réussie');
                            this.props.history.push({ pathname: '/'})
                        })
                        .catch(e => {
                            console.log('error', e);
                        })
            } else {
              // No user is signed in.
              this.props.history.push({pathname: "/login"});
            }
          });
    };
    return (
        <Paypal 
            env={env}
            client={client}
            total={total}
            currency={currency}
            onError={onError}
            onCancel={onCancel}
            onSuccess={onSuccess}
        />
    )
};

export { Payment };