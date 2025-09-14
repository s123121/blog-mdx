import { Card, CardContent, CardHeader } from "@/components/ui/card";
import projects from "@/content/projects";
import SEO from "@/components/SEO";

export default function Projects() {
  return (
    <div className="space-y-6">
      <SEO title="Projects" description="Projects I worked on" />
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <a key={p.name} href={p.url} target="_blank" rel="noreferrer">
            <Card className="h-full transition-colors hover:bg-slate-50">
              <CardContent>
                <div className="mb-2 flex items-center gap-3">
                  {p.thumbnail && (
                    <img
                      src={p.thumbnail}
                      alt={p.name}
                      className="rounded-md h-6 w-6"
                    />
                  )}
                  <div className="font-semibold">{p.name}</div>
                </div>
                <div className="text-sm text-slate-600">{p.description}</div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
