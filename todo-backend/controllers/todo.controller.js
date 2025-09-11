// controllers/todo.controller.js
const todoService = require('../services/todo.service');

// Get all todos (and search)
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos(req.query);
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    try {
        // Basic Validation
        if (!req.body.title) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }
        const newTodo = await todoService.createTodo(req.body);
        res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating todo', error: error.message });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todoService.updateTodo(req.params.id, req.body);
        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating todo', error: error.message });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await todoService.deleteTodo(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        res.status(200).json({ success: true, message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};