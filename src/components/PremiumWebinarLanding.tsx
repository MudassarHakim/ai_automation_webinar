import { useState, useEffect, Suspense, lazy } from 'react';
import {
  CheckCircle,
  Sparkles,
  Zap,
  ArrowRight,
  Menu,
  X,
  PlayCircle,
  Users,
  Award,
  Rocket,
  Clock,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  Code2,
  Terminal,
  Cpu,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Gift,
  BookOpen,
  Wrench
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Testimonial } from './Testimonial';
import GradientButton from './ui/GradientButton';
import { SocialProofPopup } from './SocialProofPopup';
import { LightningBackground } from './ui/LightningBackground';

const AboutTrainer = lazy(() => import('./AboutTrainer').then(m => ({ default: m.AboutTrainer })));
const AboutSection2 = lazy(() => import('./ui/about-section-2'));

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  submit?: string;
}

export default function PremiumWebinarLanding() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    phone: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(3 * 60 * 60);

  // Timer persistence and countdown
  useEffect(() => {
    const STORAGE_KEY = 'webinar_countdown_target';
    const now = Math.floor(Date.now() / 1000);
    const existingTarget = localStorage.getItem(STORAGE_KEY);

    let targetTime: number;

    if (existingTarget) {
      targetTime = parseInt(existingTarget, 10);
      // If target time is in the past, reset it for the purpose of this demo/landing
      if (targetTime < now) {
        targetTime = now + 3 * 60 * 60;
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
      }
    } else {
      targetTime = now + 3 * 60 * 60;
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const remaining = Math.max(0, targetTime - currentTime);
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/DD1F3xbIRx53PfrFhg3yeq";

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      if (formData.countryCode === '+91') {
        newErrors.phone = 'Please enter a valid 10-digit mobile number';
      } else {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const { error } = await supabase
        .from('webinar_registrations')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: `${formData.countryCode} ${formData.phone.trim()}`
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          setErrors({ submit: 'This email is already registered!' });
        } else {
          setErrors({ submit: 'Registration failed. Please try again.' });
        }
      } else {
        setIsRegistered(true);
      }
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

        <div className="relative max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/20">
          <div className="mb-6">
            <div className="relative inline-block">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
              <div className="absolute inset-0 bg-green-400/20 blur-2xl rounded-full animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent mb-4">
            You&apos;re In! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Welcome to an elite community of builders. We&apos;ll send the webinar link 24 hours before the session.
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-2xl p-8 mb-8 shadow-lg">
            <p className="text-gray-800 font-semibold mb-6 text-lg">
              Join our WhatsApp community for exclusive insights:
            </p>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Join WhatsApp Community
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="text-sm text-gray-500 space-y-2">
            <p>Registered as: <span className="font-semibold text-gray-700">{formData.email}</span></p>
            <p className="text-xs text-gray-400 mt-4">Check your inbox for confirmation email</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      {/* Navigation */}
      <nav className="relative z-50 bg-slate-900/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Sparkles className="w-10 h-10 text-blue-400" />
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full" />
              </div>
              <div>
                <span className="text-white font-bold text-xl block">Mudassar Hakim</span>
                <span className="text-blue-400 text-xs font-medium">Leadership & AI Coaching</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#paths" className="text-gray-300 hover:text-white transition-colors font-medium">The Choice</a>
              <a href="#curriculum" className="text-gray-300 hover:text-white transition-colors font-medium">Curriculum</a>
              <a href="#bonuses" className="text-gray-300 hover:text-white transition-colors font-medium">Bonuses</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors font-medium">Reviews</a>
              <GradientButton
                onClick={() => setIsModalOpen(true)}
                className="!min-w-[160px]"
              >
                Reserve My Free Seat
              </GradientButton>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 py-6 px-4">
            <a href="#paths" className="block text-gray-300 hover:text-white py-3 font-medium">The Choice</a>
            <a href="#curriculum" className="block text-gray-300 hover:text-white py-3 font-medium">Curriculum</a>
            <a href="#bonuses" className="block text-gray-300 hover:text-white py-3 font-medium">Bonuses</a>
            <a href="#testimonials" className="block text-gray-300 hover:text-white py-3 font-medium">Reviews</a>
            <GradientButton
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 !min-w-0"
            >
                Reserve My Free Seat
              </GradientButton>
          </div>
        )}
      </nav>

      {/* Hero Section - Premium Design */}
      <div className="relative overflow-hidden">
        <LightningBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          {/* Center Content for more focus */}
          <div className="text-white space-y-8 relative z-10 lg:col-span-2 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-5 py-2.5 text-sm backdrop-blur-sm">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Free Live Workshop</span>
              <span className="bg-blue-500/20 px-2 py-0.5 rounded-full text-xs text-blue-300">Limited Seats</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-4xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Stop Being an AI Consumer.
              </span>
              <span className="block mt-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Become an AI Builder.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
              Prompting is a commodity. Building is a superpower. Discover the exact roadmap to master Agentic AI and ship production-grade systems that automate your work and accelerate your career.
            </p>

            {/* Action Button */}
            <GradientButton
              onClick={() => setIsModalOpen(true)}
              className="mt-4"
            >
              Reserve My Free Seat
              <ArrowRight className="w-6 h-6" />
            </GradientButton>

            {/* Key Points with Icons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 w-full">
              {[
                { icon: <Rocket className="w-5 h-5" />, text: 'Idea → Production with AI' },
                { icon: <Zap className="w-5 h-5" />, text: 'Real automation workflows' },
                { icon: <PlayCircle className="w-5 h-5" />, text: 'Vibe coding + Agentic AI' },
                { icon: <Award className="w-5 h-5" />, text: 'Ship systems, not demos' }
              ].map((point, index) => (
                <div key={index} className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="text-blue-400 flex-shrink-0">
                    {point.icon}
                  </div>
                  <span className="text-gray-200 font-medium text-sm">{point.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12 pt-12 border-t border-white/10 w-full max-w-3xl">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Path A
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium text-center uppercase tracking-wider">The Consumer</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">VS</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium text-center uppercase tracking-wider">The Choice</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Path B</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1 font-medium text-center uppercase tracking-wider">The Builder</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fear & Hope: The Industry Shift Section */}
      <div id="fear-hope" className="relative py-20 md:py-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* The Fear Angle */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-5 py-2 text-sm backdrop-blur-sm">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 font-medium">The Market Reality</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                "Software Engineering will be <span className="text-red-500">obsolete</span> in 6-12 months."
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                The headlines are designed to spark fear. And for those who only know how to "code" by rote, the fear is justified. The tools are getting too good, too fast.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium mb-1">Sridhar Vembu (Zoho CEO) recently noted:</p>
                    <p className="text-gray-400 italic">"We better pay attention... because he has the best coding tool in the world."</p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Hope Angle / Image Placeholder */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-slate-900 border border-white/10 rounded-3xl p-2 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <img 
                  src="/images/ai-fear-hope.png" 
                  alt="Tweet about AI replacing software engineering" 
                  className="w-full h-auto rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl border border-blue-400 hidden md:block animate-bounce">
                <p className="font-bold text-lg leading-tight">Don't Fear Tools.<br/>Master Them.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Two Paths Section */}
      <div id="paths" className="relative py-20 md:py-32 border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              There Are Two Paths in the AI Era
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Every professional today is standing at a crossroads. Which side of the "AI Divide" will you be on?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Path A */}
            <div className="group relative bg-slate-900/80 backdrop-blur-sm border border-red-500/20 rounded-3xl p-8 md:p-12 hover:border-red-500/40 transition-all duration-500">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                Path A: The Consumer
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                  <TrendingDown className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">Using AI as a Search Engine</h3>
                <ul className="space-y-4">
                  {[
                    "Copy-pasting prompts from generic lists",
                    "Limited to what ChatGPT's interface can do",
                    "Easily replaceable by someone with a better prompt",
                    "Reacting to tools, not building solutions"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <X className="w-5 h-5 text-red-500/50 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/5">
                  <p className="text-red-400/80 font-medium italic">Outcome: Stagnation and obsolescence.</p>
                </div>
              </div>
            </div>

            {/* Path B */}
            <div className="group relative bg-blue-900/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 md:p-12 hover:border-blue-500/50 transition-all duration-500 shadow-2xl shadow-blue-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 border border-blue-400 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase shadow-lg shadow-blue-500/50">
                Path B: The Builder
              </div>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Using AI as an Operating System</h3>
                <ul className="space-y-4">
                  {[
                    "Building custom agents that work for you",
                    "Automating complex business workflows",
                    "Shipping products with \"Vibe Coding\"",
                    "Indispensable because you solve real problems"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/5">
                  <p className="text-blue-400 font-bold italic">Outcome: Career acceleration and new income streams.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Reality Section */}
      <div id="reality" className="relative py-20 md:py-32 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              The Reality Check: Prompts Are Common. <br className="hidden md:block" />
              <span className="text-blue-400">Systems Are Rare.</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                In 2024, everyone knows how to "ask ChatGPT." That's not a skill anymore—it's a commodity.
              </p>
              <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                <p className="text-lg text-gray-400 leading-relaxed italic">
                  "The real value has shifted from knowing how to talk to AI, to knowing how to <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">build systems</span> where AI does the work for you."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Becomes Possible Section */}
      <div id="outcomes" className="relative py-20 md:py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Becomes Possible When You Build
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Once you master Agentic AI and Vibe Coding, your perspective on work changes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Launch Side Income",
                description: "Build and deploy niche SaaS or automation services in days, not months. Ship while others are still prompt-engineering.",
                color: "blue"
              },
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "10x Career Growth",
                description: "Position yourself as the AI Architect in your company. Lead the transition from manual work to autonomous systems.",
                color: "purple"
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Total Freedom",
                description: "Spend your time on strategy and creativity while your custom AI agents handle the repetitive execution tasks.",
                color: "green"
              }
            ].map((item, i) => (
              <div key={i} className="group bg-slate-900/50 border border-white/10 p-8 rounded-3xl hover:border-white/30 transition-all duration-300">
                <div className={`mb-6 text-${item.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FREE Bonuses Section */}
      <div id="bonuses" className="relative py-20 md:py-32 border-t border-white/10 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Get These <span className="text-blue-500">FREE Bonuses</span> When You Join
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              This isn't just a bootcamp. It's a complete toolkit for your success. Reserve your seat now and get instant access to:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award className="w-10 h-10 text-blue-400" />,
                title: "Certificate of Participation",
                description: "Boost your resume and LinkedIn profile with an official certificate.",
                gradient: "from-blue-500/10 to-transparent"
              },
              {
                icon: <Wrench className="w-10 h-10 text-purple-400" />,
                title: "Free AI Tools Directory",
                description: "A curated list of the best 100% free AI tools for app development.",
                gradient: "from-purple-500/10 to-transparent"
              },
              {
                icon: <BookOpen className="w-10 h-10 text-green-400" />,
                title: "Thinking in Systems, Explaining with Clarity",
                description: "Get my exclusive guide on how to architect complex AI systems and explain them clearly.",
                link: "https://www.amazon.in/dp/B0GKCD5VFP",
                gradient: "from-green-500/10 to-transparent"
              }
            ].map((bonus, i) => (
              <div key={i} className="group relative bg-slate-900 border border-white/10 p-10 rounded-3xl hover:border-white/30 transition-all duration-300">
                <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                  {bonus.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{bonus.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{bonus.description}</p>
                {bonus.link && (
                  <a 
                    href={bonus.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-2 transition-colors"
                  >
                    View on Amazon <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About The Trainer */}
      <div id="about-trainer">
        <Suspense fallback={<div className="h-96 bg-slate-950 animate-pulse" />}>
          <AboutTrainer />
        </Suspense>
        <Suspense fallback={<div className="h-64 bg-slate-950 animate-pulse" />}>
          <AboutSection2 />
        </Suspense>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="relative">
        <Testimonial />
      </div>

      {/* Who This Is For */}
      <div id="about" className="relative py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              This Workshop Is For You If...
            </h2>
            <p className="text-xl text-gray-400">
              We&apos;re looking for builders who want to level up
            </p>
          </div>

          <div className="space-y-4">
            {[
              'You want to build with AI, not just play with demos',
              'You\'re curious about automation and vibe coding',
              'You want to understand agentic AI practically',
              'You\'re tired of tutorials that don\'t ship real products',
              'You want to position yourself as a builder who delivers',
              'You\'re open to learning from real-world examples'
            ].map((item, index) => (
              <div key={index} className="group bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:translate-x-2">
                <CheckCircle className="w-7 h-7 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-200 text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="flex justify-center">
              <GradientButton
                onClick={() => setIsModalOpen(true)}
              >
                Claim Your Free Seat
                <ArrowRight className="w-6 h-6" />
              </GradientButton>
            </div>
            <p className="text-gray-400 text-sm mt-4">Limited seats • No credit card required</p>
          </div>
        </div>
      </div>

      {/* Curriculum/Timeline Section */}
      <div id="curriculum" className="relative py-20 md:py-32 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The 120-Minute Roadmap
            </h2>
            <p className="text-xl text-gray-400">From theory to shipping: No fluff, just results.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                time: "0-30 min",
                title: "The Architecture",
                desc: "Understanding Agentic AI vs. Chatbots. Setting up your 'Vibe Coding' environment.",
                icon: <Terminal className="w-6 h-6 text-blue-400" />
              },
              {
                time: "30-60 min",
                title: "Building the Brain",
                desc: "Designing autonomous agents that can reason and execute tasks across tools.",
                icon: <BrainCircuit className="w-6 h-6 text-purple-400" />
              },
              {
                time: "60-90 min",
                title: "Vibe Coding Live",
                desc: "Watch a production app go from idea to deploy in 30 mins using AI orchestration.",
                icon: <Code2 className="w-6 h-6 text-green-400" />
              },
              {
                time: "90-120 min",
                title: " Monetization & Scale",
                desc: "The 'Ship Log' framework: How to find niche problems and solve them with AI.",
                icon: <Cpu className="w-6 h-6 text-orange-400" />
              }
            ].map((step, i) => (
              <div key={i} className="relative p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/30 transition-all">
                <div className="text-blue-400 text-sm font-bold mb-2">{step.time}</div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="relative py-20 md:py-32 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-gray-400">Everything you need to know before joining.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need to be a senior developer?",
                a: "No. This is for anyone who wants to build. Whether you have 0 coding experience or 10 years, AI is the great equalizer. We focus on 'Vibe Coding' which is more about logic and system design than syntax."
              },
              {
                q: "Is this really free?",
                a: "Yes. This is a live workshop to help build the community. There are no hidden fees. I want to help 10,000 builders transition into the AI era."
              },
              {
                q: "Will there be a recording?",
                a: "Recordings are only sent to those who attend live. This is an interactive session with live Q&A, so the best value is in being there."
              },
              {
                q: "What tools will we use?",
                a: "We'll explore Cursor, Replit Agent, and custom LLM orchestration frameworks. You don't need to install anything beforehand."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  {faq.q}
                </h3>
                <p className="text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative py-20 md:py-32 bg-gradient-to-b from-transparent to-blue-900/20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Don&apos;t Let the AI Era Pass You By.
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            The difference between being replaced and becoming indispensable is one decision. Join the builders who are shipping the future.
          </p>
          <GradientButton
            onClick={() => setIsModalOpen(true)}
            className="h-20 px-12 text-2xl"
          >
            Secure Your Free Seat Now
            <ArrowRight className="w-8 h-8 ml-2" />
          </GradientButton>
          <div className="mt-8 flex items-center justify-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>5,000+ Registered</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Top Rated Workshop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-slate-900/50 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span className="text-white font-bold text-xl">Mudassar Hakim</span>
            </div>
            <p className="text-gray-400">Leadership, Coaching and Mentoring</p>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Empowering experienced engineers and managers to build, ship, and lead with AI
            </p>
            <p className="text-gray-600 text-sm pt-6">© 2026 All rights reserved</p>
          </div>
        </div>
      </footer>
      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 w-full max-w-lg animate-in fade-in zoom-in duration-300">

            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                <span>last few seats remaining</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Reserve Your Seat
              </h2>
              <p className="text-gray-600">
                Join builders shipping real AI systems
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white font-medium text-gray-900 ${errors.name ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white font-medium text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="block text-sm font-bold text-gray-800">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <div className="relative w-[110px] flex-shrink-0">
                    <select
                      id="countryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white font-medium text-gray-900 hover:border-gray-300 transition-all cursor-pointer"
                    >
                      <option value="+91">+91 (IN)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+971">+971 (AE)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+65">+65 (SG)</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white font-medium text-gray-900 ${errors.phone ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    placeholder="10-digit mobile number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 font-medium">{errors.phone}</p>
                )}
              </div>

              {/* Trust Section */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex gap-4 transition-colors hover:bg-blue-50">
                <div className="bg-blue-100/50 p-2.5 rounded-xl h-fit">
                  <ShieldCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-[15px] font-bold text-gray-900 leading-tight">
                    Don&apos;t worry, your details are safe.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    We just need this information so that we can share the event details with you once you book successfully.
                  </p>
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-600 text-sm font-medium">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-blue-400 disabled:to-blue-400 text-white font-bold py-5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Reserve My Free Seat
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 pt-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-xs text-gray-600 font-medium">
                  Instant WhatsApp community access
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Footer */}
      {!isRegistered && (
        <div className="fixed bottom-0 left-0 right-0 z-[90] bg-slate-950/80 backdrop-blur-xl border-t border-white/10 p-4 md:p-5 animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex flex-col">
                <p className="text-blue-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-1">
                  Offer Expires Soon
                </p>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white animate-pulse" />
                  <span className="text-2xl md:text-3xl font-mono font-bold text-white tracking-wider">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
              <div className="hidden lg:block h-10 w-px bg-white/10" />
              <p className="hidden lg:block text-gray-400 text-sm max-w-[200px] leading-tight">
                Join 500+ builders in this intensive AI mastery session.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <GradientButton
                onClick={() => setIsModalOpen(true)}
                className="w-full md:w-[240px] h-[56px] text-lg"
              >
                Reserve My Free Seat
              </GradientButton>
            </div>
          </div>
        </div>
      )}

      {/* Social Proof Popup */}
      <SocialProofPopup />
    </div>
  );
}
