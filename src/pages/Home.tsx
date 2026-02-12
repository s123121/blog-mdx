import { Link } from "react-router-dom";
import { Mail, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <div className="space-y-6">
      <SEO
        title="Kim Lam"
        description="Personal site: writings, projects, and notes."
      />
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Hey, I’m Lam</h1>
        <p className="text-slate-600">
          I build software and write about engineering, products, and things I
          learn.
        </p>
        <p className="text-slate-600">
          I also make a podcast{" "}
          <a href="https://open.spotify.com/show/2TdCn51qiLavhpMqXcEX9X">
            <span>🎙️</span>
            <span className="underline">Listen here </span>
          </a>
        </p>
      </header>

      <div className="flex gap-3">
        <Button asChild>
          <Link to="/writings">Read my writings</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/projects">Browse projects</Link>
        </Button>
      </div>

      <section className="mt-8">
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="icon" aria-label="Email">
            <a href="mailto:knlam.ko91@gmail.com">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" aria-label="GitHub">
            <a
              href="https://github.com/s123121"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <a href="https://pub-d825afddbdb94697b79407262cad8e4d.r2.dev/KimLam_25091402.pdf">
            <span className="ml-2 underline">My CV</span>
          </a>
        </div>
      </section>
    </div>
  );
}
