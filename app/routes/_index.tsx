import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { useGeolocation } from "~/hooks/useGeolocation";
import { indexLoader } from "~/loaders";
import { InfiniteScroll } from "~/components/base/InfinitieScroll";
import { ImageGrid } from "~/components/ImageGrid";
import { FloatingNav } from "~/components/base/FloatingNav";

import type { IIndexLoader } from "~/types/indexPage";
import type { Image } from "~/types/images";

export const meta: MetaFunction = ({ data }) => {
  const metaData = (data as IIndexLoader).metaData;
  return [{ title: metaData.title }, { name: metaData.description }];
};

export const loader = indexLoader;

export default function Index() {
  const { location, error: unknownLocation } = useGeolocation();

  if (unknownLocation) {
    alert(unknownLocation);
  }
  if (location) {
    console.log(location);
  }

  const {
    items: initItems,
    hasNextPage: initHasNextPage,
    endCursor: initCursor,
  } = useLoaderData<typeof loader>();

  const [items, setItems] = useState<Image[]>(initItems);
  const [hasNextPage, setHasNextPage] = useState(initHasNextPage);
  const [cursor, setCursor] = useState(initCursor);

  const fetcher = useFetcher<typeof loader>();

  useEffect(() => {
    // 取得したデータがある場合、ポケモンのリストに追加
    const fetchedData = fetcher.data;
    if (fetchedData && fetchedData.items.length > 0) {
      setItems((prev) => [...prev, ...fetchedData.items]);
      setCursor(fetchedData.endCursor);
      setHasNextPage(fetchedData.hasNextPage);
    }
  }, [fetcher.data]);

  return (
    <>
      <InfiniteScroll
        loadMore={() => {
          if (fetcher.state === "idle") {
            fetcher.submit({ cursor: cursor ?? "" });
          }
        }}
        hasNextPage={hasNextPage}
      >
        <ImageGrid images={items} />
      </InfiniteScroll>
      <FloatingNav />
    </>
  );
}
