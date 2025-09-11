// App.js
import React, { useState, useEffect, useCallback } from 'react';
import * as api from './api/todoApi';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [editingTodo, setEditingTodo] = useState(null); // State to hold the todo being edited
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.getTodos(searchTerm);
            setTodos(response.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch todos. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const handleAddTodo = async (todoData) => {
        try {
            await api.addTodo(todoData);
            fetchTodos(); // Refetch all todos
        } catch (err) {
            setError('Failed to add todo.');
        }
    };

    const handleUpdateTodo = async (id, updatedData) => {
        try {
            await api.updateTodo(id, updatedData);
            setEditingTodo(null); // Clear editing state
            fetchTodos();
        } catch (err) {
            setError('Failed to update todo.');
        }
    };
    
    const handleDeleteTodo = async (id) => {
        try {
            await api.deleteTodo(id);
            fetchTodos();
        } catch (err) {
            setError('Failed to delete todo.');
        }
    };

    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
    };

    return (
        <div className="App">
            <h1>To-Do List 📝</h1>
            {error && <p className="error">{error}</p>}
            
            <TodoForm onAddTodo={handleAddTodo} onUpdateTodo={handleUpdateTodo} editingTodo={editingTodo} />

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <TodoList
                    todos={todos}
                    onUpdateStatus={handleUpdateTodo}
                    onDeleteTodo={handleDeleteTodo}
                    onEditTodo={handleEditTodo}
                />
            )}
        </div>
    );
}

export default App;