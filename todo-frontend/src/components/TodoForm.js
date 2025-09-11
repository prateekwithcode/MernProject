// components/TodoForm.js
import React, { useState, useEffect } from 'react';

const TodoForm = ({ onAddTodo, onUpdateTodo, editingTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingTodo) {
            setTitle(editingTodo.title);
            setDescription(editingTodo.description || '');
        } else {
            setTitle('');
            setDescription('');
        }
    }, [editingTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (editingTodo) {
            onUpdateTodo(editingTodo._id, { title, description });
        } else {
            onAddTodo({ title, description });
        }
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Task Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">{editingTodo ? 'Update Task' : 'Add Task'}</button>
        </form>
    );
};

export default TodoForm;