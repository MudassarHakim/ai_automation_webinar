import { useState, useEffect } from 'react';
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
  ShieldCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Testimonial } from './Testimonial';
import GradientButton from './ui/GradientButton';

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

  const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK";

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
    } catch (err) {
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
              <a href="#about" className="text-gray-300 hover:text-white transition-colors font-medium">About</a>
              <a href="#details" className="text-gray-300 hover:text-white transition-colors font-medium">Details</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors font-medium">Reviews</a>
              <GradientButton
                onClick={() => setIsModalOpen(true)}
                className="!min-w-[160px]"
              >
                Register Free
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
            <a href="#about" className="block text-gray-300 hover:text-white py-3 font-medium">About</a>
            <a href="#details" className="block text-gray-300 hover:text-white py-3 font-medium">Details</a>
            <a href="#testimonials" className="block text-gray-300 hover:text-white py-3 font-medium">Reviews</a>
            <GradientButton
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 !min-w-0"
            >
              Register Free
            </GradientButton>
          </div>
        )}
      </nav>

      {/* Hero Section - Premium Design */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Center Content for more focus */}
          <div className="text-white space-y-8 relative z-10 lg:col-span-2 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-5 py-2.5 text-sm backdrop-blur-sm">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">Free Live Workshop</span>
              <span className="bg-blue-500/20 px-2 py-0.5 rounded-full text-xs text-blue-300">Limited Seats</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-4xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                AI Won&apos;t Replace You.
              </span>
              <span className="block mt-3 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                But Builders Who Ship Will.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Discover how experienced engineers use AI + Automation to build end-to-end systems that actually ship to production.
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
            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-white/10 w-full max-w-3xl">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">120min</div>
                <div className="text-sm text-gray-400 mt-1 font-medium text-center">Live Session</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Free</div>
                <div className="text-sm text-gray-400 mt-1 font-medium text-center">No Cost</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Live</div>
                <div className="text-sm text-gray-400 mt-1 font-medium text-center">Interactive</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Discover Section */}
      <div id="details" className="relative bg-slate-900/50 backdrop-blur-sm py-20 md:py-32 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-5 py-2 text-sm backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-medium">120-Minute Intensive</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What You&apos;ll Discover
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Practical insights from building and shipping real AI systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'End-to-End System Thinking',
                description: 'Design complete systems from idea to production, not isolated features that never ship',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Vibe Coding Mastery',
                description: 'Collaborate with AI effectively without falling into the copy-paste dependency trap',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Agentic AI Workflows',
                description: 'When and how to use autonomous AI agents in your automation pipelines',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Production-Grade Automation',
                description: 'Real workflows that ship products, not toy demos or tutorial projects',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: 'Platform Essentials',
                description: 'Auth, logging, error handling, evaluation - the unglamorous stuff that matters',
                gradient: 'from-indigo-500 to-blue-500'
              },
              {
                icon: <ArrowRight className="w-8 h-8" />,
                title: 'Career Positioning',
                description: 'How to position yourself as a builder who ships, not just someone who knows tools',
                gradient: 'from-yellow-500 to-orange-500'
              }
            ].map((item, index) => (
              <div key={index} className="group relative bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" style={{ backgroundImage: `linear - gradient(to bottom right, var(--tw - gradient - stops))` }} />
                <div className={`inline - flex p - 3 rounded - xl bg - gradient - to - br ${item.gradient} mb - 5`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
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
                    Register for Free
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
                Register Free
              </GradientButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
