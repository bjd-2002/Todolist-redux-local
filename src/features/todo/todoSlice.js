import {createSlice, nanoid} from "@reduxjs/toolkit"

const initialState = {
    todos: [
    ],
    editFlag: false
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
        },
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) =>
            todo.id !== action.payload)
        },
        editTodoText: (state, action) => {
            state.todos = state.todos.map((todo) =>
        todo.id===action.payload.id? {...todo, text: action.payload.text}: todo)
            
        }
    }
})

export const {setTodos, addTodo, removeTodo, editTodoText} = todoSlice.actions;

export default todoSlice.reducer