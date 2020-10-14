import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showAnecdote } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector((state) => state.anecdotes)

    const vote = (id) => {
        // console.log('vote', id)

        const findFromAnecdotes = anecdotes.find((a) => a.id === id)

        dispatch(voteAnecdote(id))

        dispatch(showAnecdote(findFromAnecdotes))

        setTimeout(() => {
            dispatch(showAnecdote(''))
        }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>
                                vote
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AnecdoteList
