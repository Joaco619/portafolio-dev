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
            className={`fixed z-50 transition-all duration-300 border-r left-0 top-0 right-0 md:bottom-0 md:w-56 md:h-screen md:right-auto ${scrolled
                ? 'backdrop-blur-xl border-[var(--color-border-subtle)] shadow-lg'
                : 'border-transparent shadow-none'
                } bg-transparent`}
        >
            <div className="flex items-center justify-between md:flex-col md:items-start md:justify-start md:py-6 md:px-4 h-16 md:h-full">
                
                <a
                    href="#hero"
                    onClick={(e) => handleClick(e, '#hero')}
                    className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity md:mb-6 md:px-2"
                >
                    <span className="text-[var(--color-accent)]">&lt;</span>
                    JS
                    <span className="text-[var(--color-accent)]"> /&gt;</span>
                </a>

                
                <div className="hidden md:flex md:flex-col md:items-start md:gap-2 md:w-full md:px-2">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={`relative w-full block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
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
                        className="mt-3 px-3 py-1.5 rounded-lg border border-[var(--color-border-card)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 transition-all md:ml-0"
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
                        className="md:hidden bg-transparent backdrop-blur-none border-b border-transparent overflow-hidden"
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
