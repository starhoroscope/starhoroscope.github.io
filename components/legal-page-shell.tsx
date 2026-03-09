import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StarField } from "@/components/star-field";

interface LegalPageShellProps {
  title: string;
  updatedAt: string;
  description: string;
  children: React.ReactNode;
}

export function LegalPageShell({
  title,
  updatedAt,
  description,
  children,
}: LegalPageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <StarField />
      <div className="relative z-10">
        <SiteHeader />
        <main className="px-4 pb-20 pt-32">
          <div className="mx-auto flex max-w-4xl flex-col gap-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-card/55 p-8 backdrop-blur-xl md:p-10">
              <div
                className="pointer-events-none absolute inset-0 opacity-80"
                aria-hidden="true"
              >
                <div className="absolute -left-16 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 top-10 h-32 w-32 rounded-full bg-sky-400/10 blur-3xl" />
              </div>

              <div className="relative flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    返回首页
                  </Link>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs tracking-[0.25em] text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    POLICY
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase">
                    Last Updated {updatedAt}
                  </p>
                  <h1 className="max-w-3xl font-serif text-4xl leading-tight text-foreground md:text-6xl">
                    {title}
                  </h1>
                  <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    {description}
                  </p>
                </div>
              </div>
            </div>

            <article className="rounded-[2rem] border border-border bg-card/45 p-8 backdrop-blur-xl md:p-10">
              <div className="space-y-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-foreground [&_h2]:md:text-3xl [&_p]:text-sm [&_p]:leading-8 [&_p]:text-muted-foreground [&_p]:md:text-base">
                {children}
              </div>
            </article>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
