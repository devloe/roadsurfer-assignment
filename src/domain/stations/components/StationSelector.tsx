import {
  Autocomplete,
  type AutocompleteOption,
} from "../../common/components/Autocomplete";
import type { Station } from "../../../types/api";

type StationSelectorProps = {
  selectedStation: Station | null;
  onStationChange: (station: Station | null) => void;
  searchStations: (query: string) => Station[];
};

export function StationSelector({
  selectedStation,
  onStationChange,
  searchStations,
}: StationSelectorProps) {
  const fetchStations = async (
    query: string,
  ): Promise<AutocompleteOption<Station>[]> => {
    return searchStations(query).map((station) => ({
      label: station.name,
      value: station,
    }));
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="station-autocomplete"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select a station to view calendar
      </label>
      <Autocomplete
        id="station-autocomplete"
        placeholder="Search for a station..."
        value={selectedStation}
        onChange={onStationChange}
        fetchOptions={fetchStations}
        debounceMs={300}
        data-testid="station-selector"
      />
    </div>
  );
}
