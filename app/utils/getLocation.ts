import type { Location } from "~/types/location";

interface IGetLocationResponse {
  location?: Location;
  error?: string;
}

/**
 * 位置情報を取得する関数
 *
 * This function uses the browser's Geolocation API to get the user's current latitude and longitude.
 *
 * @returns Promise<IGetLocationResponse> - 位置情報またはエラーメッセージを含むオブジェクト
 *
 * @example
 * const { location, error } = getLocation();
 */
export const getLocation = async (): Promise<IGetLocationResponse> => {
  if (!("geolocation" in navigator)) {
    return { error: "このブラウザでは位置情報がサポートされていません" };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const location: Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve({ location });
      },
      (error) => {
        console.error(error);
        resolve({ error: "位置情報の取得に失敗しました" });
      }
    );
  });
};
