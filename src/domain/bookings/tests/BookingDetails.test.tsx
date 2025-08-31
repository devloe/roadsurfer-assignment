// BookingDetails.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import type { Booking } from "../../../types/api";
import { BookingDetails } from "../components/BookingDetails";

const baseBooking: Booking = {
  id: "1",
  customerName: "Alice",
  startDate: "2025-08-01T10:00:00Z",
  endDate: "2025-08-02T10:00:00Z",
  pickupReturnStationId: "station-1",
};

describe("BookingDetails", () => {
  it("renders without crashing", () => {
    render(<BookingDetails data={baseBooking} />);
    expect(screen.getByText("Booking Details")).toBeInTheDocument();
  });

  it("shows the customer name", () => {
    render(<BookingDetails data={baseBooking} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("shows the formatted start and end dates", () => {
    render(<BookingDetails data={baseBooking} />);
    expect(
      screen.getByText(new Date(baseBooking.startDate).toLocaleString()),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new Date(baseBooking.endDate).toLocaleString()),
    ).toBeInTheDocument();
  });

  it("shows the correct duration in days", () => {
    render(<BookingDetails data={baseBooking} />);
    expect(screen.getByText("1 day")).toBeInTheDocument();
  });

  it("shows 0 days when start and end are the same", () => {
    const sameDayBooking: Booking = {
      ...baseBooking,
      endDate: baseBooking.startDate,
    };
    render(<BookingDetails data={sameDayBooking} />);
    expect(screen.getByText("0 days")).toBeInTheDocument();
  });
});
