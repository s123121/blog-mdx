# Blog (Vite + React + Tailwind + MDX)

This is a clean, Notion-esque blog scaffolded with Vite, React, Tailwind, and shadcn-style UI components. Posts are plain `.mdx` files committed to the repo.

## Scripts

- `pnpm i` – install deps
- `pnpm run dev` – start dev server
- `pnpm run build` – build for production
- `pnpm run preview` – preview production build

## Structure

- `src/pages` – Home, Projects, Writings, Writing
- `src/components` – Sidebar and small UI primitives (button, badge, card)
- `src/content/writings` – MDX posts
- `src/content/projects.ts` – project cards data

## Writing posts

Add an `.mdx` file under `src/content/writings` with YAML frontmatter:

```mdx
---
title: My Post Title
date: 2025-01-01
description: Optional short summary
tags: [AI, Notes]
---

# My Post Title

Content in MDX...
```

The listing automatically groups by year and sorts by date (newest first). The slug is the filename without the `.mdx` extension.

## Deploy

```sh
pnpm run build
# Deploy `dist/` to Netlify, Vercel, Cloudflare Pages, etc.
```
