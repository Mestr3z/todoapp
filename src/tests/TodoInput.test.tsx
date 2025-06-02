import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoInput from "../components/TodoInput";

describe("TodoInput", () => {
  it("вызывает onAdd с корректным текстом при нажатии Enter", () => {
    const onAddMock = jest.fn();
    render(<TodoInput onAdd={onAddMock} />);

    const input = screen.getByLabelText(
      /What needs to be done\?/i
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Новая задача" } });
    expect(input.value).toBe("Новая задача");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(onAddMock).toHaveBeenCalledTimes(1);
    expect(onAddMock).toHaveBeenCalledWith("Новая задача");
    expect(input.value).toBe("");
  });

  it("не вызывает onAdd, если строка пустая или только пробелы (Enter)", () => {
    const onAddMock = jest.fn();
    render(<TodoInput onAdd={onAddMock} />);

    const input = screen.getByLabelText(
      /What needs to be done\?/i
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(onAddMock).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(onAddMock).not.toHaveBeenCalled();
  });

  it("вызывает onAdd при клике на кнопку Add", () => {
    const onAddMock = jest.fn();
    render(<TodoInput onAdd={onAddMock} />);

    const input = screen.getByLabelText(
      /What needs to be done\?/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "Задача с кнопки" } });
    expect(input.value).toBe("Задача с кнопки");

    fireEvent.click(button);
    expect(onAddMock).toHaveBeenCalledTimes(1);
    expect(onAddMock).toHaveBeenCalledWith("Задача с кнопки");
    expect(input.value).toBe("");
  });

  it("не вызывает onAdd, если строка пустая или только пробелы (кнопка)", () => {
    const onAddMock = jest.fn();
    render(<TodoInput onAdd={onAddMock} />);

    const input = screen.getByLabelText(
      /What needs to be done\?/i
    ) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);
    expect(onAddMock).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
    expect(onAddMock).not.toHaveBeenCalled();
  });
});
