import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import CountUp from './CountUp';


export default function SobreMi() {
    const { t } = useLanguage();

    const stats = [
        { value: 3, label: t.about.stats.years, suffix: '+' },
        { value: 6, label: t.about.stats.projects, suffix: '+' },
        { value: 10, label: t.about.stats.technologies, suffix: '+' },
    ];


    return (
        <section id="sobre-mi" className="py-28 relative overflow-hidden">

            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

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
                            {t.about.bio2Start} <span className="text-[var(--color-accent)] font-medium">{t.about.bio2Highlight}</span> {t.about.bio2End}
                        </p>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">
                            {t.about.bio3}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4">
                            {t.about.tagCloud.map((tech, idx) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    className="px-3 py-1.5 text-xs font-mono rounded-md bg-[var(--color-bg-card)] border border-[var(--color-border-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text-primary)] transition-all duration-300 cursor-default"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>




                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 flex justify-center items-center"
                        style={{ perspective: 1000 }}
                    >
                        <Card3D profileImage="./jjoaccoo.png" />
                    </motion.div>
                </div>


                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="text-center p-6 rounded-xl glass-card hover:border-[var(--color-accent)]/30 transition-all duration-300 group"
                        >
                            <div className="text-3xl sm:text-4xl font-bold mb-2">
                                <CountUp
                                    from={0}
                                    to={stat.value}
                                    separator="," 
                                    direction="up"
                                    duration={1}
                                    className="gradient-text inline-block"
                                    startCounting
                                />
                                {stat.suffix && (
                                    <span className="gradient-text inline-block ml-1">{stat.suffix}</span>
                                )}
                            </div>
                            <div className="text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-colors duration-300">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function Card3D({ profileImage }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const sheenGradient = useTransform(
        mouseX,
        [-0.5, 0.5],
        [
            "linear-gradient(115deg, transparent, transparent, rgba(255, 255, 255, 0) 0%)",
            "linear-gradient(115deg, transparent, transparent, rgba(255, 255, 255, 0.1) 100%)"
        ]
    );

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl cursor-default"
        >
            <div
                className="absolute inset-4 rounded-2xl bg-[var(--color-accent)]/20 blur-xl transform translate-z-[-50px]"
                style={{ transform: "translateZ(-50px)" }}
            />

            <div
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--color-border-card)] bg-black/80"
                style={{ transform: "translateZ(20px)" }}
            >
                <div className="absolute inset-0 p-2 select-none pointer-events-none overflow-hidden">
                    <p className="font-mono text-[10px] leading-[1.1] text-green-500 break-words whitespace-pre-wrap opacity-50">
                        {`const developer = {
    name: 'Joaco',
    skills: ['React', 'Node'],
    status: 'Coding...',
    mood: 'Coffee',
    level: 9000
};
function init() {
    console.log('Hello');
    return true;
}
if(ready) launch();
01010101010101
10101010101010
byte stream...
encryption: on
secure_mode: true
// Access granted
`}
                        {Array(10).fill("01 function return 10 11 void null ").join(" ")}
                    </p>
                </div>

                <img
                    src={profileImage}
                    alt="Foto de perfil 3D"
                    className="w-full h-full object-cover relative z-10"
                />

                {/* Capa de brillo/reflejo */}
                <motion.div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{ background: sheenGradient }}
                />
            </div>

            {/* Elementos flotantes decorativos */}
            <motion.div
                className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-md border border-white/10 z-20 flex items-center justify-center text-2xl"
                style={{ transform: "translateZ(60px)" }}
            >
                🚀
            </motion.div>
        </motion.div>
    );
}
