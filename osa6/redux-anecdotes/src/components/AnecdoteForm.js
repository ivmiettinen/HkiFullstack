import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {showNewAnecdoteNotif} from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (e) => {

        console.log('EEEEEEEEE', e.target.anecdote.value)


        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        dispatch(createAnecdote(content))


        dispatch(showNewAnecdoteNotif(content))

        setTimeout(() => {
            dispatch(showNewAnecdoteNotif(''))
        }, 5000)

        // store.dispatch({
        //   type: 'NEW_ANECDOTE',
        //   data: {
        //     content,
        //     important: false
        //   }
        // })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
