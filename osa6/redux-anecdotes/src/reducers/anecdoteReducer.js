export const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const createAnecdote = (anecdote) => {
    return {
        type: 'NEW_ANECDOTE1',
        content: anecdote,
        id: getId(),
        votes: 0,
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

const anecdoteReducer = (state = initialState, action) => {
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
                ...findId, votes: findId.votes + 1
            }

            return state.map((p) => (p.id !== id ? p : changedAnecdote))

        default:
            return state
    }
}

export default anecdoteReducer
