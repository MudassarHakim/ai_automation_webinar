import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

const NOTIFICATIONS = [
    { name: "Mohammad Mushahid Hussain", location: "Karnataka, India", time: "Just now" },
    { name: "Tania Mitra", location: "West Bengal, India", time: "2 minutes ago" },
    { name: "Barkha", location: "Karnataka, India", time: "12 minutes ago" },
    { name: "Bhavana Rajula", location: "Maharashtra, India", time: "28 minutes ago" },
    { name: "Pritisoni", location: "Bihar, India", time: "45 minutes ago" },
    { name: "Rahul Sharma", location: "Delhi, India", time: "1 hour ago" }
];

export const SocialProofPopup = () => {
    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const runCycle = () => {
            // Show notification
            setIsVisible(true);

            // Hide after 6 seconds
            timeout = setTimeout(() => {
                setIsVisible(false);

                // Wait 4 seconds, then update index and show next
                timeout = setTimeout(() => {
                    setIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
                    runCycle();
                }, 4000);
            }, 6000);
        };

        // Initial start delay
        timeout = setTimeout(runCycle, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const currentItem = NOTIFICATIONS[index];

    return (
        <div className="fixed top-4 right-0 left-0 md:left-auto md:right-4 z-[80] flex justify-center md:justify-end pointer-events-none p-4 md:p-0">
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="pointer-events-auto flex items-center gap-4 bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-blue-900/20 rounded-2xl p-4 pr-6 max-w-[340px] md:max-w-sm w-full"
                    >
                        {/* Icon Container */}
                        <div className="relative flex-shrink-0">
                            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 rounded-full" />
                            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center border border-white/20 shadow-inner">
                                <Flame className="w-6 h-6 text-white fill-blue-200" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col min-w-0">
                            <div className="flex items-baseline gap-2 mb-0.5">
                                <span className="text-sm font-bold text-white truncate">
                                    {currentItem.name}
                                </span>
                                <span className="text-[10px] text-gray-400 truncate">
                                    {currentItem.location}
                                </span>
                            </div>
                            <p className="text-xs text-blue-200 font-medium mb-1">
                                Registered for the Masterclass
                            </p>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
                                    {currentItem.time}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
