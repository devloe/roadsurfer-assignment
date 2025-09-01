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
    <section
      className="bg-white rounded-lg shadow p-6"
      role="region"
      aria-labelledby="booking-details-heading"
    >
      <h1 id="booking-details-heading" className="text-2xl font-bold mb-4">
        Booking Details
      </h1>

      <dl className="divide-y">
        <div className="flex justify-between py-2">
          <dt className="font-semibold text-gray-700">Customer Name</dt>
          <dd className="text-gray-900">{data.customerName}</dd>
        </div>

        <div className="flex justify-between py-2">
          <dt className="font-semibold text-gray-700">Start Date</dt>
          <dd className="text-gray-900">
            <time dateTime={start.toISOString()}>{start.toLocaleString()}</time>
          </dd>
        </div>

        <div className="flex justify-between py-2">
          <dt className="font-semibold text-gray-700">End Date</dt>
          <dd className="text-gray-900">
            <time dateTime={end.toISOString()}>{end.toLocaleString()}</time>
          </dd>
        </div>

        <div className="flex justify-between py-2">
          <dt className="font-semibold text-gray-700">Duration</dt>
          <dd className="text-gray-900">{durationText}</dd>
        </div>
      </dl>
    </section>
  );
}
