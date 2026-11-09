import { readFileSync } from "node:fs";
import path from "node:path";
import index from "../content/index.json";

export type Page = {
  path: string; bodyClass: string; bodyHtml: string;
  head: { title: string; description: string | null; robots: string | null; canonical: string | null;
    og: Record<string, string>; tw: Record<string, string>; jsonld: string[] };
};
export const paths = index as string[];
export const key = (p: string) => (p === "/" ? "home" : p.replace(/^\/|\/$/g, "").replaceAll("/", "__"));
export const slugToPath = (slug?: string[]) => (slug?.length ? `/${slug.map(decodeURIComponent).join("/")}/` : "/");
export const pathToSlug = (p: string) => p.split("/").filter(Boolean);
export const loadPage = (p: string): Page =>
  JSON.parse(readFileSync(path.join(process.cwd(), "content/pages", `${key(p)}.json`), "utf8"));
