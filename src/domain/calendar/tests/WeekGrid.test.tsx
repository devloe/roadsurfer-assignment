// WeekGrid.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import type { WeekDay, Booking, Station } from "../../../types/api";
import { WeekGrid } from "../components/WeekGrid";

describe("WeekGrid", () => {
  const weekDays: WeekDay[] = [
    {
      dayName: "Monday",
      dayNumber: 1,
      date: new Date("2025-08-01"),
      isToday: false,
    },
    {
      dayName: "Tuesday",
      dayNumber: 2,
      date: new Date("2025-08-02"),
      isToday: false,
    },
  ];

  const bookings: Booking[] = [
    {
      id: "b1",
      customerName: "Alice",
      startDate: "2025-08-01T10:00:00Z",
      endDate: "2025-08-02T12:00:00Z",
      pickupReturnStationId: "s1",
    },
  ];

  const getBookingsForDay = vi.fn((date: Date) =>
    bookings.filter(
      (b) => new Date(b.startDate).toDateString() === date.toDateString(),
    ),
  );

  const onBookingClick = vi.fn();
  const onBookingReschedule = vi.fn();
  const selectedStation: Station = {
    id: "s1",
    name: "Central Station",
    bookings: [],
  };

  it("renders all days as DayTile domain", () => {
    render(
      <WeekGrid
        weekDays={weekDays}
        getBookingsForDay={getBookingsForDay}
        selectedStation={selectedStation}
        onBookingClick={onBookingClick}
        onBookingReschedule={onBookingReschedule}
      />,
    );

    weekDays.forEach((day) => {
      expect(screen.getByText(day.dayName)).toBeInTheDocument();
      expect(getBookingsForDay).toHaveBeenCalledWith(day.date);
    });
  });

  it("passes bookings to DayTile correctly", () => {
    render(
      <WeekGrid
        weekDays={[weekDays[0]]}
        getBookingsForDay={getBookingsForDay}
        selectedStation={selectedStation}
        onBookingClick={onBookingClick}
        onBookingReschedule={onBookingReschedule}
      />,
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});
