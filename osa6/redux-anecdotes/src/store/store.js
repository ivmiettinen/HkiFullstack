import { createStore, combineReducers  } from 'redux'

import {composeWithDevTools} from 'redux-devtools-extension'

import anecdoteReducer from '../reducers/anecdoteReducer'
import newMessageReducer from '../reducers/notificationReducer'



const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    message: newMessageReducer

})


const store = createStore(reducer, composeWithDevTools())



export default store