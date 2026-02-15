import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            
            <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[var(--color-accent-light)] opacity-[0.06] blur-[100px] pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border border-[var(--color-accent)]/20 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm text-[var(--color-accent)] font-medium font-mono">
                        {t.hero.badge}
                    </span>
                </motion.div>

                
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4"
                >
                    {t.hero.greeting}{' '}
                    <span className="gradient-text">Joaquin</span>
                </motion.h1>

                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl sm:text-2xl md:text-3xl font-mono text-[var(--color-text-secondary)] mb-8 h-10"
                >
                    <span>{text}</span>
                    <span className="inline-block w-[3px] h-7 ml-1 bg-[var(--color-accent)] animate-pulse align-middle" />
                </motion.div>

                
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {t.hero.descriptionStart} <em className="text-[var(--color-text-primary)] not-italic font-medium">{t.hero.descriptionEmphasis}</em> {t.hero.descriptionEnd}
                </motion.p>

                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-sm hover:brightness-110 transition-all duration-200 hover:shadow-[0_0_24px_rgba(23,201,100,0.3)]"
                    >
                        <i className="fa-solid fa-rocket" />
                        {t.hero.ctaProjects}
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-border-card)] text-[var(--color-text-primary)] font-semibold text-sm hover:bg-white/5 transition-all duration-200"
                    >
                        <i className="fa-solid fa-envelope" />
                        {t.hero.ctaContact}
                    </a>
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex items-center justify-center gap-5"
                >
                    {[
                        { icon: 'fa-brands fa-github', href: 'https://github.com/Joaco619', label: 'GitHub' },
                        { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/joaquin-sposato-7464873b1/', label: 'LinkedIn' },
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-all duration-200"
                        >
                            <i className={`${social.icon} text-lg`} />
                        </a>
                    ))}
                </motion.div>

                
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
                    >
                        <span className="text-xs font-mono">{t.hero.scroll}</span>
                        <i className="fa-solid fa-chevron-down text-xs" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
