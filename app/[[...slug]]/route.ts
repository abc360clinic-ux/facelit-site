import { loadPage, paths, pathToSlug, slugToPath } from "@/lib/pages";
import { renderPage } from "@/lib/render";

export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => paths.map((p) => ({ slug: pathToSlug(p) }));

export async function GET(_: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const p = slugToPath((await params).slug);
  if (!paths.includes(p)) return new Response("Not found", { status: 404 });
  return new Response(renderPage(loadPage(p)), { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
