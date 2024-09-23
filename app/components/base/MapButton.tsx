import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  latitude: number;
  longitude: number;
}

export const MapButton = ({
  latitude,
  longitude,
}: Props): React.ReactElement => {
  const openMap = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const appleMapsUrl = `http://maps.apple.com/?ll=${latitude},${longitude}`;
    const googleMapsAppUrl = `geo:${latitude},${longitude}`;

    if (isMobile) {
      // iOSデバイスの場合はApple Maps、Androidの場合はGoogle Maps
      const mapUrl = /iPhone|iPad|iPod/i.test(navigator.userAgent)
        ? appleMapsUrl
        : googleMapsAppUrl;
      window.location.href = mapUrl;
    } else {
      // PCの場合はGoogle Mapsを開く
      window.open(googleMapsUrl, "_blank");
    }
  };

  return (
    <button
      onClick={openMap}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
    >
      <FaMapMarkerAlt className="mr-2" />
    </button>
  );
};
