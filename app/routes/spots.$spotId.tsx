import { useLoaderData, useParams } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { spotsIdLoader } from "~/loaders/spots";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = spotsIdLoader;

export default function Index() {
  const { mainImage, noImage } = useLoaderData<typeof loader>();
  const params = useParams();
  const splat = params["*"];
  return (
    <div className="flex">
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
    </div>
  );
}
