type WeekNavigationProps = {
  weekHeader: {
    monthYear: string;
    weekStart: string;
  };
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onGoToToday: () => void;
};

export function WeekNavigation({
  weekHeader,
  onPreviousWeek,
  onNextWeek,
  onGoToToday,
}: WeekNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onPreviousWeek}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        ← Previous Week
      </button>

      <div className="text-center">
        <h2 className="text-xl font-semibold">
          {weekHeader.monthYear} - Week of {weekHeader.weekStart}
        </h2>
        <button
          onClick={onGoToToday}
          className="text-sm text-blue-600 hover:text-blue-800 mt-1"
        >
          Go to Today
        </button>
      </div>

      <button
        onClick={onNextWeek}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        Next Week →
      </button>
    </div>
  );
}
