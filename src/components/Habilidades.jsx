import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { memo, useMemo } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.04 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
};

const SkillCard = memo(({ skill, prefersReducedMotion }) => (
    <motion.div
        variants={cardVariants}
        whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.03 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        className="group relative flex flex-col items-center gap-3 p-5 rounded-xl glass-card cursor-default
                   hover:border-[var(--color-accent)]/30 transition-all duration-300 overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/0 via-[var(--color-accent)]/0 to-[var(--color-accent)]/0
                        group-hover:from-[var(--color-accent)]/5 group-hover:via-transparent group-hover:to-transparent
                        transition-all duration-500 opacity-0 group-hover:opacity-100" />

        <div className="relative w-12 h-12 rounded-full bg-[var(--color-surface)]/50 flex items-center justify-center
                        group-hover:bg-[var(--color-surface)]/80 transition-all duration-300">
            {skill.icon.startsWith('/') || skill.icon.endsWith('.png') ? (
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-1/2 h-1/2 object-contain transition-all duration-300 group-hover:scale-110"
                />
            ) : (
                <i
                    className={`${skill.icon} text-2xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-6`}
                    style={{ color: skill.color }}
                />
            )}
        </div>

        <span className="relative text-xs font-semibold text-[var(--color-text-secondary)] 
                         group-hover:text-[var(--color-text-primary)] transition-colors duration-300 text-center">
            {skill.name}
        </span>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent
                        group-hover:w-full transition-all duration-500" />
    </motion.div>
));

SkillCard.displayName = 'SkillCard';

const SkillCategory = memo(({ category, index, prefersReducedMotion }) => {
    const { title, icon, skills } = category;

    return (
        <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : index * 0.08 }}
        >
            <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-dim)] to-[var(--color-accent-dim)]/50 
                                flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/10">
                    <i className={`${icon} text-base text-[var(--color-accent)]`} />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                    {title}
                </h3>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-[var(--color-border-subtle)] to-transparent" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                {skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} prefersReducedMotion={prefersReducedMotion} />
                ))}
            </motion.div>
        </motion.div>
    );
});

SkillCategory.displayName = 'SkillCategory';

export default function Habilidades() {
    const { t } = useLanguage();
    const prefersReducedMotion = useReducedMotion();

    const categories = useMemo(() => [
        {
            title: t.skills.categories.frontend,
            icon: 'fa-solid fa-code',
            skills: [
                { name: 'React', icon: 'fa-brands fa-react', color: '#61DAFB' },
                { name: 'JavaScript', icon: 'fa-brands fa-js', color: '#F7DF1E' },
                { name: 'Discord.js', icon: './discordjs.png', color: '#06B6D4' },
                { name: 'HTML5', icon: 'fa-brands fa-html5', color: '#E34F26' },
                { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572B6' },
                { name: 'TailwindCSS', icon: './Tailwind_CSS.png', color: '#06B6D4' },
                { name: 'MongoDB', icon: 'fa-solid fa-leaf', color: '#47A248' },
            ],
        },
        {
            title: t.skills.categories.tools,
            icon: 'fa-solid fa-wrench',
            skills: [
                { name: 'Git', icon: 'fa-brands fa-git-alt', color: '#F05032' },
                { name: 'GitHub', icon: 'fa-brands fa-github', color: '#ffffff' },
                { name: 'npm', icon: 'fa-brands fa-npm', color: '#CB3837' },
            ],
        },
        {
            title: t.skills.categories.learning,
            icon: 'fa-solid fa-graduation-cap',
            skills: [
                { name: 'Next.js', icon: './nextjs.png', color: '#ffffff' },
                { name: 'Python', icon: 'fa-brands fa-python', color: '#3776AB' },
                { name: 'Lua', icon: './lua.png', color: '#000080' },
            ],
        },
    ], [t.skills.categories]);

    return (
        <section id="habilidades" className="py-28 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent)]/[0.02] to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-sm font-mono text-[var(--color-accent)] mb-2 block font-semibold">
                        <i className="fa-solid fa-layer-group mr-2" />{t.skills.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        {t.skills.titleStart}{' '}
                        <span className="gradient-text inline-block relative">
                            {t.skills.titleHighlight}
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

                <div className="space-y-12">
                    {categories.map((category, index) => (
                        <SkillCategory
                            key={category.title}
                            category={category}
                            index={index}
                            prefersReducedMotion={prefersReducedMotion}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
