import type { Booking, Station, WeekDay } from "../../../types/api";
import { DayTile } from "./DayTile";

type WeekGridProps = {
  weekDays: WeekDay[];
  getBookingsForDay: (date: Date) => Booking[];
  selectedStation: Station | null;
  onBookingClick: (booking: Booking) => void;
  onBookingReschedule: (
    bookingId: string,
    targetDate: Date,
    role: "pickup" | "return",
  ) => void;
};

export function WeekGrid({
  weekDays,
  getBookingsForDay,
  selectedStation,
  onBookingClick,
  onBookingReschedule,
}: WeekGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      {weekDays.map((day, index) => {
        const dayBookings = getBookingsForDay(day.date);

        return (
          <DayTile
            key={index}
            day={day}
            bookings={dayBookings}
            selectedStation={selectedStation}
            onBookingClick={onBookingClick}
            onBookingReschedule={onBookingReschedule}
          />
        );
      })}
    </div>
  );
}
