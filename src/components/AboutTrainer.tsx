import { TrainerCarousel } from './TrainerCarousel';

const items = [
    { type: 'image', content: '/images/trainer-new.png', label: 'Mudassar Hakim' },
    { type: 'stat', content: '/images/aws-certified.png', label: 'AWS Architect' },
    { type: 'stat', content: '/images/pmp-certified.png', label: 'PMP Certified' },
    { type: 'stat', content: '/images/iiitb-alumni.png', label: 'IIITB Alumni' },
    { type: 'stat', content: '/images/gemini-certified-2.png', label: 'Gemini Expert' },
    // Repeat for infinite feel since we only have 4
    { type: 'image', content: '/images/trainer-new.png', label: 'Mudassar Hakim' },
    { type: 'stat', content: '/images/aws-certified.png', label: 'AWS Architect' },
    { type: 'stat', content: '/images/pmp-certified.png', label: 'PMP Certified' },
    { type: 'stat', content: '/images/iiitb-alumni.png', label: 'IIITB Alumni' },
    { type: 'stat', content: '/images/gemini-certified-2.png', label: 'Gemini Expert' },
] as const;

export const AboutTrainer = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-indigo-900/10 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header Text */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        About the Trainer
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                        Stop Learning. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Start Building.</span>
                    </h2>

                    <p className="text-xl text-gray-300 leading-relaxed">
                        With <strong>18+ years</strong> scaling tech at giants like <strong>Amazon, Delhivery, and Western Union</strong>, I decode the DNA of high-impact engineering. No fluff—just the systems, strategies, and mindset used by the top 1%.
                    </p>
                </div>

                {/* Carousel Section */}
                <div className="relative">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

                    <TrainerCarousel items={items as any} />
                </div>

            </div>
        </section>
    );
};
