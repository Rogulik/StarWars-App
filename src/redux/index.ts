import { createStore, compose } from 'redux';
import { fbConfig } from '../utils/config'
import { reduxFirestore } from 'redux-firestore';
import rootReducer from './reducer'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth'


const firebaseClient = ():void => {
    if(!firebase.apps.length){
        firebase.initializeApp(fbConfig)
    }
}

firebaseClient()


// Initialize Cloud Firestore through Firebase
firebase.firestore();

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

export default store
const auth = firebase.auth()
export {
  auth,
  firebaseClient
} 