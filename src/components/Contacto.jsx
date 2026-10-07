import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import emailjs from '@emailjs/browser';

export default function Contacto() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);
    const { t } = useLanguage();

    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    to_email: import.meta.env.VITE_CONTACT_EMAIL,
                    message: formData.message,
                }
            );

            if (response.status === 200) {
                setStatus({ type: 'success', message: t.language === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: t.language === 'es' ? 'Error al enviar el mensaje.' : 'Error sending message.' });
            }
        } catch (error) {
            console.error('Contact error:', error);
            setStatus({ type: 'error', message: t.language === 'es' ? 'Error al enviar el mensaje.' : 'Error sending message.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contacto" className="py-28 relative">
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

                <div>
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl mx-auto p-6 rounded-2xl glass-card space-y-5"
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
