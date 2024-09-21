import { Link } from "@remix-run/react";
import { Image } from "~/types/images";

interface Props {
  images: Image[];
}

export const ImageGrid = ({ images }: Props): React.JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="w-full rounded overflow-hidden shadow-lg"
        >
          <Link to={`/spots/${image.id}?image=${image.src}`}>
            <img src={image.src} alt={image.alt} className="w-full h-auto" />
          </Link>
        </div>
      ))}
    </div>
  );
};
