import { useState, useMemo } from "react";
import type { WeekDay } from "../../../types/api";

export function useCalendar() {
  const initialDate = new Date(2021, 6, 1); // Because most of the bookings are in june 2004

  const [currentWeek, setCurrentWeek] = useState<Date>(initialDate);

  const weekDays = useMemo((): WeekDay[] => {
    const days: WeekDay[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeek);
      day.setDate(currentWeek.getDate() + i);

      days.push({
        date: day,
        dayName: day.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: day.getDate(),
        isToday: day.toDateString() === today.toDateString(),
      });
    }

    return days;
  }, [currentWeek]);

  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => {
      const newWeek = new Date(prev);
      newWeek.setDate(prev.getDate() - 7);
      return newWeek;
    });
  };

  const goToNextWeek = () => {
    setCurrentWeek((prev) => {
      const newWeek = new Date(prev);
      newWeek.setDate(prev.getDate() + 7);
      return newWeek;
    });
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  const weekHeader = useMemo(() => {
    const firstDay = weekDays[0];
    return {
      monthYear: firstDay.date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      weekStart: firstDay.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  }, [weekDays]);

  return {
    currentWeek,
    weekDays,
    weekHeader,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
  };
}
