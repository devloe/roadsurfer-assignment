import { useMemo, useState, useEffect, useCallback } from "react";
import type { Booking, Station } from "../../../types/api";

export function useBookings(
  selectedStation: Station | null,
  stations: Station[] | null,
) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const baseBookings = useMemo<Booking[]>(() => {
    if (!selectedStation) return [];
    const station =
      stations?.find((s) => s.id === selectedStation.id) ||
      stations?.find((s) => s.name === selectedStation.name);
    const stationBookings = station?.bookings;
    return Array.isArray(stationBookings) ? stationBookings : [];
  }, [selectedStation, stations]);

  useEffect(() => {
    setBookings(baseBookings);
  }, [baseBookings]);

  const getBookingsForDay = (date: Date): Booking[] => {
    const dateStr = new Date(date).toDateString();
    return bookings.filter(
      (booking) =>
        new Date(booking.startDate).toDateString() === dateStr ||
        new Date(booking.endDate).toDateString() === dateStr,
    );
  };

  const openBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const closeBookingDetails = () => {
    setSelectedBooking(null);
  };

  const rescheduleBooking = useCallback(
    (bookingId: string, targetDate: Date, role: "pickup" | "return") => {
      setBookings((prev) => {
        const b = prev.find((x) => x.id === bookingId);
        if (!b) return prev;

        const originalStart = new Date(b.startDate);
        const originalEnd = new Date(b.endDate);

        const newStart = new Date(targetDate);
        const newEnd = new Date(targetDate);

        if (role === "pickup") {
          newStart.setHours(
            originalStart.getHours(),
            originalStart.getMinutes(),
            originalStart.getSeconds(),
            originalStart.getMilliseconds(),
          );
          newEnd.setTime(originalEnd.getTime());
        } else if (role === "return") {
          newEnd.setHours(
            originalEnd.getHours(),
            originalEnd.getMinutes(),
            originalEnd.getSeconds(),
            originalEnd.getMilliseconds(),
          );
          newStart.setTime(originalStart.getTime()); // start sigue igual
        }

        const updated = prev.map((x) =>
          x.id === bookingId
            ? {
                ...x,
                startDate: newStart.toISOString(),
                endDate: newEnd.toISOString(),
              }
            : x,
        );

        console.log(`PATCH /api/bookings/${bookingId}`, {
          startDate: newStart.toISOString(),
          endDate: newEnd.toISOString(),
        });

        return updated;
      });
    },
    [],
  );

  return {
    bookings,
    selectedBooking,
    getBookingsForDay,
    openBookingDetails,
    closeBookingDetails,
    rescheduleBooking,
  };
}
