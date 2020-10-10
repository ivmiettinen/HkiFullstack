import React from 'react'
import { createStore } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import {asObject} from './reducers/anecdoteReducer'
import {voteAnecdote} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)

  // const store = createStore(anecdoteReducer)


  const dispatch = useDispatch()


  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    dispatch(asObject(content))


    // store.dispatch({
    //   type: 'NEW_ANECDOTE',
    //   data: {
    //     content,
    //     important: false
    //   }
    // })


  }


  const vote = (id) => {
    console.log('vote', id)

    dispatch(voteAnecdote(id))

  }



  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App