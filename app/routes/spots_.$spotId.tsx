import { useLoaderData, useParams } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

import { spotsIdLoader } from "~/loaders/spots";
import { useTranslation } from "react-i18next";
import { FloatingNav } from "~/components/base/FloatingNav";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const handle = { i18n: "spotsId" };

export const loader = spotsIdLoader;

export default function Spot() {
  const { mainImage, noImage } = useLoaderData<typeof loader>();
  const params = useParams();
  const splat = params["*"];
  const { t } = useTranslation("spotsId");
  return (
    <>
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
      <h2>{t("name")}</h2>
      <FloatingNav />
    </>
  );
}
