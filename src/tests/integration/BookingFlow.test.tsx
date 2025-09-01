// BookingFlow.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../App";

describe("Booking Flow (integration)", () => {
  it("user can search station, select it, view calendar and open booking details", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText("Search for a station...");
    fireEvent.change(input, { target: { value: "Berlin" } });

    const option = await screen.findByText("Berlin");
    fireEvent.click(option);

    expect(await screen.findByText("Berlin")).toBeInTheDocument();
    expect(await screen.findByText(/Campervans Rental/i)).toBeInTheDocument();

    const booking = await screen.findAllByTestId("booking-item");
    fireEvent.click(booking[0]);

    expect(await screen.findByText("Booking Details")).toBeInTheDocument();
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(
      await screen.findByText((content) => content.includes("Duration")),
    ).toBeInTheDocument();

    const back = await screen.findByTestId("back-button"); // viene del handler de bookings
    fireEvent.click(back);

    expect(await screen.findByText(/Campervans Rental/i)).toBeInTheDocument();
  });
});
