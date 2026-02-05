"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { Zap } from "lucide-react";
import { useRef } from "react";

export default function AboutSection2() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.5,
        duration: 0.8,
        ease: "easeOut"
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 20,
      opacity: 0,
    },
  };
  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.4,
        duration: 0.6,
        ease: "backOut"
      },
    }),
    hidden: {
      filter: "blur(8px)",
      opacity: 0,
      scale: 0.9
    },
  };
  return (
    <section className="pt-12 pb-24 px-4 bg-slate-950 min-h-[60vh] text-white">
      <div className="max-w-6xl mx-auto" ref={heroRef}>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Right side - Content */}
          <div className="flex-1">
            <TimelineContent
              as="h1"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="sm:text-4xl text-2xl md:text-5xl !leading-[110%] font-semibold text-white mb-8"
            >
              With{" "}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-blue-400 border-2 border-blue-500 inline-block xl:h-16  border-dotted px-2 rounded-md"
              >
                17+ years
              </TimelineContent>{" "}
              scaling tech at giants like{" "}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-orange-400 border-2 border-orange-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                Amazon, Delhivery, and Western Union
              </TimelineContent>{" "}
              I decode the DNA of high-impact engineering.{" "}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-green-400 border-2 border-green-500 inline-block xl:h-16 border-dotted px-2 rounded-md"
              >
                No fluff
              </TimelineContent>{" "}
              — just the systems, strategies, and mindset used by the top 1%.
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
}
