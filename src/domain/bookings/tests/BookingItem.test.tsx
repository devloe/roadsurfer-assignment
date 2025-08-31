// BookingItem.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import type { Booking } from "../../../types/api";
import { BookingItem } from "../components/BookingItem";

describe("BookingItem", () => {
  const baseBooking: Booking = {
    id: "1",
    customerName: "Alice",
    startDate: "2025-08-01T10:00:00Z",
    endDate: "2025-08-02T12:00:00Z",
    pickupReturnStationId: "station-1",
  };

  it("renders customer name", () => {
    render(
      <BookingItem
        booking={baseBooking}
        dayDate={new Date(baseBooking.startDate)}
        onBookingClick={vi.fn()}
      />,
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("shows → Pickup label and start time on pickup day", () => {
    render(
      <BookingItem
        booking={baseBooking}
        dayDate={new Date(baseBooking.startDate)}
        onBookingClick={vi.fn()}
      />,
    );
    expect(screen.getByText("→ Pickup")).toBeInTheDocument();
    const timeText = new Date(baseBooking.startDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(screen.getByText(timeText)).toBeInTheDocument();
  });

  it("shows ← Return label and end time on return day", () => {
    render(
      <BookingItem
        booking={baseBooking}
        dayDate={new Date(baseBooking.endDate)}
        onBookingClick={vi.fn()}
      />,
    );
    expect(screen.getByText("← Return")).toBeInTheDocument();
    const timeText = new Date(baseBooking.endDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    expect(screen.getByText(timeText)).toBeInTheDocument();
  });

  it("calls onBookingClick when clicked", () => {
    const clickHandler = vi.fn();
    render(
      <BookingItem
        booking={baseBooking}
        dayDate={new Date(baseBooking.startDate)}
        onBookingClick={clickHandler}
      />,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalledOnce();
    expect(clickHandler).toHaveBeenCalledWith(baseBooking);
  });

  it("sets dataTransfer correctly on drag start", () => {
    const dataTransfer = {
      setData: vi.fn(),
      effectAllowed: "",
    };
    render(
      <BookingItem
        booking={baseBooking}
        dayDate={new Date(baseBooking.startDate)}
        onBookingClick={vi.fn()}
      />,
    );
    const button = screen.getByRole("button");
    fireEvent.dragStart(button, { dataTransfer });
    expect(dataTransfer.setData).toHaveBeenCalledWith(
      "application/json",
      JSON.stringify({ bookingId: baseBooking.id, role: "pickup" }),
    );
    expect(dataTransfer.effectAllowed).toBe("move");
  });
});
