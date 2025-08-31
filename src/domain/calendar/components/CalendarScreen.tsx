import { type ReactNode } from "react";
import type { Station } from "../../../types/api";

type CalendarProps = {
  selectedStation: Station | null;
  renderStationSelector: () => ReactNode;
  renderWeekNavigation: () => ReactNode;
  renderWeekGrid: () => ReactNode;
};

export function CalendarScreen({
  selectedStation,
  renderStationSelector,
  renderWeekNavigation,
  renderWeekGrid,
}: CalendarProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">
          Campervans Rental
        </h1>
        {renderStationSelector()}
        {selectedStation && (
          <>
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-400">
              {selectedStation?.name}
            </h2>
            {renderWeekNavigation()}
            {renderWeekGrid()}
          </>
        )}
      </div>
    </div>
  );
}
