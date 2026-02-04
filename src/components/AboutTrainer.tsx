import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const stats = [
    { label: 'Experience', value: '18+ Years', icon: Award },
    { label: 'Credentials', value: '', images: ['/images/aws-certified.png', '/images/pmp-certified.png'] },
    { label: 'Alumni Status', value: '', image: '/images/iiitb-alumni.png' },
    { label: 'Expertise', value: '', image: '/images/gemini-certified-2.png' },
];

export const AboutTrainer = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative max-w-sm mx-auto lg:max-w-none lg:mx-0 lg:w-[85%]"
                    >
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Placeholder background */}
                            {/* Note: Replace src with actual image if available, else user can upload */}
                            <img
                                src="/images/trainer-new.png"
                                alt="Mudassar Hakim"
                                className="object-cover w-full h-full relative z-10 transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-blue-900', 'to-slate-900');
                                }}
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-20" />

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 z-30 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl">
                                <p className="text-white font-medium text-sm">Amazon, Delhivery, WesternUnion</p>
                            </div>
                        </div>

                        {/* Decorative background shape */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full border border-blue-500/20 rounded-3xl" />
                    </motion.div>

                    {/* Right Column: Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                About the Trainer
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                Mudassar Hakim
                            </h2>

                            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
                                <p>
                                    I don't just teach theory—I decode the DNA of scalable systems and high-impact leadership. With 18+ years building at giants like <strong>Amazon, Delhivery, and Western Union</strong>, I've seen exactly what keeps engineers stuck and what catapults them to leadership.
                                </p>
                                <p>
                                    My mission is simple: <strong>Help you escape tutorial hell and start building systems that actually ship.</strong> Whether it's mastering System Design or navigating Engineering Management, I'll show you how the top 1% operate.
                                </p>
                            </div>
                        </motion.div>

                        {/* Key Data Points (Staggered Grid) */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat: any, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-slate-800/50 border border-white/5 p-4 rounded-2xl hover:bg-slate-800/80 transition-colors group flex flex-col items-center justify-center text-center h-[140px]"
                                >
                                    {stat.images ? (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="flex items-center gap-3 mb-2">
                                                {stat.images.map((img: string, i: number) => (
                                                    <img
                                                        key={i}
                                                        src={img}
                                                        alt={stat.label}
                                                        className="w-auto h-10 object-contain"
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                                        </div>
                                    ) : stat.image ? (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <img
                                                src={stat.image}
                                                alt={stat.label}
                                                className="w-auto h-12 object-contain mb-2"
                                            />
                                            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="bg-blue-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
                                                {stat.icon && <stat.icon className="w-5 h-5 text-blue-400" />}
                                            </div>
                                            <div className="text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">{stat.value}</div>
                                            <div className="text-sm text-gray-400">{stat.label}</div>
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
