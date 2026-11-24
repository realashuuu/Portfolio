import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { projects } from "@/data/projects";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Workflow,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study — Ashik Khan`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Ashik Khan Portfolio`,
      description: project.shortDescription,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen py-28 px-6 md:px-12 max-w-[1160px] mx-auto space-y-12 z-10 relative">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted">
        <Link href="/" className="hover:text-ink transition-colors font-semibold">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border" />
        <Link href="/#projects" className="hover:text-ink transition-colors font-semibold">
          Projects
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-border" />
        <span className="text-brand-violet font-bold">{project.title}</span>
      </nav>

      {/* Header Banner */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-violet uppercase">
            {project.projectNumber} · {project.category}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border border-brand-violet/30 bg-brand-violet/10 text-brand-violet">
            {project.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-ink tracking-tight">
          {project.title}
        </h1>

        <p className="text-xs sm:text-sm font-mono text-muted uppercase font-bold tracking-wider">
          {project.subtitle}
        </p>

        <p className="text-base sm:text-lg text-ink-2 leading-relaxed font-sans max-w-3xl pt-2">
          {project.fullOverview}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-bold text-white bg-ink hover:bg-brand-violet transition-all shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-bold text-brand-violet bg-brand-violet/10 hover:bg-brand-violet hover:text-white transition-all border border-brand-violet/20 shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Launch Live Deployment</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {project.metrics.map((metric, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-2xl p-5 text-center">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-brand-violet">
              {metric.value}
            </div>
            <div className="text-[0.65rem] font-mono uppercase tracking-wider text-muted font-bold pt-1">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      {/* Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section aria-labelledby="problem-heading" className="bg-surface border border-border rounded-2xl p-7 space-y-3">
          <div className="flex items-center gap-2 text-brand-rose text-xs font-mono font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <h2 id="problem-heading">The Problem</h2>
          </div>
          <p className="text-sm text-ink-2 leading-relaxed font-sans">
            {project.problem}
          </p>
        </section>

        <section aria-labelledby="solution-heading" className="bg-surface border border-border rounded-2xl p-7 space-y-3">
          <div className="flex items-center gap-2 text-brand-emerald text-xs font-mono font-bold uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <h2 id="solution-heading">The Architectural Solution</h2>
          </div>
          <p className="text-sm text-ink-2 leading-relaxed font-sans">
            {project.solution}
          </p>
        </section>
      </div>

      {/* Technical Architecture Flow */}
      <section aria-labelledby="architecture-heading" className="space-y-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted font-bold">
          <Workflow className="w-4 h-4 text-brand-violet" />
          <h2 id="architecture-heading">Architecture &amp; Data Pipeline</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.architectureFlow.map((node, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between space-y-2.5"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-brand-violet font-bold block">
                  {node.step}
                </span>
                <h3 className="text-sm font-display font-bold text-ink">
                  {node.title}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed font-sans pt-1">
                  {node.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Capabilities */}
      <section aria-labelledby="capabilities-heading" className="bg-surface border border-border rounded-2xl p-7 space-y-4">
        <h2 id="capabilities-heading" className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
          Key Capabilities &amp; Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {project.keyCapabilities.map((cap, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-sans">
              <CheckCircle2 className="w-4 h-4 text-brand-violet mt-0.5 flex-shrink-0" />
              <span>{cap}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Decisions */}
      <section aria-labelledby="decisions-heading" className="bg-surface border border-border rounded-2xl p-7 space-y-4">
        <h2 id="decisions-heading" className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
          Architectural Decisions &amp; Engineering Tradeoffs
        </h2>
        <div className="space-y-2.5">
          {project.technicalDecisions.map((decision, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-2 font-sans">
              <span className="text-brand-violet font-mono text-xs mt-0.5">❯</span>
              <span>{decision}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section aria-labelledby="tech-stack-heading" className="space-y-4">
        <h2 id="tech-stack-heading" className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
          Complete Technology Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.techStack.map((group, i) => (
            <div key={i} className="bg-surface border border-border rounded-2xl p-5 space-y-2">
              <span className="text-[11px] font-mono uppercase text-muted font-bold block">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="tag font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Back Button */}
      <div className="pt-8 border-t border-border flex justify-between items-center">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-bold text-white bg-ink hover:bg-brand-violet transition-all shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Projects</span>
        </Link>
        <span className="text-xs font-mono text-muted">
          Case Study · {project.projectNumber}
        </span>
      </div>
    </article>
  );
}
