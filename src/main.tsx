import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { MDXProvider } from "@mdx-js/react";
import App from "./App";
import "./index.css";
import { mdxComponents } from "./mdx-components";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/ThemeProvider";

const Router = typeof window !== "undefined" ? BrowserRouter : StaticRouter;

export function AppWrapper({ url }: { url?: string }) {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <Router location={url}>
            <MDXProvider components={mdxComponents}>
              <App />
            </MDXProvider>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

// Client-side hydration

if (typeof window !== "undefined") {
  const target = document.getElementById("root");
  import.meta.env.DEV
    ? createRoot(target).render(<AppWrapper />)
    : hydrateRoot(target, <AppWrapper />);
}

export async function prerender(data) {
  const { renderToString } = await import("react-dom/server");
  const { parseLinks } = await import("vite-prerender-plugin/parse");

  const html = renderToString(<AppWrapper {...data} />);
  const links = parseLinks(html);

  return { html, links };
}
