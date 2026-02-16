import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const roles = [
    'Frontend Developer',
    'React Specialist',
    'UI Engineer',
    'Web Developer',
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const { t } = useLanguage();
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting && text === currentRole) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
            timeout = setTimeout(() => {
                setText(
                    isDeleting
                        ? currentRole.substring(0, text.length - 1)
                        : currentRole.substring(0, text.length + 1)
                );
            }, isDeleting ? 40 : 80);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, roleIndex]);

    const handleSmoothScroll = useCallback((e, targetId) => {
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const socialLinks = useMemo(() => [
        { icon: 'fa-brands fa-github', href: 'https://github.com/Joaco619', label: 'GitHub' },
        { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/joaquin-sposato-7464873b1/', label: 'LinkedIn' },
    ], []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-accent)/0.05,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,var(--color-accent)/0.03,transparent_60%)]" />
            
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.06] blur-[120px] pointer-events-none animate-pulse-slow" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[var(--color-accent-light)] opacity-[0.04] blur-[140px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }} />

            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[var(--color-accent)] animate-float" style={{ animationDelay: '0s' }} />
                <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-float" style={{ animationDelay: '1.5s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-[var(--color-accent)] animate-float" style={{ animationDelay: '3s' }} />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: prefersReducedMotion ? 1 : 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full 
                               bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent)]/5 
                               border border-[var(--color-accent)]/30 mb-8
                               backdrop-blur-sm shadow-lg shadow-[var(--color-accent)]/5"
                >
                    <span className="relative">
                        <span className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-400 animate-ping opacity-75" />
                        <span className="relative block w-2.5 h-2.5 rounded-full bg-green-400" />
                    </span>
                    <span className="text-sm text-[var(--color-accent)] font-bold font-mono tracking-wide">
                        {t.hero.badge}
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4"
                >
                    {t.hero.greeting}{' '}
                    <span className="gradient-text inline-block relative">
                        Joaquín
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r 
                                       from-[var(--color-accent)]/0 via-[var(--color-accent)] to-[var(--color-accent)]/0 
                                       rounded-full blur-sm"
                            style={{ originX: 0.5 }}
                        />
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xl sm:text-2xl md:text-3xl font-mono text-[var(--color-text-secondary)] mb-8 h-10 flex items-center justify-center"
                >
                    <span className="font-semibold">{text}</span>
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="inline-block w-[3px] h-7 ml-1 bg-[var(--color-accent)] align-middle rounded-full"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {t.hero.descriptionStart}{' '}
                    <span className="text-[var(--color-text-primary)] font-bold relative inline-block">
                        {t.hero.descriptionEmphasis}
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)]/40 rounded-full" />
                    </span>{' '}
                    {t.hero.descriptionEnd}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-16"
                >
                    <motion.a
                        href="#projects"
                        onClick={(e) => handleSmoothScroll(e, '#projects')}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                                   bg-[var(--color-accent)] text-[var(--color-bg-primary)] 
                                   font-semibold text-sm
                                   shadow-xl shadow-[var(--color-accent)]/30
                                   hover:shadow-2xl hover:shadow-[var(--color-accent)]/40
                                   transition-all duration-300"
                    >
                        <i className="fa-solid fa-rocket" />
                        {t.hero.ctaProjects}
                    </motion.a>
                    <motion.a
                        href="#contact"
                        onClick={(e) => handleSmoothScroll(e, '#contact')}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                                   border border-[var(--color-border-card)] text-[var(--color-text-primary)] 
                                   font-semibold text-sm backdrop-blur-sm
                                   hover:bg-[var(--color-surface)]/40 hover:border-[var(--color-accent)]/40
                                   transition-all duration-300"
                    >
                        <i className="fa-solid fa-envelope" />
                        {t.hero.ctaContact}
                    </motion.a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center gap-5 mb-20"
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.15, y: -3 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                            className="w-10 h-10 rounded-lg flex items-center justify-center 
                                       text-[var(--color-text-muted)] 
                                       bg-[var(--color-surface)]/40 backdrop-blur-sm
                                       border border-[var(--color-border-subtle)]
                                       hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 
                                       hover:border-[var(--color-accent)]/40
                                       hover:shadow-lg hover:shadow-[var(--color-accent)]/20
                                       transition-all duration-300"
                        >
                            <i className={`${social.icon} text-lg`} />
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex flex-col items-center"
                >
                    <motion.div
                        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-3 text-[var(--color-text-muted)]"
                    >
                        <span className="text-xs font-mono tracking-wide">{t.hero.scroll}</span>
                        <motion.i 
                            className="fa-solid fa-chevron-down text-base"
                            animate={prefersReducedMotion ? {} : { 
                                y: [0, 4, 0],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 1.5, 
                                ease: 'easeInOut'
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.06; transform: scale(1); }
                    50% { opacity: 0.04; transform: scale(1.05); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); opacity: 0.2; }
                    50% { transform: translateY(-20px); opacity: 0.4; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s ease-in-out infinite;
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
}