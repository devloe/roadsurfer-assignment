import { useState } from "react";
import {
  CalendarScreen,
  useStations,
  useBookings,
  WeekGrid,
  WeekNavigation,
  StationSelector,
  BookingDetailsScreen,
} from "./domain";
import type { Station } from "./types/api";
import { useCalendar } from "./domain";

function App() {
  const { searchStations, stations, getStationById } = useStations();
  const { weekDays, weekHeader, goToPreviousWeek, goToNextWeek, goToToday } =
    useCalendar();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const {
    getBookingsForDay,
    selectedBooking,
    openBookingDetails,
    closeBookingDetails,
    rescheduleBooking,
  } = useBookings(selectedStation, stations);

  return (
    <>
      {selectedBooking && selectedStation && (
        <BookingDetailsScreen
          getStationById={getStationById}
          bookingId={selectedBooking.id}
          stationId={selectedStation.id}
          onClose={closeBookingDetails}
        />
      )}

      {!selectedBooking && (
        <CalendarScreen
          selectedStation={selectedStation}
          renderStationSelector={() => (
            <StationSelector
              selectedStation={selectedStation}
              onStationChange={setSelectedStation}
              searchStations={searchStations}
            />
          )}
          renderWeekNavigation={() => (
            <WeekNavigation
              weekHeader={weekHeader}
              onPreviousWeek={goToPreviousWeek}
              onNextWeek={goToNextWeek}
              onGoToToday={goToToday}
            />
          )}
          renderWeekGrid={() => (
            <WeekGrid
              weekDays={weekDays}
              getBookingsForDay={getBookingsForDay}
              selectedStation={selectedStation}
              onBookingClick={openBookingDetails}
              onBookingReschedule={rescheduleBooking}
            />
          )}
        />
      )}
    </>
  );
}

export default App;
