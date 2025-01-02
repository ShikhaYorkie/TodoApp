import { DeleteFilled, EditFilled } from "@ant-design/icons";
import React from "react";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <p
        className={`${task.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.task}
      </p>
      <div>
        <EditFilled className="edit-icon" onClick={() => editTodo(task.id)} />
        <DeleteFilled
          className="delete-icon"
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};
