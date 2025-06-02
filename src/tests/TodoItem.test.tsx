import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import { Todo } from "../types/todo";

describe("TodoItem", () => {
  const sampleTodo: Todo = {
    id: "1",
    text: "Пример задачи",
    completed: false,
  };

  it("отображает текст и чекбокс", () => {
    const onToggleMock = jest.fn();
    render(<TodoItem todo={sampleTodo} onToggle={onToggleMock} />);

    expect(screen.getByText("Пример задачи")).toBeInTheDocument();
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("вызывает onToggle при клике на чекбокс", () => {
    const onToggleMock = jest.fn();
    render(<TodoItem todo={sampleTodo} onToggle={onToggleMock} />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(onToggleMock).toHaveBeenCalledWith("1");
  });

  it("чекбокс помечен, если todo.completed=true", () => {
    const completedTodo: Todo = { ...sampleTodo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={() => {}} />);

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });
});
