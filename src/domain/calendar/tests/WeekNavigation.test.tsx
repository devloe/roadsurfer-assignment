// WeekNavigation.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { WeekNavigation } from "../components/WeekNavigation";

describe("WeekNavigation", () => {
  const weekHeader = { monthYear: "August 2025", weekStart: "Aug 1" };
  const onPreviousWeek = vi.fn();
  const onNextWeek = vi.fn();
  const onGoToToday = vi.fn();

  it("renders the header correctly", () => {
    render(
      <WeekNavigation
        weekHeader={weekHeader}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
        onGoToToday={onGoToToday}
      />,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("August 2025 – Week of Aug 1");
  });

  it("renders all buttons", () => {
    render(
      <WeekNavigation
        weekHeader={weekHeader}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
        onGoToToday={onGoToToday}
      />,
    );

    expect(screen.getByText("← Previous Week")).toBeInTheDocument();
    expect(screen.getByText("Next Week →")).toBeInTheDocument();
    expect(screen.getByText("Go to Today")).toBeInTheDocument();
  });

  it("calls onPreviousWeek when Previous Week button is clicked", () => {
    render(
      <WeekNavigation
        weekHeader={weekHeader}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
        onGoToToday={onGoToToday}
      />,
    );

    fireEvent.click(screen.getByText("← Previous Week"));
    expect(onPreviousWeek).toHaveBeenCalledOnce();
  });

  it("calls onNextWeek when Next Week button is clicked", () => {
    render(
      <WeekNavigation
        weekHeader={weekHeader}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
        onGoToToday={onGoToToday}
      />,
    );

    fireEvent.click(screen.getByText("Next Week →"));
    expect(onNextWeek).toHaveBeenCalledOnce();
  });

  it("calls onGoToToday when Go to Today button is clicked", () => {
    render(
      <WeekNavigation
        weekHeader={weekHeader}
        onPreviousWeek={onPreviousWeek}
        onNextWeek={onNextWeek}
        onGoToToday={onGoToToday}
      />,
    );

    fireEvent.click(screen.getByText("Go to Today"));
    expect(onGoToToday).toHaveBeenCalledOnce();
  });
});
