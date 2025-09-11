// api/todoApi.js
import axios from 'axios';

// Use the backend URL from environment variables, with a fallback for local development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/todos';

// Fetch all todos
export const getTodos = (searchTerm = '') => {
    return axios.get(`${API_URL}?search=${searchTerm}`);
};

// Add a new todo
export const addTodo = (todo) => {
    return axios.post(API_URL, todo);
};

// Update an existing todo
export const updateTodo = (id, todo) => {
    return axios.put(`${API_URL}/${id}`, todo);
};

// Delete a todo
export const deleteTodo = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};