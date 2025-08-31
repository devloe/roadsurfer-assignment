// DayTile.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import type { Booking, WeekDay } from "../../../types/api";
import { DayTile } from "../components/DayTile";

describe("DayTile", () => {
  const day: WeekDay = {
    dayName: "Monday",
    dayNumber: 1,
    date: new Date("2025-08-01"),
    isToday: false,
  };

  const bookings: Booking[] = [
    {
      id: "b1",
      customerName: "Alice",
      startDate: "2025-08-01T10:00:00Z",
      endDate: "2025-08-02T12:00:00Z",
      pickupReturnStationId: "s1",
    },
    {
      id: "b2",
      customerName: "Bob",
      startDate: "2025-08-01T11:00:00Z",
      endDate: "2025-08-03T12:00:00Z",
      pickupReturnStationId: "s1",
    },
  ];

  const onBookingClick = vi.fn();
  const onBookingReschedule = vi.fn();

  it("renders the day header correctly", () => {
    render(
      <DayTile
        day={day}
        bookings={[]}
        onBookingClick={onBookingClick}
        onBookingReschedule={onBookingReschedule}
        selectedStation={null}
      />,
    );
    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders all bookings", () => {
    render(
      <DayTile
        day={day}
        bookings={bookings}
        onBookingClick={onBookingClick}
        onBookingReschedule={onBookingReschedule}
        selectedStation={null}
      />,
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("calls onBookingReschedule on drop with correct data", () => {
    render(
      <DayTile
        day={day}
        bookings={bookings}
        onBookingClick={onBookingClick}
        onBookingReschedule={onBookingReschedule}
        selectedStation={null}
      />,
    );
    const mondayHeader = screen.getByText("Monday");
    if (!mondayHeader?.parentElement?.parentElement) {
      throw new Error("Tile element not found");
    }
    const tile = mondayHeader.parentElement.parentElement;

    const dataTransfer = {
      getData: vi.fn(() => JSON.stringify({ bookingId: "b1", role: "pickup" })),
      setData: vi.fn(),
      effectAllowed: "",
    };

    fireEvent.drop(tile, { dataTransfer });
    expect(onBookingReschedule).toHaveBeenCalledOnce();
    expect(onBookingReschedule).toHaveBeenCalledWith("b1", day.date, "pickup");
  });

  it("changes style on drag enter and drag leave", () => {
    render(
      <DayTile
        day={day}
        bookings={[]}
        onBookingClick={onBookingClick}
        onBookingReschedule={onBookingReschedule}
        selectedStation={null}
      />,
    );

    const header = screen.getByText("Monday");
    const tile = header.parentElement?.parentElement;
    if (!tile) throw new Error("Tile element not found"); // ⚡ aseguramos que no sea null

    // Drag enter
    fireEvent.dragEnter(tile);
    expect(tile).toHaveClass("bg-blue-50");

    // Drag leave
    fireEvent.dragLeave(tile);
    expect(tile).not.toHaveClass("bg-blue-50");
  });
});
