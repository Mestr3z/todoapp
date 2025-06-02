import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoFilters, { Filter } from "../components/TodoFilters";

describe("TodoFilters", () => {
  it("подсвечивает выбранный фильтр и вызывает onChange", () => {
    const onChangeMock = jest.fn();
    render(<TodoFilters currentFilter={"all"} onChange={onChangeMock} />);

    const btnAll = screen.getByRole("button", { name: /All/i });
    const btnActive = screen.getByRole("button", { name: /Active/i });
    const btnCompleted = screen.getByRole("button", { name: /Completed/i });

    expect(btnAll).toHaveClass("MuiButton-contained");
    expect(btnActive).toHaveClass("MuiButton-outlined");
    expect(btnCompleted).toHaveClass("MuiButton-outlined");

    fireEvent.click(btnActive);
    expect(onChangeMock).toHaveBeenCalledWith("active");

    fireEvent.click(btnCompleted);
    expect(onChangeMock).toHaveBeenCalledWith("completed");
  });
});
