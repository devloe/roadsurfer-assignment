import type { Booking } from "../../../types/api";
import { useFetch } from "../../common/hooks/useFetch";

export function useBookingDetails(bookingId: string, stationId: string) {
  const { data, loading, error } = useFetch<Booking>(
    bookingId && stationId
      ? `/stations/${stationId}/bookings/${bookingId}`
      : null,
  );

  return { booking: data, loading, error };
}
