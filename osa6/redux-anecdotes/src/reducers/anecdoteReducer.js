import anecdoteService from '../services/anecdotes'

export const anecdotesAtStart = []

// const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (anecdote) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(anecdote)

        // console.log('NewAnecdote', newAnecdote)

        dispatch({
            type: 'NEW_ANECDOTE1',
            votes: Number(0),
            content: anecdote,
        })
    }
}

export const voteAnecdote = (id) => {
    // console.log('from reducer voteAnecdote', id)
    return {
        type: 'New_vote',
        id: id,
    }
}

export const initialState = anecdotesAtStart.map(createAnecdote)

const anecdoteReducer = (state = [], action) => {
    // console.log('state now: ', state)
    // console.log('action', action)

    switch (action.type) {
        case 'NEW_ANECDOTE1':
            // [state.concat(action)]

            return [...state, action]

        case 'New_vote':
            // console.log('1newww vote', action)
            // console.log('2state', state)
            const id = action.id

            // console.log('3idid', id)

            const findId = state.find((p) => p.id === id)

            // console.log('4findi', findId)

            const changedAnecdote = {
                ...findId,
                votes: findId.votes + 1,
            }

            return state.map((p) => (p.id !== id ? p : changedAnecdote))

        case 'INIT_ANECDOTES':
            return action.data

        default:
            return state
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({ type: 'INIT_ANECDOTES', data: anecdotes })
    }
}

export default anecdoteReducer
