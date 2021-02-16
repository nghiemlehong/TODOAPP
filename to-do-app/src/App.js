import React, { useState, useEffect } from 'react'
import './App.css';
import { Button, FormControl, Input, InputLabel, LinearProgress, List } from '@material-ui/core'
import { Todo } from './Todo'
import { db } from './firebase'
import firebase from 'firebase'
import moment from 'moment'

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data() })))
      setLoading(false)
    })

  }, [])
  const addTodo = event => {
    event.preventDefault()
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      date: moment().format("MMM Do YY"),
      completed : false,
    })
    setInput('')
  }


  return (
    <div className="App">
      <h1>TODO APP👏 </h1>
      <form>
        {/* <button onClick ={addTodo} >Add todo</button> */}
        <FormControl>
          <InputLabel>✔ Write a Todo</InputLabel>
          <Input
            style={{ width: '500px' }}
            disabled={loading}
            value={input}
            onChange={evt => setInput(evt.target.value)} />
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary"
          onClick={addTodo} type='submit' >Add Todo</Button>
      </form>
      <div className="list-todo">
        {loading ? <LinearProgress /> : <List>
          {todos.map(x => (
            <Todo text={x.todo.todo} date={x.todo.date} id={x.id} completed = {x.todo.completed} />
          ))}
        </List>
        }

      </div>
    </div>
  );
}

export default App;
