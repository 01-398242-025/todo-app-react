import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TodoFilter } from "../TodoFilter";

const defaultProps = {
  currentFilter: "all" as const,
  onFilterChange: vi.fn(),
  counts: { all: 5, active: 3, completed: 2 },
};

describe("TodoFilter", () => {
  it("renders all filter buttons with counts", () => {
    render(<TodoFilter {...defaultProps} />);
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls onFilterChange with 'active' when Active button is clicked", async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();
    render(<TodoFilter {...defaultProps} onFilterChange={onFilterChange} />);

    await user.click(screen.getByText("Active"));
    expect(onFilterChange).toHaveBeenCalledWith("active");
  });

  it("calls onFilterChange with 'completed' when Completed button is clicked", async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();
    render(<TodoFilter {...defaultProps} onFilterChange={onFilterChange} />);

    await user.click(screen.getByText("Completed"));
    expect(onFilterChange).toHaveBeenCalledWith("completed");
  });

  it("calls onFilterChange with 'all' when All button is clicked", async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();
    render(<TodoFilter {...defaultProps} onFilterChange={onFilterChange} />);

    await user.click(screen.getByText("All"));
    expect(onFilterChange).toHaveBeenCalledWith("all");
  });
});
