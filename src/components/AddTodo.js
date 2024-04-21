import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addTodo, editTodoText, removeTodo, setTodos } from '../features/todo/todoSlice'

function AddTodo() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const [editTodo, setEditTodo] = useState('');
  const [editTodoMsg, setEditTodoMsg] = useState('')
  const [currentTodo, setCurrentTodo] = useState({});

  const todos = useSelector(state => state.todos)
  

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todos"));
    if (localTodoList) {
      dispatch(setTodos(localTodoList));
    }
  }, []);
  const addTodoHandler = (e) => {
    e.preventDefault();
    if(input.trim() !== '') dispatch(addTodo(input));
    else {
      alert('Enter a Todo')
    }
    setInput('');
  }
  const handleEditTodo = (todo) => {
    console.log('inside handleEdit');
    setCurrentTodo(todo);
    setEditTodo(true);
    setEditTodoMsg(todo.text)
  }

  const editTodoHandler = (e) => {
    e.preventDefault();
    if(editTodoMsg.trim() === '') {
      alert('Enter a text')
      setEditTodoMsg(currentTodo.text)
    }
    else {
      const newTodo = {
        id: currentTodo.id,
        text: editTodoMsg,
      }
      dispatch(editTodoText(newTodo))
      setEditTodoMsg('')
      setEditTodo(false);
    }
  }
  return (
    <>
    { !editTodo && 
      <form onSubmit={addTodoHandler}
      className='w-full '
      >
          <input type='text'
          placeholder='Enter a todo'
          className=' w-96 rounded-lg  py-2'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />
          <button type='submit'
          className='rounded-lg bg-green-400 w-40 py-2 hover:bg-green-500'
          >
              Add Todo
          </button>
      </form>
}
    { editTodo && 
      <form onSubmit={editTodoHandler}
      className='w-full'
      >
          <input type='text'
          // placeholder='Enter a todo'
          className=' w-96 rounded-lg  py-2'
          value={editTodoMsg}
          onChange={(e) => setEditTodoMsg(e.target.value)}
          />
          <button type='submit'
          className='rounded-lg bg-green-400 w-40 py-2 hover:bg-green-500'
          >
              Update Todo
          </button>
      </form>
}

      <div
      >Todos</div>
      
        {todos.map((todo) => (
          <div 
          className="flex justify-center">
            <li key={todo.id} 
            // className='flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black '
            className=' w-60 flex mt-4 justify-between items-center px-4 py-2 rounded bg-zinc-800'
            >
                <div className=' outline-none w-full text-white text-left '>{todo.text}</div>
                <button
                className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
                onClick={ () => handleEditTodo(todo)}
                >✏️</button>
                <button
                className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0'
                onClick={() => dispatch(removeTodo(todo.id))}
                >🗑️</button>
            </li>
            </div>
        ))}
        
    </>
  )
}

export default AddTodo