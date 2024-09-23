import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function SpotsRegister() {
  return (
    <>
      <div className="flex">製作中です</div>
    </>
  );
}
