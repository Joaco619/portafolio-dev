import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { memo, useMemo } from 'react';

const ProjectCard = memo(({ project, index, prefersReducedMotion }) => (
    <motion.article
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
        whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.01 }}
        className="group relative p-7 rounded-2xl glass-card overflow-hidden
                   hover:shadow-2xl hover:shadow-[var(--color-accent)]/10 
                   transition-all duration-500 ease-out"
    >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-transparent" />
            <div 
                className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl -translate-y-20 translate-x-20 transition-all duration-700"
                style={{ background: `${project.accent}15` }}
            />
        </div>

        <div className="relative z-10">
            <div className="flex items-start justify-between mb-5">
                <motion.div
                    whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-xl
                               shadow-lg transition-all duration-500 group-hover:shadow-xl"
                    style={{
                        background: `linear-gradient(135deg, color-mix(in srgb, ${project.accent} 15%, transparent), color-mix(in srgb, ${project.accent} 5%, transparent))`,
                        color: project.accent,
                        boxShadow: `0 8px 16px color-mix(in srgb, ${project.accent} 15%, transparent)`
                    }}
                >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                    <i className={`${project.icon} relative z-10 drop-shadow-lg`} />
                </motion.div>

                <div className="flex items-center gap-4">
                    {project.github && (
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.15, y: -2 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] 
                                       transition-colors duration-300"
                            aria-label="GitHub"
                        >
                            <i className="fa-brands fa-github text-xl" />
                        </motion.a>
                    )}
                    {project.discord && (
                        <motion.a
                            href={project.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.15, y: -2 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                            className="text-[var(--color-text-muted)] hover:text-[#5865F2] 
                                       transition-colors duration-300"
                            aria-label="Discord"
                        >
                            <i className="fa-brands fa-discord text-xl" />
                        </motion.a>
                    )}
                    {project.live && (
                        <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.15, y: -2 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                            className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] 
                                       transition-colors duration-300"
                            aria-label="Live demo"
                        >
                            <i className="fa-solid fa-arrow-up-right-from-square text-base" />
                        </motion.a>
                    )}
                </div>
            </div>

            <h3 className="text-xl font-bold mb-3 text-[var(--color-text-primary)]
                           group-hover:text-[var(--color-accent)] transition-colors duration-300
                           tracking-tight leading-snug">
                {project.title}
            </h3>
            
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6 group-hover:text-[var(--color-text-primary)]/80 transition-colors duration-300">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag, tagIndex) => (
                    <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : tagIndex * 0.05 }}
                        className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg
                                   bg-[var(--color-surface)]/60 text-[var(--color-text-muted)]
                                   border border-[var(--color-border-subtle)]
                                   hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]
                                   transition-all duration-300 backdrop-blur-sm
                                   cursor-default select-none"
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 rounded-full
                        bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent
                        group-hover:w-full transition-all duration-700 ease-out" />
    </motion.article>
));

ProjectCard.displayName = 'ProjectCard';

export default function Proyectos() {
    const { t } = useLanguage();
    const prefersReducedMotion = useReducedMotion();

    const projectMetadata = useMemo(() => [
        {
            tags: ['React', 'TailwindCSS', 'Javascript', 'NodeJS'],
            live: 'https://lacost.consentt.uno/',
            discord: 'https://discord.com/invite/FthXVtr47r',
            icon: 'fa-solid fa-chart-line',
            accent: 'var(--color-green-500)',
        },
        {
            tags: ['HTML', 'CSS', 'JavaScript',],
            icon: 'fa-solid fa-brush',
            accent: 'var(--color-green-400)',
        },
        {
            tags: ['React', 'TypeScript', 'LocalStorage'],
            github: 'https://github.com/Joaco619',
            live: 'https://joaco619.github.io/task_manager/',
            icon: 'fa-solid fa-list-check',
            accent: 'var(--color-green-600)',
        },
        {
            tags: ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
            github: 'https://github.com/Joaco619',
            live: 'https://joaco619.github.io/portafolio-dev/',
            icon: 'fa-solid fa-laptop-code',
            accent: 'var(--color-green-300)',
        },
    ], []);

    const projects = useMemo(() => 
        t.projects.items.map((item, i) => ({
            ...item,
            ...projectMetadata[i],
        })),
    [t.projects.items, projectMetadata]);

    return (
        <section id="proyectos" className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,var(--color-accent)/0.03,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,var(--color-accent)/0.02,transparent_60%)]" />
            
            <div className="absolute top-1/3 right-10 w-80 h-80 bg-[var(--color-accent)]/[0.02] rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-[var(--color-accent)]/[0.015] rounded-full blur-3xl" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 text-sm font-mono text-[var(--color-accent)] mb-2
                                   font-bold tracking-wider block"
                    >
                        <i className="fa-solid fa-folder-open" />
                        {t.projects.label}
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        {t.projects.titleStart}{' '}
                        <span className="gradient-text inline-block relative">
                            {t.projects.titleHighlight}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r 
                                           from-[var(--color-accent)]/0 via-[var(--color-accent)] to-[var(--color-accent)]/0 rounded-full"
                                style={{ originX: 0.5 }}
                            />
                        </span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-5">
                    {projects.map((project, i) => (
                        <ProjectCard 
                            key={i} 
                            project={project} 
                            index={i}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <motion.a
                        href="https://github.com/Joaco619"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05, x: 5 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        className="inline-flex items-center gap-3 text-sm font-medium text-[var(--color-text-secondary)] 
                                   hover:text-[var(--color-accent)] transition-all duration-300"
                    >
                        {t.projects.viewMore}
                        <motion.i 
                            className="fa-solid fa-arrow-right text-xs"
                            animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
