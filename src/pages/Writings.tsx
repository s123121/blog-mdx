import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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

const modules = import.meta.glob<PostModule>("../content/writings/*.mdx", {
  eager: true,
});

type Post = {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  slug: string;
};

function groupByYear(posts: Post[]): Record<string, Post[]> {
  return posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear().toString();
      acc[year] ||= [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, Post[]>,
  );
}

export default function Writings() {
  const posts: Post[] = Object.entries(modules).map(([path, mod]) => {
    const slug = path
      .split("/")
      .pop()!
      .replace(/\.mdx$/, "");
    return {
      title: mod.frontmatter.title,
      date: mod.frontmatter.date,
      description: mod.frontmatter.description,
      tags: mod.frontmatter.tags ?? [],
      slug,
    };
  });

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const grouped = groupByYear(posts);
  const years = Object.keys(grouped).sort((a, b) => +b - +a);

  return (
    <div className="space-y-6">
      <SEO title="Writings" description="Articles and notes by me" />
      <h1 className="text-2xl font-semibold">Writings</h1>
      {years.map((year) => (
        <section key={year} className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-500">{year}</h2>
          <div className="divide-y rounded-md border dark:divide-slate-800 dark:border-slate-800">
            {grouped[year].map((post) => (
              <Link
                key={post.slug}
                to={`/writings/${post.slug}`}
                className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <time className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  {new Date(post.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "2-digit",
                  })}
                </time>
                <div className="mt-1 font-semibold leading-snug">
                  {post.title}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {post.tags.slice(0, 3).map((t) => (
                      <Badge
                        variant="secondary"
                        key={t}
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
                {post.description && (
                  <div className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {post.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
