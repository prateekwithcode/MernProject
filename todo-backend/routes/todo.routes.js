// routes/todo.routes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

// Route to get all todos and create a new todo
router.route('/')
    .get(todoController.getAllTodos)
    .post(todoController.createTodo);

// Route to update and delete a specific todo by ID
router.route('/:id')
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo);

module.exports = router;