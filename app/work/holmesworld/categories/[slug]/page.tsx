import PageClient from "./PageClient";

export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ slug: "tiles" }, { slug: "bathroom-fittings" }, { slug: "cement" }, { slug: "steel" }, { slug: "paint" }, { slug: "electrical" }, { slug: "plumbing" }, { slug: "lighting" }, { slug: "doors-windows" }, { slug: "waterproofing" }, { slug: "hardware" }, { slug: "insulation" }, { slug: "adhesives-sealants" }, { slug: "false-ceiling" }, { slug: "wood-laminates" }, { slug: "sanitary-ware" }, { slug: "solar" }, { slug: "landscaping" }];
}

export default function Page(props: { params: Promise<{ slug: string }> }) {
  return <PageClient {...props} />;
}
