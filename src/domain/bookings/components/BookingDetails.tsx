import type { Booking } from "../../../types/api";

type BookingDetailsProps = {
  data: Booking;
};

export function BookingDetails({ data }: BookingDetailsProps) {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const ms = Math.max(0, end.getTime() - start.getTime());
  const days = Math.max(0, Math.ceil(ms / 86_400_000));
  const durationText = `${days} day${days === 1 ? "" : "s"}`;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>

      <div className="space-y-3">
        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold text-gray-700">Customer:</span>
          <span className="text-gray-900">{data.customerName}</span>
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold text-gray-700">From:</span>
          <span className="text-gray-900">{start.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold text-gray-700">To:</span>
          <span className="text-gray-900">{end.toLocaleString()}</span>
        </div>

        <div className="flex justify-between py-2 border-b">
          <span className="font-semibold text-gray-700">Duration:</span>
          <span className="text-gray-900">{durationText}</span>
        </div>
      </div>
    </div>
  );
}
