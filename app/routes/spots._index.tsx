import type { MetaFunction } from "@remix-run/node";
import { FloatingNav } from "~/components/base/FloatingNav";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Spots() {
  return (
    <>
      <div className="flex">検索ページ製作中です</div>
      <FloatingNav />
    </>
  );
}
