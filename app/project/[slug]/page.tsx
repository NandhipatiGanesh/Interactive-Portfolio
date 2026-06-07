import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

// TODO: replace with your real project slugs (each entry pre-renders at build).
// Required because next.config.ts uses `output: "export"`.
export function generateStaticParams() {
  return [{ slug: "example" }];
}

// Minimal lookup so we can detect unknown slugs. Expand later with real data.
const PROJECTS: Record<string, { title: string; tagline?: string }> = {
  example: {
    title: "Example Project",
    tagline: "Placeholder — replace with real project content.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];
  return {
    title: project ? `${project.title} — Ganesh Kumar` : "Project — Ganesh Kumar",
    description: project?.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) notFound();

  return (
    <main className="relative min-h-screen w-full bg-[#f4f4f3] px-7 py-24 text-neutral-900 sm:px-10 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-sm text-neutral-500">/{slug}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
            {project.tagline}
          </p>
        )}

        {/* Project body — fill in when you have content. */}
      </div>
    </main>
  );
}
