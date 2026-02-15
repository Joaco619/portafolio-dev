import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const { t } = useLanguage();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: t.language === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: data.message || (t.language === 'es' ? 'Error al enviar el mensaje.' : 'Error sending message.') });
            }
        } catch (error) {
            console.error('Contact error:', error);
            setStatus({ type: 'error', message: t.language === 'es' ? 'Error de conexión con el servidor.' : 'Server connection error.' });
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: 'fa-solid fa-envelope',
            label: 'Email',
            value: 'joaquinsposatogarcia656@gmail.com',
            href: 'mailto:joaquinsposatogarcia656@gmail.com',
        },
        {
            icon: 'fa-brands fa-github',
            label: 'GitHub',
            value: '@Joaco619',
            href: 'https://github.com/Joaco619',
        },
        {
            icon: 'fa-brands fa-linkedin-in',
            label: 'LinkedIn',
            value: 'Joaquin Sposato',
            href: 'https://www.linkedin.com/in/joaquin-sposato-7464873b1/',
        },
    ];

    return (
        <section id="contact" className="py-28 relative">
            <div className="max-w-6xl mx-auto px-6">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <span className="text-sm font-mono text-[var(--color-accent)] mb-2 block">
                        <i className="fa-solid fa-paper-plane mr-2" />{t.contact.label}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        {t.contact.titleStart} <span className="gradient-text">{t.contact.titleHighlight}</span> {t.contact.titleEnd}
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
                        {t.contact.subtitle}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10">
                    
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        {contactInfo.map((info) => (
                            <a
                                key={info.label}
                                href={info.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 rounded-xl glass-card hover:border-[var(--color-accent)]/20 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                                    <i className={`${info.icon} text-[var(--color-accent)]`} />
                                </div>
                                <div>
                                    <div className="text-xs text-[var(--color-text-muted)] mb-0.5">{info.label}</div>
                                    <div className="text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                                        {info.value}
                                    </div>
                                </div>
                            </a>
                        ))}

                        <div className="pt-4">
                            <p className="text-xs text-[var(--color-text-muted)] mb-3 font-mono">{t.contact.socialLabel}</p>
                            <div className="flex gap-3">
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
                                        className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/20 transition-all duration-200"
                                    >
                                        <i className={`${s.icon}`} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-3 p-6 rounded-2xl glass-card space-y-5"
                    >
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-xs font-mono text-[var(--color-text-muted)] mb-2">
                                    {t.contact.form.name}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-card)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]/40 focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all"
                                    placeholder={t.contact.form.namePlaceholder}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-mono text-[var(--color-text-muted)] mb-2">
                                    {t.contact.form.email}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-card)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]/40 focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all"
                                    placeholder={t.contact.form.emailPlaceholder}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs font-mono text-[var(--color-text-muted)] mb-2">
                                {t.contact.form.message}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--color-bg-primary)] border border-[var(--color-border-card)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]/40 focus:ring-1 focus:ring-[var(--color-accent)]/20 transition-all resize-none"
                                placeholder={t.contact.form.messagePlaceholder}
                            />
                        </div>

                        {status.message && (
                            <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                <i className={`fa-solid ${status.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} mr-2`} />
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-sm hover:brightness-110 transition-all duration-200 hover:shadow-[0_0_24px_rgba(23,201,100,0.3)] flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''
                                }`}
                        >
                            <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} />
                            {loading ? (t.language === 'es' ? 'Enviando...' : 'Sending...') : t.contact.form.submit}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}