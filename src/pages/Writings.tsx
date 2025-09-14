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
  return posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear().toString();
    acc[year] ||= [];
    acc[year].push(post);
    return acc;
  }, {} as Record<string, Post[]>);
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
                className="flex items-center justify-between gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <div>
                  <time className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(post.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "2-digit",
                    })}
                  </time>
                  <div className="font-medium">{post.title}</div>
                  {post.description && (
                    <div className="text-sm text-slate-600 dark:text-slate-300">
                      {post.description}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {post.tags?.slice(0, 3).map((t) => (
                    <Badge variant="outline" key={t}>
                      {t}
                    </Badge>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
