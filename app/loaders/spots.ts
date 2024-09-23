import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";
import i18next from "~/i18n/i18next.server";

export const spotsIdLoader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const image = searchParams.get("image");
  const mainImage = image ? image : "/images/noImage.webp";
  const noImage =
    "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-1-760x460.png";

  const limit = 50; // 一度に取得するポケモンの数
  const offset = url.searchParams.get("cursor") || "0"; // offset (ポケモンIDの基準)

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();

  const items = data.results.map(
    (pokemon: { id: string; name: string; url: string }) => {
      const pokemonId = pokemon.url.split("/").filter(Boolean).pop(); // URLからポケモンIDを取得
      return {
        id: pokemonId,
        alt: pokemon.name,
        src: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
      };
    }
  );

  const endCursor = parseInt(offset) + limit; // 次の取得のためのオフセット
  const hasNextPage = data.next !== null; // 次のデータがあるか

  const t = await i18next.getFixedT(request);
  const metaData = {
    title: t("meta.title"),
    description: t("meta.description"),
  };

  return json({ items, endCursor, hasNextPage, mainImage, noImage, metaData });
};
