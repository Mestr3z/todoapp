import React from "react";
import { ListItem, ListItemText, Checkbox } from "@mui/material";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <ListItem
      key={todo.id}
      secondaryAction={
        <Checkbox
          edge="end"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      }
    >
      <ListItemText
        primary={todo.text}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#000",
        }}
      />
    </ListItem>
  );
};

export default TodoItem;
