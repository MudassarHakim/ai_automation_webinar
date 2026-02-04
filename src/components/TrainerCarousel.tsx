"use client";

import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

interface TrainerCarouselProps {
    items: Array<{
        type: 'image' | 'credential' | 'stat';
        content: string | string[];
        label?: string;
    }>;
}

export function TrainerCarousel({ items }: TrainerCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setTimeout(() => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent(current + 1);
            }
        }, 2500); // 2.5s per slide for better readability
    }, [api, current]);

    return (
        <div className="w-full">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {items.map((item, index) => (
                        <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4" key={index}>
                            <div className="flex flex-col items-center justify-center p-4 h-[180px] bg-slate-800/50 border border-white/5 rounded-2xl backdrop-blur-sm hover:bg-slate-800/80 transition-all select-none">
                                {item.type === 'image' && (
                                    <img
                                        src={item.content as string}
                                        alt={item.label}
                                        className="h-full w-auto object-contain rounded-xl max-h-[140px]"
                                    />
                                )}

                                {item.type === 'credential' && Array.isArray(item.content) && (
                                    <div className="flex gap-4 items-center justify-center h-full">
                                        {item.content.map((src, i) => (
                                            <img key={i} src={src} alt="Credential" className="h-16 w-auto object-contain" />
                                        ))}
                                    </div>
                                )}

                                {item.type === 'stat' && (
                                    <div className="flex flex-col items-center justify-center h-full gap-2">
                                        <img src={item.content as string} alt={item.label} className="h-16 w-auto object-contain" />
                                        <span className="text-gray-400 text-sm font-medium">{item.label}</span>
                                    </div>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};
