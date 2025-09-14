import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";

type PostModule = {
  frontmatter: {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
  };
  default: React.ComponentType<any>;
};

// Eagerly import MDX posts so the post page renders instantly
// and doesn't keep reloading modules on navigation.
const modules = import.meta.glob<PostModule>("../content/writings/*.mdx", { eager: true });

export default function Writing() {
  const { slug } = useParams<{ slug: string }>();

  const mod = useMemo(() => {
    if (!slug) return undefined;
    const direct = (modules as any)[`../content/writings/${slug}.mdx`];
    if (direct) return direct as PostModule;
    return Object.entries(modules).find(([p]) => p.endsWith(`${slug}.mdx`))?.[1] as
      | PostModule
      | undefined;
  }, [slug]);

  if (!mod) {
    return (
      <div className="space-y-4">
        <div>Post not found.</div>
        <Link to="/writings" className="text-slate-900 underline">
          Back to writings
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SEO
        title={mod.frontmatter?.title}
        description={mod.frontmatter?.description}
      />
      <article className="prose prose-slate dark:prose-invert max-w-none">
        <mod.default />
      </article>
    </div>
  );
}
