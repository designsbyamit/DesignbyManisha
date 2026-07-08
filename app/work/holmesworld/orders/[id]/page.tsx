import PageClient from "./PageClient";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ id: "ORD-001" }, { id: "ORD-002" }];
}

export default function Page(props: { params: Promise<{ id: string }> }) {
  return <PageClient {...props} />;
}
