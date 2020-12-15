import { combineReducers } from 'redux';    
import { firestoreReducer } from 'redux-firestore'


// Add Firebase to reducers
export default combineReducers({
    firestore: firestoreReducer,
  });