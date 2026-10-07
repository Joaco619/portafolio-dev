import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Experiencia() {
    const { t } = useLanguage();

    const experienceMetadata = [
        {
            tags: ['React', 'TailwindCSS', 'JavaScript', 'NodeJS', 'HTML5', 'CSS3', 'Lua'],
            icon: 'fa-solid fa-laptop-code',
        },
        {
            tags: ['JavaScript', 'NodeJS'],
            icon: 'fa-solid fa-book-open',
        },
    ];

    const experiences = t.experience.items.map((item, i) => ({
        ...item,
        ...experienceMetadata[i],
    }));

    return (
        <section id="experiencia" className="py-28 relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-sm font-mono text-[var(--color-accent)] mb-2 block">
                        <i className="fa-solid fa-briefcase mr-2" />{t.experience.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        {t.experience.titleStart} <span className="gradient-text">{t.experience.titleHighlight}</span>
                    </h2>
                </motion.div>

                
                <div className="relative">
                    <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--color-accent)]/40 via-[var(--color-green-700)]/20 to-transparent" />
                    <div className="space-y-10">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="relative pl-14"
                            >
                                <div className="absolute left-0 top-1 w-10 h-10 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] flex items-center justify-center">
                                    <i className={`${exp.icon} text-sm text-[var(--color-accent)]`} />
                                </div>
                                <div className="p-5 rounded-xl glass-card hover:border-[var(--color-accent)]/15 transition-all duration-300">
                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                                                {exp.role}
                                            </h3>
                                            <p className="text-sm text-[var(--color-accent)]">{exp.company}</p>
                                        </div>
                                        <span className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-bg-primary)] px-3 py-1 rounded-md border border-[var(--color-border-subtle)]">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs font-mono px-2.5 py-1 rounded-md bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
