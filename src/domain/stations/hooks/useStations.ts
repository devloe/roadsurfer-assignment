import type { Station } from "../../../types/api";
import { useFetch } from "../../common/hooks/useFetch";

export function useStations() {
  const {
    data: stations,
    loading: isLoading,
    error,
  } = useFetch<Station[]>("/stations");

  const searchStations = (query: string): Station[] => {
    if (!query.trim() || !stations) return [];
    return stations.filter((station) =>
      station.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  const getStationById = (id: string): Station | undefined => {
    return stations?.find((station) => station.id === id);
  };

  return {
    stations,
    isLoading,
    error,
    searchStations,
    getStationById,
  };
}
