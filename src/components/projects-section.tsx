import { useState } from "react";
import { 
  ArrowUpRight, 
  CaretDown, 
  CaretUp, 
  GithubLogo, 
  Globe, 
  Sparkle, 
  CheckCircle,
  TerminalWindow 
} from "@phosphor-icons/react";

export interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  story?: string;
  features?: string[];
  tech: string[];
  link?: string;
  github: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(new Set());

  const toggleExpand = (slug: string) => {
    setExpandedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {projects.map((project, index) => {
        const isExpanded = expandedSlugs.has(project.slug);

        return (
          <div
            key={project.slug}
            className="border border-border bg-card/80 transition-all duration-150 hover:border-foreground/40 hover:bg-card group"
          >
            {/* Main Card Header / Summary */}
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-[11px] font-mono text-muted-foreground/70">
                      0{index + 1} //
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight group-hover:text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1">
                    {project.description}
                  </p>
                </div>

                {/* Quick External Links */}
                <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-border bg-background hover:bg-muted active:translate-y-px text-foreground transition-all"
                      aria-label={`Visit ${project.title}`}
                    >
                      <Globe className="size-3.5" />
                      <span className="hidden sm:inline">Live</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-border bg-background hover:bg-muted active:translate-y-px text-foreground transition-all"
                    aria-label={`Source code for ${project.title}`}
                  >
                    <GithubLogo className="size-3.5" />
                    <span className="hidden sm:inline">Source</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>

              {/* Tech Stack Pills & Deep Dive Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/50">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono bg-muted/60 text-muted-foreground border border-border/50 hover:text-foreground hover:border-foreground/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.story || project.features) && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(project.slug)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground active:translate-y-px transition-all cursor-pointer py-1"
                  >
                    <span>{isExpanded ? "Hide specs" : "Deep dive"}</span>
                    {isExpanded ? (
                      <CaretUp className="size-3.5" />
                    ) : (
                      <CaretDown className="size-3.5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Expandable Deep Dive Drawer */}
            {isExpanded && (
              <div className="border-t border-border bg-muted/20 p-5 sm:p-6 space-y-5 animate-in fade-in-50 duration-200">
                {/* Full Description & Story */}
                {project.story && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      <Sparkle className="size-3.5 text-foreground/70" />
                      <span>Context & Origin</span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-5 border-l-2 border-border">
                      {project.story}
                    </p>
                  </div>
                )}

                {/* Key Technical Features */}
                {project.features && project.features.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      <TerminalWindow className="size-3.5 text-foreground/70" />
                      <span>Key Architectural Highlights</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                      {project.features.map((feature, fIndex) => (
                        <div
                          key={fIndex}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="size-3.5 text-foreground/60 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full Action Footer */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px transition-all"
                    >
                      <Globe className="size-4" />
                      <span>Launch Project</span>
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono border border-border bg-card hover:bg-muted active:translate-y-px text-foreground transition-all"
                  >
                    <GithubLogo className="size-4" />
                    <span>View Repository</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
