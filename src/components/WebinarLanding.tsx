import { useState } from 'react';
import { CheckCircle, Sparkles, Clock, Users, Zap, ArrowRight, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  submit?: string;
}

export default function WebinarLanding() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      newErrors.phone = 'Please enter a valid 10-digit phone number';
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
            phone: formData.phone.trim()
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            You&apos;re Registered! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Welcome to the webinar community. We&apos;ll send you the webinar link 24 hours before the session.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-8">
            <p className="text-gray-700 font-semibold mb-4">
              Join our WhatsApp community for updates and exclusive content:
            </p>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all transform hover:scale-105"
            >
              Join WhatsApp Group
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="text-sm text-gray-500">
            <p>Registered as: <span className="font-semibold text-gray-700">{formData.email}</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span className="text-white font-bold text-xl">Mudassar Hakim</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#details" className="text-gray-300 hover:text-white transition">Details</a>
              <a href="#register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
                Register Free
              </a>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-white/10 py-4 px-4">
            <a href="#about" className="block text-gray-300 hover:text-white py-2">About</a>
            <a href="#details" className="block text-gray-300 hover:text-white py-2">Details</a>
            <a href="#register" className="block bg-blue-600 text-white text-center px-6 py-2 rounded-lg mt-2">
              Register Free
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300">Free Live Workshop</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              AI Won&apos;t Replace You.
              <span className="block text-blue-400 mt-2">
                But Builders Who Automate End-to-End Will.
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Discover how real builders are using AI + Automation to ship complete systems without burning out.
            </p>

            {/* Key Points */}
            <div className="space-y-3 pt-4">
              {[
                'From idea to production with AI assistance',
                'Real automation workflows that matter',
                'Vibe coding + agentic AI explained',
                'Build systems, not just demos'
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{point}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-blue-400">60min</div>
                <div className="text-sm text-gray-400">Live Session</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">Free</div>
                <div className="text-sm text-gray-400">No Cost</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">Live</div>
                <div className="text-sm text-gray-400">Interactive</div>
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div id="register" className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Reserve Your Seat
              </h2>
              <p className="text-gray-600">
                Free webinar. Limited spots available.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="10-digit mobile number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] disabled:scale-100 flex items-center justify-center gap-2"
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

              <p className="text-xs text-gray-500 text-center">
                By registering, you&apos;ll get instant access to the WhatsApp community
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div id="details" className="bg-slate-800/50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You&apos;ll Discover
            </h2>
            <p className="text-xl text-gray-300">
              In this 60-minute intensive session
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'End-to-End Thinking',
                description: 'Learn how to design complete systems from idea to production, not just isolated features'
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Vibe Coding Mastery',
                description: 'Discover how to collaborate with AI effectively without becoming dependent on copy-paste'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Agentic AI Workflows',
                description: 'Understand when and how to use autonomous AI agents in your automation pipelines'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Real Automation',
                description: 'See actual workflows that ship products, not toy demos or tutorials'
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: 'Production Systems',
                description: 'Learn the essentials: auth, logging, error handling, and evaluation'
              },
              {
                icon: <ArrowRight className="w-8 h-8" />,
                title: 'Career Leverage',
                description: 'Position yourself as a builder who ships, not just someone who knows tools'
              }
            ].map((item, index) => (
              <div key={index} className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition">
                <div className="text-blue-400 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who This Is For */}
      <div id="about" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              This Webinar Is For You If...
            </h2>
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
              <div key={index} className="bg-slate-800/50 border border-white/10 rounded-lg p-4 flex items-center gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-gray-200 text-lg">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#register"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              Register Now - It&apos;s Free
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© 2026 Mudassar Hakim Leadership, Coaching and Mentoring</p>
          <p className="text-sm mt-2">Empowering engineers to build, ship, and lead with AI</p>
        </div>
      </footer>
    </div>
  );
}
