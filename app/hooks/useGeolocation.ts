import { useState, useEffect } from "react";
import { getLocation } from "~/utils/getLocation";
import type { Location } from "~/types/location";

interface IUserGeolocation {
  location: Location | undefined;
  error: string | null;
}

/**
 * Custom hook to retrieve the user's geolocation.
 *
 * This hook fetches the user's current latitude and longitude when the component is mounted.
 * It uses the browser's Geolocation API to get the current position.
 *
 * @returns IUserGeolocation
 *  An object containing the current location (latitude and longitude) and any error message.
 *
 * @example
 * const { location, error } = useGeolocation();
 */
export const useGeolocation = (): IUserGeolocation => {
  const [location, setLocation] = useState<Location | undefined>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { location, error } = await getLocation();
      if (error) {
        setError(error);
        return;
      }
      if (location) setLocation(location);
    })();
  }, []); // ページ遷移時にのみ実行

  return { location, error };
};
