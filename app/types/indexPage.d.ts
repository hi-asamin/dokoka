import { Meta } from "~/types/meta";
import { Image } from "~/types/images";

export interface IndexPage {
  items: Image[];
  endCursor: number;
  hasNextPage: boolean;
  metaData: Meta;
}
