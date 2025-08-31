import { http } from "msw";
import { API_URL } from "../../domain";

export const handlers = [
  http.get(`${API_URL}/stations`, async () => {
    return Response.json([
      {
        id: "1",
        name: "Berlin",
        bookings: [
          {
            id: "1",
            customerName: "Alice",
            startDate: "2021-07-01T05:05:37Z",
            endDate: "2021-07-07T03:24:19Z",
            pickupReturnStationId: "1",
          },
        ],
      },
      {
        id: "2",
        name: "Munich",
        bookings: [
          {
            id: "1",
            customerName: "Bob",
            startDate: "2021-08-01T08:00:00Z",
            endDate: "2021-08-03T10:00:00Z",
            pickupReturnStationId: "2",
          },
        ],
      },
    ]);
  }),

  http.get(
    `${API_URL}/stations/:stationId/bookings/:bookingId`,
    async ({ params }) => {
      const { bookingId, stationId } = params;

      return Response.json({
        id: bookingId,
        customerName: "Alice",
        startDate: "2021-07-01T05:05:37Z",
        endDate: "2021-07-07T03:24:19Z",
        pickupReturnStationId: stationId,
      });
    },
  ),
];
