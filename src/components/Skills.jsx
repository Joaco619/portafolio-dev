import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
};

export default function Skills() {
    const { t } = useLanguage();

    const categories = [
        {
            title: t.skills.categories.frontend,
            icon: 'fa-solid fa-code',
            skills: [
                { name: 'React', icon: 'fa-brands fa-react', color: '#61DAFB' },
                { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#F7DF1E' },
                { name: 'TypeScript', icon: 'fa-solid fa-code', color: '#3178C6' },
                { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#E34F26' },
                { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572B6' },
                { name: 'TailwindCSS', icon: 'fa-solid fa-wind', color: '#06B6D4' },
            ],
        },
        {
            title: t.skills.categories.tools,
            icon: 'fa-solid fa-wrench',
            skills: [
                { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#F05032' },
                { name: 'GitHub', icon: 'fa-brands fa-github', color: '#ffffff' },
                { name: 'VS Code', icon: 'fa-solid fa-laptop-code', color: '#007ACC' },
                { name: 'Figma', icon: 'fa-brands fa-figma', color: '#F24E1E' },
                { name: 'npm', icon: 'fa-brands fa-npm', color: '#CB3837' },
                { name: 'Vite', icon: 'fa-solid fa-bolt', color: '#646CFF' },
            ],
        },
        {
            title: t.skills.categories.learning,
            icon: 'fa-solid fa-graduation-cap',
            skills: [
                { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#339933' },
                { name: 'Next.js', icon: 'fa-solid fa-n', color: '#ffffff' },
                { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB' },
                { name: 'Docker', icon: 'fa-brands fa-docker', color: '#2496ED' },
            ],
        },
    ];

    return (
        <section id="skills" className="py-28 relative">
            <div className="max-w-6xl mx-auto px-6">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <span className="text-sm font-mono text-[var(--color-accent)] mb-2 block">
                        <i className="fa-solid fa-layer-group mr-2" />{t.skills.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        {t.skills.titleStart} <span className="gradient-text">{t.skills.titleHighlight}</span>
                    </h2>
                </motion.div>

                <div className="space-y-12">
                    {categories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center">
                                    <i className={`${cat.icon} text-sm text-[var(--color-accent)]`} />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{cat.title}</h3>
                                <div className="flex-1 h-px bg-[var(--color-border-subtle)]" />
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
                            >
                                {cat.skills.map((skill) => (
                                    <motion.div
                                        key={skill.name}
                                        variants={cardVariants}
                                        whileHover={{ y: -4, scale: 1.02 }}
                                        className="group flex flex-col items-center gap-3 p-4 rounded-xl glass-card cursor-default
                      hover:border-[var(--color-accent)]/20 transition-all duration-300"
                                    >
                                        <i
                                            className={`${skill.icon} text-2xl transition-all duration-300 group-hover:scale-110`}
                                            style={{ color: skill.color }}
                                        />
                                        <span className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
