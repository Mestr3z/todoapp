import React from "react";
import { List, Typography } from "@mui/material";
import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle }) => {
  if (todos.length === 0) {
    return <Typography align="center">No todos here</Typography>;
  }

  return (
    <List>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </List>
  );
};

export default TodoList;
