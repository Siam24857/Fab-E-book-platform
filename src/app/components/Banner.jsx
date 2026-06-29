"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Zap,
  Star,
  ChevronRight,
  Crown,
  Flame,
  Rocket,
  Shield,
  CheckCircle,
  Gift,
  Headphones
} from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";

const HeroBanner = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const stats = [
    { icon: BookOpen, label: "Ebooks Available", value: "34+", color: "from-blue-500 to-cyan-400", bg: "bg-blue-50" },
    { icon: Users, label: "Active Readers", value: "19K+", color: "from-purple-500 to-pink-400", bg: "bg-purple-50" },
    { icon: Award, label: "Top Writers", value: "16+", color: "from-amber-500 to-orange-400", bg: "bg-amber-50" },
    { icon: TrendingUp, label: "Daily Readers", value: "2.4K+", color: "from-emerald-500 to-teal-400", bg: "bg-emerald-50" },
  ];

  const features = [
    { icon: Crown, label: "Premium Content", desc: "Curated by experts" },
    { icon: Flame, label: "Trending Now", desc: "Most popular reads" },
    { icon: Rocket, label: "New Releases", desc: "Fresh stories daily" },
    { icon: Shield, label: "Verified Authors", desc: "Trusted creators" },
  ];

  const bookImages = {
    story: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    adventure: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    featured: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
    mystery: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    fantasy: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
  };

  const floatingBooks = [
    { src: bookImages.story, title: "The Story", rotate: -15, x: -100, y: -70, delay: 0, color: "from-pink-500/20 to-rose-500/20" },
    { src: bookImages.adventure, title: "Adventure", rotate: 12, x: 100, y: -50, delay: 1, color: "from-blue-500/20 to-cyan-500/20" },
    { src: bookImages.mystery, title: "Mystery", rotate: -8, x: -80, y: 80, delay: 2, color: "from-purple-500/20 to-indigo-500/20" },
    { src: bookImages.fantasy, title: "Fantasy", rotate: 10, x: 90, y: 70, delay: 1.5, color: "from-orange-500/20 to-amber-500/20" },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Book Blogger", rating: 5, text: "Best platform for discovering new authors!" },
    { name: "Michael Chen", role: "Author", rating: 5, text: "Fable transformed my writing career." },
  ];

  const handleBrowseClick = (e) => {
    if (!e.target.closest('a')) {
      toast.success('📚 Loading amazing books for you...', {
        style: {
          background: '#ffffff',
          color: '#1a1a2e',
          border: '2px solid #8b5cf6',
          boxShadow: '0 10px 40px rgba(139, 92, 246, 0.2)',
        },
        icon: '✨',
        duration: 3000,
      });
    }
  };

  const handleStartReading = (e) => {
    if (!e.target.closest('a')) {
      toast('📖 Join 19K+ readers today!', {
        icon: '🌟',
        style: {
          background: '#ffffff',
          color: '#1a1a2e',
          border: '2px solid #ec4899',
          boxShadow: '0 10px 40px rgba(236, 72, 153, 0.2)',
        },
        duration: 3000,
      });
    }
  };

  return (
    <section
      className="relative overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center bg-white"
    >
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        {/* Main Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-pink-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-50/30 via-pink-50/30 to-blue-50/30 rounded-full blur-3xl" />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(30deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(150deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(30deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(150deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
          }} />
        </div>

        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #8b5cf6 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 10 + i * 2,
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#1a1a2e',
            border: '2px solid #8b5cf6',
            boxShadow: '0 10px 40px rgba(139, 92, 246, 0.15)',
            borderRadius: '16px',
            padding: '16px 24px',
          },
          success: {
            iconTheme: {
              primary: '#8b5cf6',
              secondary: '#ffffff',
            },
          },
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 rounded-full px-5 py-2.5 mb-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <Sparkles className="w-3 h-3 text-pink-500" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">#1</span> Platform for Original Ebooks
              </span>
              <ChevronRight className="w-4 h-4 text-purple-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Discover & Read
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Original Ebooks
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Join <span className="text-purple-600 font-bold">19,000+</span> readers and writers on Fable. 
              Explore original ebooks, support emerging authors, and dive into captivating stories.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/browsersbooks"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 text-base"
                onClick={handleBrowseClick}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  <BookOpen className="mr-2 w-5 h-5" />
                  Browse Ebooks
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/Login"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:border-purple-400 hover:text-purple-600 hover:shadow-lg transition-all duration-300 hover:scale-105 text-base group"
                onClick={handleStartReading}
              >
                <Zap className="mr-2 w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
                Start Reading
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl p-3 text-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <feature.icon className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                  <div className="text-xs font-semibold text-gray-800">{feature.label}</div>
                  <div className="text-[10px] text-gray-500">{feature.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`${stat.bg} backdrop-blur-sm border border-white/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl`}
                >
                  <stat.icon className={`w-5 h-5 mx-auto mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  <div className="text-xl md:text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-6 pt-6 border-t border-gray-200/50"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-md">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  Trusted by <span className="text-purple-600 font-bold">2.4K+</span> daily readers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8/5 rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Premium Interactive Book Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col items-center relative"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.3}deg) rotateX(${-mousePosition.y * 0.3}deg)`,
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Main Book Showcase */}
            <div className="relative w-full max-w-lg aspect-square">
              {/* Floating Books with Premium Design */}
              {floatingBooks.map((book, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -25, 0],
                    rotate: [book.rotate, book.rotate + 8, book.rotate],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5 + index * 0.7,
                    delay: book.delay,
                  }}
                  className={`absolute bg-gradient-to-br ${book.color} backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50`}
                  style={{
                    transform: `rotate(${book.rotate}deg)`,
                    left: `calc(50% + ${book.x}px)`,
                    top: `calc(50% + ${book.y}px)`,
                  }}
                >
                  <div className="relative w-28 h-40 rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={book.src}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                  <p className="text-xs font-semibold mt-2 text-center text-gray-700">{book.title}</p>
                </motion.div>
              ))}

              {/* Main Book - Premium Glowing */}
              <motion.div
                animate={{
                  boxShadow: isHovering 
                    ? '0 30px 80px rgba(139, 92, 246, 0.4), 0 0 60px rgba(236, 72, 153, 0.2), inset 0 0 60px rgba(139, 92, 246, 0.1)'
                    : '0 20px 60px rgba(139, 92, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.05)',
                  scale: isHovering ? 1.05 : 1,
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/70 shadow-2xl transition-all duration-500"
              >
                <div className="relative w-56 h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={bookImages.featured}
                    alt="Featured Book"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Book Details Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="px-2 py-0.5 bg-purple-500/80 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full">
                        FEATURED
                      </span>
                    </div>
                    <p className="font-bold text-white text-sm">The Art of Stories</p>
                    <p className="text-xs text-gray-300">By Jane Doe</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-300">(4.8)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-2 mt-4"
                >
                  <button className="flex-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity">
                    Read Now
                  </button>
                  <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                    Preview
                  </button>
                </motion.div>
              </motion.div>

              {/* Animated Rings */}
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 20, ease: "linear" },
                  scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-2 border-purple-200/30 rounded-full"
              />
              <motion.div
                animate={{
                  rotate: -360,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 25, ease: "linear" },
                  scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-pink-200/20 rounded-full"
              />
              <motion.div
                animate={{
                  rotate: 180,
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 30, ease: "linear" },
                  scale: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-blue-200/10 rounded-full"
              />
            </div>

            {/* Premium Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-8 justify-center"
            >
              {[
                { icon: Crown, label: "Premium Selection" },
                { icon: Flame, label: "Trending" },
                { icon: Gift, label: "Free First Book" },
                { icon: Headphones, label: "Audio Available" },
              ].map((tag, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <tag.icon className="w-4 h-4 text-purple-500" />
                  {tag.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Live Activity Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-3 mt-6 px-4 py-2 bg-green-50 border border-green-200 rounded-full"
            >
              <motion.div
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-2.5 h-2.5 bg-green-500 rounded-full"
              />
              <span className="text-xs text-gray-700">
                <span className="font-semibold text-green-600">2.4K</span> readers online now
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
    </section>
  );
};

export default HeroBanner;