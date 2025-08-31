import { describe, it, vi, beforeEach, type MockInstance } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import * as bookingHooks from "../hooks/useBookingDetails";
import type { Booking } from "../../../types/api";
import { BookingDetailsScreen } from "../components/BookingDetailsScreen";

describe("BookingDetailsScreen", () => {
  const mockBooking: Booking = {
    id: "1",
    customerName: "Alice",
    startDate: "2025-08-01T10:00:00Z",
    endDate: "2025-08-02T12:00:00Z",
    pickupReturnStationId: "station-1",
  };

  const onClose = vi.fn();

  let spy: MockInstance;

  beforeEach(() => {
    vi.clearAllMocks();
    spy = vi.spyOn(bookingHooks, "useBookingDetails");
  });

  it("renders the loading state", () => {
    spy.mockReturnValue({
      booking: null,
      loading: true,
      error: null,
    });

    render(
      <BookingDetailsScreen bookingId="1" stationId="s1" onClose={onClose} />,
    );

    expect(screen.getByText(/loading booking details/i)).toBeInTheDocument();
  });

  it("renders the error state when there is an error", () => {
    spy.mockReturnValue({
      booking: null,
      loading: false,
      error: "Failed to fetch",
    });

    render(
      <BookingDetailsScreen bookingId="1" stationId="s1" onClose={onClose} />,
    );

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("renders the error state when booking is null and no error is provided", () => {
    spy.mockReturnValue({
      booking: null,
      loading: false,
      error: null,
    });

    render(
      <BookingDetailsScreen bookingId="1" stationId="s1" onClose={onClose} />,
    );

    expect(
      screen.getByText(/there was a problem trying to load the bookings info/i),
    ).toBeInTheDocument();
  });

  it("renders BookingDetails when data is successfully loaded", () => {
    spy.mockReturnValue({
      booking: mockBooking,
      loading: false,
      error: null,
    });

    render(
      <BookingDetailsScreen bookingId="1" stationId="s1" onClose={onClose} />,
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("calls onClose when the back button is clicked", () => {
    spy.mockReturnValue({
      booking: mockBooking,
      loading: false,
      error: null,
    });

    render(
      <BookingDetailsScreen bookingId="1" stationId="s1" onClose={onClose} />,
    );

    fireEvent.click(screen.getByTestId("back-button"));

    expect(onClose).toHaveBeenCalledOnce();
  });
});
