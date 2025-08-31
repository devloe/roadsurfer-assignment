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
    const filtered = searchStations(query);
    return filtered.map((station) => ({
      label: station.name,
      value: station,
    }));
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Station to view calendar:
      </label>
      <Autocomplete
        placeholder="Search for a station..."
        value={selectedStation}
        onChange={onStationChange}
        fetchOptions={fetchStations}
        debounceMs={300}
      />
    </div>
  );
}
