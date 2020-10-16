// import anecdoteService from '../services/anecdotes'

const messageAtStart = [{ content: '' }]

export const newMessage = (message) => {
    return {
        type: 'NEW_MESSAGE',
        message: 'message',
    }
}

export const showAnecdote = (anecdote) => {
    return {
        type: 'SHOW_ANECDOTE',
        content: anecdote,
    }
}

export const showNewAnecdoteNotif = (anecdote) => {
    return {
        type: 'NEW_ANECDOTE_NOTIF',
        content: anecdote,
    }
}


const emptyNotif = () => {
    return async (dispatch) => {
        dispatch({ type: 'EMPTY_MESSAGE', content: '' })
    }
}

export const setNewNotification = (notif, time) => {
    // console.log('NOTIF', notif)
    // console.log('TIME:', time)
    return async (dispatch) => {
        dispatch({
            type: 'NEW_ANECDOTE_NOTIF',
            content: notif,
        })
        setTimeout(() => {
            dispatch(emptyNotif())
        }, time * 500)
    }
}



const newMessageReducer = (state = messageAtStart, action) => {
    // console.log('action', action)

    // console.log('state now: ', state)
    // console.log('action JA ID', action.id)

    switch (action.type) {
        case 'NEW_MESSAGE':
            // const findId = state.find((p) => p.id === id)

            // console.log('accccc', action)
            return action.message

        case 'SHOW_ANECDOTE':
            const newState = [action.content]

            return newState

        case 'NEW_ANECDOTE_NOTIF':
            // console.log('action.content', action.content)

            const newAnecNotif = [{ content: action.content }]

            return newAnecNotif

        case 'EMPTY_MESSAGE':
            console.log('ACTION:', action)
            const newState2 = [action.content]
            return newState2

        default:
            return state
    }
}

export default newMessageReducer
