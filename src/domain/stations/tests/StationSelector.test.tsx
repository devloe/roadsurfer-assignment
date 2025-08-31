// StationSelector.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import type { Station } from "../../../types/api";
import { StationSelector } from "../components/StationSelector";

describe("StationSelector", () => {
  const stations: Station[] = [
    { id: "s1", name: "Central", bookings: [] },
    { id: "s2", name: "North", bookings: [] },
  ];

  const searchStations = vi.fn((query: string) =>
    stations.filter((s) => s.name.includes(query)),
  );
  const onStationChange = vi.fn();

  it("renders label and Autocomplete input", () => {
    render(
      <StationSelector
        selectedStation={null}
        onStationChange={onStationChange}
        searchStations={searchStations}
      />,
    );

    expect(
      screen.getByText("Select Station to view calendar:"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for a station..."),
    ).toBeInTheDocument();
  });

  it("fetches stations and displays them in Autocomplete", async () => {
    render(
      <StationSelector
        selectedStation={null}
        onStationChange={onStationChange}
        searchStations={searchStations}
      />,
    );
    const input = screen.getByPlaceholderText("Search for a station...");

    fireEvent.change(input, { target: { value: "Cen" } });

    await waitFor(() => {
      expect(screen.getByText("Central")).toBeInTheDocument();
    });
  });

  it("calls onStationChange when an option is selected", async () => {
    render(
      <StationSelector
        selectedStation={null}
        onStationChange={onStationChange}
        searchStations={searchStations}
      />,
    );
    const input = screen.getByPlaceholderText("Search for a station...");

    fireEvent.change(input, { target: { value: "Cen" } });
    await waitFor(() => screen.getByText("Central"));

    fireEvent.click(screen.getByText("Central"));

    expect(onStationChange).toHaveBeenCalledOnce();
    expect(onStationChange).toHaveBeenCalledWith({
      id: "s1",
      name: "Central",
      bookings: [],
    });
  });
});
