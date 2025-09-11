// services/todo.service.js
const Todo = require('../models/todo.model');

// Service to get all todos, with optional search
exports.getAllTodos = async (query) => {
    let findQuery = {};
    if (query.search) {
        // Case-insensitive search on title and description
        findQuery = {
            $or: [
                { title: { $regex: query.search, $options: 'i' } },
                { description: { $regex: query.search, $options: 'i' } }
            ]
        };
    }
    return await Todo.find(findQuery).sort({ createdAt: -1 });
};

// Service to create a new todo
exports.createTodo = async (todoData) => {
    const newTodo = new Todo(todoData);
    return await newTodo.save();
};

// Service to update a todo by ID
exports.updateTodo = async (id, updateData) => {
    // { new: true } returns the modified document
    return await Todo.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

// Service to delete a todo by ID
exports.deleteTodo = async (id) => {
    return await Todo.findByIdAndDelete(id);
};