export type Station = {
  id: string;
  name: string;
  bookings: Booking[];
};

export type Booking = {
  id: string;
  startDate: string;
  endDate: string;
  customerName: string;
  pickupReturnStationId: string;
};

export type WeekDay = {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
};
