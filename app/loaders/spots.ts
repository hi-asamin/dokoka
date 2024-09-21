import { LoaderFunction, LoaderFunctionArgs, json } from "@remix-run/node";

export const spotsIdLoader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const image = searchParams.get("image");
  const mainImage = image ? image : "/images/noImage.webp";
  const noImage =
    "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-1-760x460.png";

  return json({ mainImage, noImage });
};
