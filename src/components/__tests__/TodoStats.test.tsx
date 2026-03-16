import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TodoStats } from "../TodoStats";

describe("TodoStats", () => {
  it("renders total, active, and completed counts", () => {
    render(<TodoStats total={10} active={6} completed={4} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders labels for each stat", () => {
    render(<TodoStats total={5} active={3} completed={2} />);
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("shows progress bar with correct percentage when there are todos", () => {
    render(<TodoStats total={4} active={1} completed={3} />);
    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("does not show progress bar when total is 0", () => {
    render(<TodoStats total={0} active={0} completed={0} />);
    expect(screen.queryByText("Progress")).not.toBeInTheDocument();
  });

  it("shows 100% when all todos are completed", () => {
    render(<TodoStats total={5} active={0} completed={5} />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("shows 0% when no todos are completed", () => {
    render(<TodoStats total={3} active={3} completed={0} />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});
