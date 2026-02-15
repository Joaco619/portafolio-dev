import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { language, toggleLanguage, t } = useLanguage();

    const navLinks = [
        { label: t.nav.home, href: '#hero' },
        { label: t.nav.about, href: '#about' },
        { label: t.nav.skills, href: '#skills' },
        { label: t.nav.projects, href: '#projects' },
        { label: t.nav.experience, href: '#experience' },
        { label: t.nav.contact, href: '#contact' },
    ];

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [navLinks]);

    const handleClick = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
                ? 'bg-[#0a0f0d]/80 backdrop-blur-xl border-[var(--color-border-subtle)] shadow-lg'
                : 'bg-[#0a0f0d]/0 border-transparent shadow-none'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                
                <a
                    href="#hero"
                    onClick={(e) => handleClick(e, '#hero')}
                    className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
                >
                    <span className="text-[var(--color-accent)]">&lt;</span>
                    JS
                    <span className="text-[var(--color-accent)]"> /&gt;</span>
                </a>

                
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                    ? 'text-[var(--color-accent)]'
                                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                    }`}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-indicator"
                                        className="absolute inset-0 rounded-lg bg-[var(--color-accent-dim)]"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        );
                    })}

                    
                    <button
                        onClick={toggleLanguage}
                        className="ml-2 px-3 py-1.5 rounded-lg border border-[var(--color-border-card)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all"
                        aria-label="Toggle language"
                    >
                        {language === 'es' ? 'EN' : 'ES'}
                    </button>
                </div>

                
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="px-2 py-1 rounded border border-[var(--color-border-card)] text-xs font-mono text-[var(--color-text-secondary)]"
                    >
                        {language === 'es' ? 'EN' : 'ES'}
                    </button>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="text-[var(--color-text-secondary)] hover:text-white transition-colors p-2"
                        aria-label="Toggle menu"
                    >
                        <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
                    </button>
                </div>
            </div>

            
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[var(--color-bg-secondary)]/95 backdrop-blur-xl border-b border-[var(--color-border-subtle)] overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.replace('#', '');
                                return (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={(e) => handleClick(e, link.href)}
                                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                            ? 'text-[var(--color-accent)] bg-[var(--color-accent-dim)]'
                                            : 'text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
