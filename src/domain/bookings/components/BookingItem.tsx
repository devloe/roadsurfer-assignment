import type { Booking } from "../../../types/api";

type BookingItemProps = {
  booking: Booking;
  dayDate: Date;
  onBookingClick: (booking: Booking) => void;
};

export function BookingItem({
  booking,
  dayDate,
  onBookingClick,
}: BookingItemProps) {
  const start = new Date(booking.startDate);
  const end = new Date(booking.endDate);

  const isPickup = dayDate.toDateString() === start.toDateString();
  const isReturn = !isPickup && dayDate.toDateString() === end.toDateString();
  const label = isPickup ? "→ Pickup" : isReturn ? "← Return" : null;

  const timeText = isPickup
    ? start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : isReturn
      ? end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";

  return (
    <button
      data-testid="booking-item"
      draggable
      onClick={() => onBookingClick(booking)}
      onDragStart={(e) => {
        e.dataTransfer.setData(
          "application/json",
          JSON.stringify({
            bookingId: booking.id,
            role: isPickup ? "pickup" : "return",
          }),
        );
        e.dataTransfer.effectAllowed = "move";
      }}
      className="w-full text-left rounded-md border px-2 py-1 hover:bg-gray-50 flex flex-col items-start justify-between"
      title={label ?? undefined}
    >
      <div className="flex flex-col">
        <div className="text-sm">{booking.customerName}</div>
        {timeText && (
          <div className="text-xs text-gray-500 truncate">{timeText}</div>
        )}
      </div>

      {/* Label */}
      {label && (
        <div
          className={`flex-shrink-0 max-w-[6rem] text-center truncate rounded-full px-2 py-0.5 text-xs font-semibold ${
            isPickup
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {label}
        </div>
      )}
    </button>
  );
}
