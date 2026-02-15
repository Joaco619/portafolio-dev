import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Projects() {
    const { t } = useLanguage();

    const projectMetadata = [
        {
            tags: ['React', 'TailwindCSS', 'Chart.js', 'REST API'],
            github: 'https://github.com/Joaco619',
            live: '#',
            icon: 'fa-solid fa-chart-line',
            accent: 'var(--color-green-500)',
        },
        {
            tags: ['React', 'Framer Motion', 'API', 'Geolocation'],
            github: 'https://github.com/Joaco619',
            live: '#',
            icon: 'fa-solid fa-cloud-sun',
            accent: 'var(--color-green-400)',
        },
        {
            tags: ['React', 'TypeScript', 'DnD Kit', 'LocalStorage'],
            github: 'https://github.com/Joaco619',
            live: '#',
            icon: 'fa-solid fa-list-check',
            accent: 'var(--color-green-600)',
        },
        {
            tags: ['React', 'TailwindCSS', 'Framer Motion', 'Vite'],
            github: 'https://github.com/Joaco619',
            live: '#',
            icon: 'fa-solid fa-laptop-code',
            accent: 'var(--color-green-300)',
        },
    ];

    const projects = t.projects.items.map((item, i) => ({
        ...item,
        ...projectMetadata[i],
    }));

    return (
        <section id="projects" className="py-28 relative">
            <div className="max-w-6xl mx-auto px-6">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-sm font-mono text-[var(--color-accent)] mb-2 block">
                        <i className="fa-solid fa-folder-open mr-2" />{t.projects.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        {t.projects.titleStart} <span className="gradient-text">{t.projects.titleHighlight}</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-5">
                    {projects.map((project, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                            className="group relative p-6 rounded-2xl glass-card hover:border-[var(--color-accent)]/15 transition-all duration-300"
                        >
                            
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg"
                                    style={{
                                        background: `color-mix(in srgb, ${project.accent} 12%, transparent)`,
                                        color: project.accent,
                                    }}
                                >
                                    <i className={project.icon} />
                                </div>

                                <div className="flex items-center gap-3">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                                        aria-label="GitHub"
                                    >
                                        <i className="fa-brands fa-github text-lg" />
                                    </a>
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                                        aria-label="Live demo"
                                    >
                                        <i className="fa-solid fa-arrow-up-right-from-square text-sm" />
                                    </a>
                                </div>
                            </div>

                            
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5">
                                {project.description}
                            </p>

                            
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </div>

                
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://github.com/Joaco619"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
                    >
                        {t.projects.viewMore}
                        <i className="fa-solid fa-arrow-right text-xs" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
