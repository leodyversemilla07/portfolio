import { useState } from 'react';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
}

interface Props {
  projects: Project[];
  githubUrl: string;
}

export function WorkFilter({ projects, githubUrl }: Props) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tech)));
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? projects.filter((p) => p.tech.includes(active)) : projects;

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Filter tags */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={cn(
            'text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors duration-150',
            active === null
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-emerald-400'
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(active === tag ? null : tag)}
            className={cn(
              'text-xs font-mono px-3 py-1.5 rounded-sm border transition-colors duration-150',
              active === tag
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-emerald-400'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project list */}
      {filtered.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">No projects match this filter.</p>
      ) : (
        filtered.map((project) => (
          <div key={project.title} className="group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:opacity-100">
                <a
                  href={project.github}
                  className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github size={18} />
                </a>
                <a
                  href={project.link}
                  className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
                  aria-label={`Visit ${project.title} live project`}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3 sm:mb-4 max-w-2xl">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(active === t ? null : t)}
                  className={cn(
                    'text-xs font-mono px-2 py-1 rounded-sm transition-colors duration-150',
                    active === t
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))
      )}

      <div className="mt-10 sm:mt-12">
        <a
          href={githubUrl}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors border-b border-transparent hover:border-neutral-500"
        >
          View Full Project Archive <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
