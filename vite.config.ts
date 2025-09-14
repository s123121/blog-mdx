import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { fileURLToPath, URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

function mdxSlugs() {
  try {
    const dir = path.resolve(process.cwd(), "src/content/writings");
    const files = fs.readdirSync(dir);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => `/writings/${f.replace(/\.mdx$/, "")}`);
  } catch {
    return [];
  }
}

// https://vitejs.dev/config/
export default defineConfig(() => {
  const routes = ["/", "/projects", "/writings", ...mdxSlugs()];
  const plugins: any[] = [
    react(),
    vitePrerenderPlugin({
      renderTarget: "#root",
    }),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        // Cast to any to work around upstream type incompatibility between remark-mdx-frontmatter and mdx plugin's expected Plugin signature
        [remarkMdxFrontmatter as any, { name: "frontmatter" }],
      ],
    }),
  ];
  return {
    plugins,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
