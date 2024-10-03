import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

import { spotsIdLoader } from "~/loaders/spots";
import { InfiniteScroll } from "~/components/base/InfinitieScroll";
import { FloatingNav } from "~/components/base/FloatingNav";
import { BackButton } from "~/components/base/BackButton";
import { ImageGrid } from "~/components/ImageGrid";

import type { ISpotIdLoader } from "~/types/soptIdPage";
import type { Image } from "~/types/images";
import { MapButton } from "~/components/base/MapButton";

export const meta: MetaFunction = ({ data }) => {
  const metaData = (data as ISpotIdLoader).metaData;
  return [{ title: metaData.title }, { name: metaData.description }];
};

export const handle = { i18n: "spotsId" };

export const loader = spotsIdLoader;

export default function Spot() {
  const {
    items: initItems,
    hasNextPage: initHasNextPage,
    endCursor: initCursor,
    mainImage,
    noImage,
  } = useLoaderData<typeof loader>();
  const params = useParams();
  const splat = params["*"];
  const { t } = useTranslation("spotsId");

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
      <BackButton />

      {/* 1段目: mainセクション */}
      <section id="main" className="w-full">
        <img
          className="w-full h-auto"
          src={mainImage}
          alt={splat}
          onError={(e) => {
            // 画像の読み込みが失敗した場合にデフォルトの画像に置き換える
            e.currentTarget.onerror = null;
            e.currentTarget.src = noImage;
          }}
        />
      </section>

      {/* 2段目: H2とMap Buttonが横並び */}
      <section id="info" className="flex items-center">
        <h2 className="text-2xl font-bold">鶴岡八幡宮</h2>
        <MapButton latitude={35.6895} longitude={139.6917} />
      </section>

      {/* 3段目: インフィニティスクロールの領域 */}
      <section id="more" className="mt-4">
        <h2 className="text-2xl font-bold">{t("more")}</h2>
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
      </section>
      <FloatingNav />
    </>
  );
}
