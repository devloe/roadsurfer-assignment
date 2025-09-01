import { useState } from "react";
import type { Booking, Station, WeekDay } from "../../../types/api";
import { BookingItem } from "../../bookings/components/BookingItem";

type DayTileProps = {
  day: WeekDay;
  bookings: Booking[];
  selectedStation: Station | null;
  onBookingClick: (booking: Booking) => void;
  onBookingReschedule: (
    bookingId: string,
    targetDateISO: Date,
    role: "pickup" | "return",
  ) => void;
};

export function DayTile({
  day,
  bookings,
  onBookingClick,
  onBookingReschedule,
}: DayTileProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  return (
    <section
      role="list"
      aria-label={`${day.dayName}, ${day.dayNumber}`}
      aria-dropeffect={isDragOver ? "move" : undefined}
      className={`rounded-lg border p-2 h-44 overflow-y-auto transition-colors ${
        isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => {
        setIsDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();

        const data = e.dataTransfer.getData("application/json");
        if (!data) {
          setIsDragOver(false);
          return;
        }

        const { bookingId, role } = JSON.parse(data) as {
          bookingId: string;
          role: "pickup" | "return";
        };
        onBookingReschedule(bookingId, day.date, role);

        setIsDragOver(false);
      }}
    >
      <header className="mb-2 flex items-baseline justify-between">
        <h3 className="text-sm text-gray-500">{day.dayName}</h3>
        <p className="text-lg font-semibold">{day.dayNumber}</p>
      </header>

      <ul className="space-y-2">
        {bookings.map((booking) => (
          <li key={booking.id} role="listitem">
            <BookingItem
              booking={booking}
              dayDate={day.date}
              onBookingClick={onBookingClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
