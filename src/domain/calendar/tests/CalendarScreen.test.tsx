// CalendarScreen.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import type { Station } from "../../../types/api";
import { CalendarScreen } from "../components/CalendarScreen";

describe("CalendarScreen", () => {
  const mockStation: Station = {
    id: "s1",
    name: "Central Station",
    bookings: [],
  };

  const renderStationSelector = vi.fn(() => <div>Station Selector</div>);
  const renderWeekNavigation = vi.fn(() => <div>Week Navigation</div>);
  const renderWeekGrid = vi.fn(() => <div>Week Grid</div>);

  it("renders the main title", () => {
    render(
      <CalendarScreen
        selectedStation={null}
        renderStationSelector={renderStationSelector}
        renderWeekNavigation={renderWeekNavigation}
        renderWeekGrid={renderWeekGrid}
      />,
    );
    expect(screen.getByText("Campervans Rental")).toBeInTheDocument();
  });

  it("always renders the station selector", () => {
    render(
      <CalendarScreen
        selectedStation={null}
        renderStationSelector={renderStationSelector}
        renderWeekNavigation={renderWeekNavigation}
        renderWeekGrid={renderWeekGrid}
      />,
    );
    expect(screen.getByText("Station Selector")).toBeInTheDocument();
  });

  it("does not render station name, week navigation or grid if no station selected", () => {
    render(
      <CalendarScreen
        selectedStation={null}
        renderStationSelector={renderStationSelector}
        renderWeekNavigation={renderWeekNavigation}
        renderWeekGrid={renderWeekGrid}
      />,
    );
    expect(screen.queryByText("Central Station")).toBeNull();
    expect(screen.queryByText("Week Navigation")).toBeNull();
    expect(screen.queryByText("Week Grid")).toBeNull();
  });

  it("renders station name, week navigation and grid when station is selected", () => {
    render(
      <CalendarScreen
        selectedStation={mockStation}
        renderStationSelector={renderStationSelector}
        renderWeekNavigation={renderWeekNavigation}
        renderWeekGrid={renderWeekGrid}
      />,
    );
    expect(screen.getByText("Central Station")).toBeInTheDocument();
    expect(screen.getByText("Week Navigation")).toBeInTheDocument();
    expect(screen.getByText("Week Grid")).toBeInTheDocument();
  });
});
