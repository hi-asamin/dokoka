import { Meta } from "~/types/meta";
import { Image } from "~/types/images";

export interface ISpotIdLoader {
  items: Image[];
  endCursor: number;
  hasNextPage: boolean;
  mainImage: string;
  noImage: string;
  metaData: Meta;
}
