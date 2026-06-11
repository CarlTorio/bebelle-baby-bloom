import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

const API_BASE = "https://psgc.gitlab.io/api";

interface GeoEntry {
  code: string;
  name: string;
}

const cache = new Map<string, GeoEntry[]>();

async function fetchGeo(endpoint: string): Promise<GeoEntry[]> {
  if (cache.has(endpoint)) return cache.get(endpoint)!;
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  const data: GeoEntry[] = await res.json();
  const sorted = data
    .map((d) => ({ code: d.code, name: d.name }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
  cache.set(endpoint, sorted);
  return sorted;
}

export function usePSGC() {
  const [provinces, setProvinces] = useState<GeoEntry[]>([]);
  const [cities, setCities] = useState<GeoEntry[]>([]);
  const [barangays, setBarangays] = useState<GeoEntry[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingBarangays, setLoadingBarangays] = useState(false);

  // Fetch provinces on mount
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchGeo("/provinces/");
        // Add Metro Manila as a virtual province
        const withNCR = [
          ...data,
          { code: "130000000", name: "Metro Manila" },
        ].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
        setProvinces(withNCR);
      } catch {
        toast.error("Failed to load locations. Please reload the page.");
      } finally {
        setLoadingProvinces(false);
      }
    })();
  }, []);

  const fetchCities = useCallback(async (provinceCode: string) => {
    setCities([]);
    setBarangays([]);
    if (!provinceCode) return;
    setLoadingCities(true);
    try {
      const endpoint =
        provinceCode === "130000000"
          ? "/regions/130000000/cities-municipalities/"
          : `/provinces/${provinceCode}/cities-municipalities/`;
      const data = await fetchGeo(endpoint);
      setCities(data);
    } catch {
      toast.error("Failed to load cities. Please reload the page.");
    } finally {
      setLoadingCities(false);
    }
  }, []);

  const fetchBarangays = useCallback(async (cityCode: string) => {
    setBarangays([]);
    if (!cityCode) return;
    setLoadingBarangays(true);
    try {
      const data = await fetchGeo(`/cities-municipalities/${cityCode}/barangays/`);
      setBarangays(data);
    } catch {
      toast.error("Failed to load barangays. Please reload the page.");
    } finally {
      setLoadingBarangays(false);
    }
  }, []);

  return {
    provinces, cities, barangays,
    loadingProvinces, loadingCities, loadingBarangays,
    fetchCities, fetchBarangays,
  };
}
