import type { MetadataRoute } from "next";
import { loadPage, paths } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return paths
    .filter((p) => !/\/page\/\d+\/$/.test(p) && !/noindex/.test(loadPage(p).head.robots ?? ""))
    .map((p) => ({ url: `https://facelit.in${p}` }));
}
