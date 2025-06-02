import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("показывает количество оставшихся и вызывает onClearCompleted", () => {
    const onClearMock = jest.fn();
    render(<Footer remaining={5} onClearCompleted={onClearMock} />);
    expect(screen.getByText(/5 items left/i)).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /Clear completed/i });
    fireEvent.click(btn);
    expect(onClearMock).toHaveBeenCalledTimes(1);
  });
});
