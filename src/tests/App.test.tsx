import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App (интеграция)", () => {
  it("должен добавлять, помечать, фильтровать и очищать задачи", async () => {
    render(<App />);
    const user = userEvent.setup();

    const input = screen.getByLabelText(
      /What needs to be done\?/i
    ) as HTMLInputElement;
    await user.type(input, "Задача 1{enter}");
    await user.type(input, "Задача 2{enter}");

    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    await user.click(checkboxes[1]);
    expect(checkboxes[1].checked).toBe(true);

    expect(screen.getByText(/1 items left/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Active/i }));
    expect(screen.queryByText("Задача 1")).toBeNull();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^Completed$/i }));
    expect(screen.getByText("Задача 1")).toBeInTheDocument();
    expect(screen.queryByText("Задача 2")).toBeNull();

    await user.click(screen.getByRole("button", { name: /All/i }));
    await user.click(screen.getByRole("button", { name: /Clear completed/i }));
    expect(screen.queryByText("Задача 1")).toBeNull();
    expect(screen.getByText("Задача 2")).toBeInTheDocument();
    expect(screen.getByText(/1 items left/i)).toBeInTheDocument();
  });
});
