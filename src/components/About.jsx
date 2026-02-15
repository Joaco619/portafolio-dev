import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function About() {
    const { t } = useLanguage();

    const stats = [
        { value: '3+', label: t.about.stats.years },
        { value: '15+', label: t.about.stats.projects },
        { value: '10+', label: t.about.stats.technologies },
    ];

    return (
        <section id="about" className="py-28 relative">
            <div className="max-w-6xl mx-auto px-6">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-sm font-mono text-[var(--color-accent)] mb-2 block">
                        <i className="fa-solid fa-user mr-2" />{t.about.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        {t.about.titleStart} <span className="gradient-text">{t.about.titleHighlight}</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-3 space-y-5"
                    >
                        <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
                            {t.about.bio1Start} <span className="text-[var(--color-text-primary)] font-medium">{t.about.bio1name}</span>{t.about.bio1end}
                        </p>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
                            {t.about.bio2Start} <span className="text-[var(--color-accent)]">{t.about.bio2Highlight}</span> {t.about.bio2End}
                        </p>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
                            {t.about.bio3}
                        </p>

                        
                        <div className="flex flex-wrap gap-2 pt-4">
                            {t.about.tagCloud.map(
                                (tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-xs font-mono rounded-md bg-[var(--color-bg-card)] border border-[var(--color-border-card)] text-[var(--color-text-secondary)]"
                                    >
                                        {tech}
                                    </span>
                                )
                            )}
                        </div>
                    </motion.div>

                    
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 flex justify-center"
                    >
                        <div className="relative group">
                            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden animated-border">
                                <div className="w-full h-full bg-gradient-to-br from-[var(--color-accent-dim)] to-[rgba(14,121,60,0.2)] flex items-center justify-center">
                                    <span className="text-6xl font-bold gradient-text">JS</span>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-[var(--color-accent)]/20 -z-10" />
                        </div>
                    </motion.div>
                </div>

                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-3 gap-6 mt-20"
                >
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="text-center p-6 rounded-xl glass-card hover:border-[var(--color-accent)]/20 transition-all duration-300"
                        >
                            <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)]">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
