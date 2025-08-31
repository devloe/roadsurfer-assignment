import { BookingDetails } from "./BookingDetails";
import { useBookingDetails } from "../hooks/useBookingDetails";

type BookingDetailsContainerProps = {
  bookingId: string;
  stationId: string;
  onClose: () => void;
};

export function BookingDetailsScreen({
  bookingId,
  stationId,
  onClose,
}: BookingDetailsContainerProps) {
  const {
    booking: data,
    loading,
    error,
  } = useBookingDetails(bookingId, stationId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading booking details...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <span className="text-red-500">
          {error ?? "There was a problem trying to load the bookings info."}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            data-testid="back-button"
            onClick={onClose}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            ← Back
          </button>
          <BookingDetails data={data} />
        </div>
      </div>
    </>
  );
}
