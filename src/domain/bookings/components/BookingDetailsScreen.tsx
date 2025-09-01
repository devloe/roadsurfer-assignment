import { BookingDetails } from "./BookingDetails";
import { useBookingDetails } from "../hooks/useBookingDetails";
import type { Station } from "../../../types/api";

type BookingDetailsScreenProps = {
  bookingId: string;
  stationId: string;
  onClose: () => void;
  getStationById: (id: string) => Station | undefined; // añadimos la prop
};

export function BookingDetailsScreen({
  bookingId,
  stationId,
  onClose,
  getStationById,
}: BookingDetailsScreenProps) {
  const {
    booking: data,
    loading,
    error,
  } = useBookingDetails(bookingId, stationId);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        Loading booking details...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <span className="text-red-500" role="alert">
          {error ?? "There was a problem trying to load the bookings info."}
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          data-testid="back-button"
          onClick={onClose}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          aria-label="Go back to previous screen"
        >
          ← Back
        </button>

        <BookingDetails data={data} getStationById={getStationById} />
      </div>
    </main>
  );
}
