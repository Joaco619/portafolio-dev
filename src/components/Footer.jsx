import { useLanguage } from '../i18n/LanguageContext';

export default function Footer() {
    const year = new Date().getFullYear();
    const { t } = useLanguage();

    return (
        <footer className="border-t border-[var(--color-border-subtle)] bg-transparent">
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                        <span className="font-mono text-[var(--color-accent)]">&lt;/&gt;</span>
                        <span>
                            {t.footer.credit}{' '}
                            <span className="text-[var(--color-text-secondary)]">Joaquin Sposato</span>
                        </span>
                    </div>

                    
                    <div className="text-xs text-[var(--color-text-muted)] font-mono">
                        © {year} — {t.footer.rights}
                    </div>

                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            {[
                                { icon: 'fa-brands fa-github', href: 'https://github.com/Joaco619' },
                                { icon: 'fa-brands fa-linkedin-in', href: 'https://www.linkedin.com/in/joaquin-sposato-7464873b1/' },
                                { icon: 'fa-brands fa-instagram', href: 'https://www.instagram.com/jjoaccooss/' },
                            ].map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-md flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-all duration-200 text-sm"
                                >
                                    <i className={s.icon} />
                                </a>
                            ))}
                        </div>

                        <div className="w-px h-4 bg-[var(--color-border-subtle)]" />

                        <a
                            href="#hero"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
                        >
                            <i className="fa-solid fa-arrow-up text-[10px]" />
                            {t.footer.backToTop}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
