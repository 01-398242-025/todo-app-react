import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { AddTodo } from "../AddTodo";

describe("AddTodo", () => {
  it("renders input and add button", () => {
    render(<AddTodo onAdd={vi.fn()} />);
    expect(screen.getByPlaceholderText("Add a new todo...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  it("calls onAdd with trimmed text on submit", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<AddTodo onAdd={onAdd} />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    await user.type(input, "  Buy groceries  ");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(onAdd).toHaveBeenCalledWith("Buy groceries");
  });

  it("clears input after successful submission", async () => {
    const user = userEvent.setup();
    render(<AddTodo onAdd={vi.fn()} />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    await user.type(input, "New todo");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(input).toHaveValue("");
  });

  it("does not call onAdd when input is empty or whitespace", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<AddTodo onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: /add/i }));
    expect(onAdd).not.toHaveBeenCalled();

    const input = screen.getByPlaceholderText("Add a new todo...");
    await user.type(input, "   ");
    await user.click(screen.getByRole("button", { name: /add/i }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it("submits on Enter key press", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<AddTodo onAdd={onAdd} />);

    const input = screen.getByPlaceholderText("Add a new todo...");
    await user.type(input, "Press enter todo{Enter}");

    expect(onAdd).toHaveBeenCalledWith("Press enter todo");
  });
});
