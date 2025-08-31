// BookingFlow.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../../App";

describe("Booking Flow (integration)", () => {
  it("user can search station, select it, view calendar and open booking details", async () => {
    render(<App />);

    // 1. Buscar estación
    const input = screen.getByPlaceholderText("Search for a station...");
    fireEvent.change(input, { target: { value: "Berlin" } });

    // debería aparecer la opción mockeada desde msw
    const option = await screen.findByText("Berlin");
    fireEvent.click(option);

    // 2. Ver calendario de la estación seleccionada
    expect(await screen.findByText("Berlin")).toBeInTheDocument();
    expect(await screen.findByText(/Campervans Rental/i)).toBeInTheDocument();

    // 3. Clicar en una reserva (mockeada)
    const booking = await screen.findAllByTestId("booking-item"); // viene del handler de bookings
    fireEvent.click(booking[0]);

    // 4. Ver detalles de la reserva
    expect(await screen.findByText("Booking Details")).toBeInTheDocument();
    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(await screen.findByText(/Duration:/i)).toBeInTheDocument();

    const back = await screen.findByTestId("back-button"); // viene del handler de bookings
    fireEvent.click(back);

    expect(await screen.findByText(/Campervans Rental/i)).toBeInTheDocument();
  });
});
