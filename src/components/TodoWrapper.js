import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
uuidv4();

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Updates the localStorage with the provided todos array in stringified JSON format
  const updateLocalstorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Adds a new todo item to the todos list, assigns a unique ID,
  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    console.log("newTodos", newTodos);

    setTodos(newTodos);
    updateLocalstorage(newTodos);
  };

  // Toggles the "completed" status of a todo item identified by its ID.
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    updateLocalstorage(newTodos);
  };

  // Deletes a todo item identified by its ID from the todos list.
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
    updateLocalstorage(newTodos);
  };

  // Toggles the "isEditing" status of a todo item identified by its ID.
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Updates the "task" property of a todo item identified by its ID,
  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    updateLocalstorage(newTodos);
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>

      <TodoForm addTodo={addTodo} />

      {todos.map((todo, index) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
