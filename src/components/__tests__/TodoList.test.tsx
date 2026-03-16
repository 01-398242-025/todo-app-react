import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { TodoList } from "../TodoList";
import { Todo } from "@/types/Todo";

const todos: Todo[] = [
  { id: "1", text: "First todo", completed: false, createdAt: new Date() },
  { id: "2", text: "Second todo", completed: true, createdAt: new Date() },
];

const defaultProps = {
  onToggle: vi.fn(),
  onDelete: vi.fn(),
  onUpdate: vi.fn(),
  filter: "all",
};

describe("TodoList", () => {
  it("renders all todos", () => {
    render(<TodoList todos={todos} {...defaultProps} />);
    expect(screen.getByText("First todo")).toBeInTheDocument();
    expect(screen.getByText("Second todo")).toBeInTheDocument();
  });

  it("shows empty message when there are no todos with 'all' filter", () => {
    render(<TodoList todos={[]} {...defaultProps} filter="all" />);
    expect(screen.getByText("No todos yet. Add one above to get started!")).toBeInTheDocument();
  });

  it("shows active-specific empty message", () => {
    render(<TodoList todos={[]} {...defaultProps} filter="active" />);
    expect(screen.getByText("No active todos. Great job!")).toBeInTheDocument();
  });

  it("shows completed-specific empty message", () => {
    render(<TodoList todos={[]} {...defaultProps} filter="completed" />);
    expect(screen.getByText("No completed todos yet. Mark some as done!")).toBeInTheDocument();
  });
});
