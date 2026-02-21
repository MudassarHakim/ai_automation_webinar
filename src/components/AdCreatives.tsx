import { ArrowLeft } from 'lucide-react';

const videos = [
  {
    src: '/videos/49-percent-devs-fear-replacement.mp4',
    title: '49% of Devs Fear Replacement',
  },
  {
    src: '/videos/become-ai-person-on-team.mp4',
    title: 'Become the AI Person on Your Team',
  },
  {
    src: '/videos/no-slides.mp4',
    title: 'No Slides — Pure Live Coding',
  },
];

export default function AdCreatives() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <a
          href="#/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Ad Creatives
        </h1>
        <p className="text-gray-400 mb-10">
          Video ads for the AI Automation Webinar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.src}
              className="rounded-2xl overflow-hidden bg-gray-900 border border-gray-800"
            >
              <video
                src={video.src}
                controls
                preload="metadata"
                className="w-full aspect-video bg-black"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg">{video.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
