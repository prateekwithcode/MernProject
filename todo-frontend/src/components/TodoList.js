// components/TodoList.js
import React from 'react';

const TodoList = ({ todos, onUpdateStatus, onDeleteTodo, onEditTodo }) => {
    if (todos.length === 0) {
        return <p>No tasks yet. Add one!</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo._id} className={todo.status}>
                    <div className="todo-content">
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                    </div>
                    <div className="todo-actions">
                        <button onClick={() => onUpdateStatus(todo._id, { status: todo.status === 'pending' ? 'completed' : 'pending' })}>
                            {todo.status === 'pending' ? 'Complete' : 'Undo'}
                        </button>
                        <button className="edit" onClick={() => onEditTodo(todo)}>Edit</button>
                        <button className="delete" onClick={() => onDeleteTodo(todo._id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;