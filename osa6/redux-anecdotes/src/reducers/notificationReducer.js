const messageAtStart = [{ message: 'success' }]




export const newMessage = (message) => {
    return {
        type: 'NEW_MESSAGE',
        message
    }
}




const newMessageReducer = (state = messageAtStart, action) => {

    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'NEW_MESSAGE':

       console.log('accccc', action)
            return action.message
        default:
            return state
    }
}


export default newMessageReducer