import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilters, { Filter } from "./components/TodoFilters";
import Footer from "./components/Footer";
import { Todo } from "./types/todo";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true; // all
  });

  const remainingCount = todos.filter((t) => !t.completed).length;

  return (
    <Container maxWidth="sm" style={{ marginTop: "32px" }}>
      <Paper style={{ padding: "16px" }}>
        <TodoInput onAdd={handleAdd} />

        <TodoList todos={filteredTodos} onToggle={handleToggle} />

        <TodoFilters currentFilter={filter} onChange={setFilter} />

        <Footer
          remaining={remainingCount}
          onClearCompleted={handleClearCompleted}
        />
      </Paper>
    </Container>
  );
};

export default App;
