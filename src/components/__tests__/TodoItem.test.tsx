import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TodoItem } from "../TodoItem";
import { Todo } from "@/types/Todo";

const createTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: "1",
  text: "Test todo",
  completed: false,
  createdAt: new Date("2026-01-01"),
  ...overrides,
});

describe("TodoItem", () => {
  const defaultProps = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onUpdate: vi.fn(),
  };

  it("renders todo text", () => {
    render(<TodoItem todo={createTodo()} {...defaultProps} />);
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("calls onToggle with todo id when toggle button is clicked", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(<TodoItem todo={createTodo()} {...defaultProps} onToggle={onToggle} />);

    const toggleButtons = screen.getAllByRole("button");
    // First button is the toggle (circle/check)
    await user.click(toggleButtons[0]);
    expect(onToggle).toHaveBeenCalledWith("1");
  });

  it("calls onDelete with todo id when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<TodoItem todo={createTodo()} {...defaultProps} onDelete={onDelete} />);

    const buttons = screen.getAllByRole("button");
    // Last button is the delete button (X icon)
    await user.click(buttons[buttons.length - 1]);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("applies completed styles when todo is completed", () => {
    render(<TodoItem todo={createTodo({ completed: true })} {...defaultProps} />);
    expect(screen.getByText("Test todo")).toHaveClass("line-through");
  });

  it("enters edit mode when edit button is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={createTodo()} {...defaultProps} />);

    const buttons = screen.getAllByRole("button");
    // Middle button is the edit button
    await user.click(buttons[1]);

    const input = screen.getByDisplayValue("Test todo");
    expect(input).toBeInTheDocument();
  });

  it("calls onUpdate when editing is confirmed", async () => {
    const onUpdate = vi.fn();
    const user = userEvent.setup();
    render(<TodoItem todo={createTodo()} {...defaultProps} onUpdate={onUpdate} />);

    // Click edit button to enter edit mode
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);

    const input = screen.getByDisplayValue("Test todo");
    await user.clear(input);
    await user.type(input, "Updated todo{Enter}");

    expect(onUpdate).toHaveBeenCalledWith("1", "Updated todo");
  });

  it("cancels editing on Escape key", async () => {
    const onUpdate = vi.fn();
    const user = userEvent.setup();
    render(<TodoItem todo={createTodo()} {...defaultProps} onUpdate={onUpdate} />);

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[1]);

    const input = screen.getByDisplayValue("Test todo");
    await user.clear(input);
    await user.type(input, "Changed text{Escape}");

    expect(onUpdate).not.toHaveBeenCalled();
    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });
});
