import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from 'framer-motion'
import { 
  Palette, Layers, FileText, ArrowRight, Check, Menu, X, 
  Sparkles, Target, Award, Users, ChevronRight
} from 'lucide-react'

// Grain texture SVG filter
const GrainOverlay = () => (
  <svg className="grain-overlay">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
)

// Particle system for hero
const FloatingParticles = ({ count = 50 }) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth
    const height = window.innerHeight
    
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)
    
    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.08,
      hue: Math.random() > 0.5 ? 42 : 265 // rich gold or deep indigo
    }))
    
    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      particlesRef.current.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        
        // Wrap around screen
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, ${p.opacity})`
        ctx.fill()
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [count])
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}

// Floating gradient orb component
const GradientOrb = ({ className, color, size = 'lg', animate = true }) => {
  const sizes = {
    sm: 'w-64 h-64',
    md: 'w-96 h-96', 
    lg: 'w-[500px] h-[500px]'
  }
  
  return (
    <div className={`absolute rounded-full blur-[128px] pointer-events-none ${sizes[size]} ${className}`}>
      <div className={`w-full h-full rounded-full bg-gradient-to-br ${color} ${animate ? 'animate-float-slow' : ''}`} 
           style={{ animationDuration: '15s', animationDelay: '0s' }} />
    </div>
  )
}

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const prefersReducedMotion = useReducedMotion()
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  
  // Orb parallax (different speeds)
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'pricing', 'gallery', 'about', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const navItems = [
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ]

  const services = [
    { 
      title: 'Custom Portfolios', 
      description: 'One-of-a-kind portfolios tailored to your academic journey and career aspirations.',
      icon: Palette,
      color: 'from-amber-400 to-amber-700'
    },
    { 
      title: 'Landing Pages', 
      description: 'Eye-catching landing pages for your research projects, startups, or personal brands.',
      icon: Layers,
      color: 'from-emerald-500 to-emerald-700'
    },
    { 
      title: 'Professional Resumes', 
      description: 'ATS-optimized resumes that showcase your achievements and get you noticed.',
      icon: FileText,
      color: 'from-violet-500 to-indigo-700'
    }
  ]

  const pricingTiers = [
    {
      name: 'Starter',
      originalPrice: '$249',
      price: '$149',
      savings: '$100',
      description: 'Perfect for students getting started',
      features: ['Single page portfolio', 'Responsive design', '3 revisions', '2-week delivery', 'Hosting included'],
      popular: false,
      badge: null
    },
    {
      name: 'Professional',
      originalPrice: '$499',
      price: '$299',
      savings: '$200',
      description: 'Most popular for researchers',
      features: ['Multi-section portfolio', 'Custom domain setup', 'SEO optimization', '5 revisions', '1-week delivery', 'Contact form', 'Analytics'],
      popular: true,
      badge: 'MOST POPULAR'
    },
    {
      name: 'Career Ready Bundle',
      originalPrice: '$549',
      price: '$349',
      savings: '$200',
      description: 'Website + Resume + Business Cards + LinkedIn Banner',
      features: ['Complete portfolio website', 'ATS-optimized resume', 'Custom business cards', 'LinkedIn banner design', 'All Professional features', 'Priority support'],
      popular: false,
      badge: 'BEST VALUE'
    },
    {
      name: 'Premium',
      originalPrice: '$999',
      price: '$499',
      savings: '$500',
      description: 'For established academics',
      features: ['Full website with blog', 'Advanced animations', 'Analytics dashboard', 'Unlimited revisions', 'Priority support', 'Social media integration', 'Custom branding'],
      popular: false,
      badge: null
    }
  ]

  const portfolios = [
    { title: 'Rohan Mehta', subtitle: 'Drexel CS Student', category: 'CS Portfolio', result: 'Landed Amazon internship' },
    { title: 'Sophie Chen', subtitle: 'UPenn MBA Candidate', category: 'Professional Portfolio', result: 'Interview at McKinsey' },
    { title: 'Tyler Williams', subtitle: 'Temple Design Grad', category: 'Creative Portfolio', result: 'Hired at Pixar' },
    { title: 'Aisha Patel', subtitle: 'UPenn Research Assistant', category: 'Academic Portfolio', result: 'Published 3 papers' },
    { title: 'Daniel Kim', subtitle: 'Drexel Engineering', category: 'Engineering Portfolio', result: 'Co-op at Boeing' },
    { title: 'Maya Rodriguez', subtitle: 'Temple Marketing', category: 'Business Portfolio', result: 'Job at Salesforce' },
    { title: 'Ethan Thompson', subtitle: 'UPenn Wharton', category: 'MBA Portfolio', result: 'Consulting offer' },
    { title: 'Nina Singh', subtitle: 'Drexel IS&T', category: 'Tech Portfolio', result: 'SWE at Google' }
  ]

  const stats = [
    { value: '150+', label: 'Portfolios Delivered', icon: Award },
    { value: '98%', label: 'Client Satisfaction', icon: Target },
    { value: '5+', label: 'Years Experience', icon: Users }
  ]

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  // Section reveal animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden">
      {/* Grain Texture Overlay */}
      <GrainOverlay />
      
      {/* Floating Particles */}
      {!prefersReducedMotion && <FloatingParticles count={32} />}

      {/* Animated gradient background with parallax orbs */}
      <motion.div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ y: heroY }}
      >
        {/* Primary orbs */}
        <motion.div style={{ y: orb1Y }} className="absolute top-[-20%] left-[10%]">
          <GradientOrb size="lg" color="from-amber-500/25 via-amber-400/10 to-transparent" className="opacity-70" animate={!prefersReducedMotion} />
        </motion.div>
        
        <motion.div style={{ y: orb2Y }} className="absolute bottom-[10%] right-[5%]">
          <GradientOrb size="lg" color="from-indigo-500/20 via-purple-500/10 to-transparent" className="opacity-60" animate={!prefersReducedMotion} />
        </motion.div>
        
        <motion.div style={{ y: orb3Y }} className="absolute top-[40%] right-[20%]">
          <GradientOrb size="md" color="from-emerald-500/15 via-teal-500/8 to-transparent" className="opacity-40" animate={!prefersReducedMotion} />
        </motion.div>
        
        {/* Smaller accent orbs */}
        <div className="absolute top-[15%] right-[30%] w-64 h-64">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-400/15 to-transparent blur-[64px] animate-float" style={{ animationDuration: '12s' }} />
        </div>
        <div className="absolute bottom-[30%] left-[5%] w-48 h-48">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent blur-[48px] animate-float" style={{ animationDuration: '18s', animationDelay: '3s' }} />
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#09080d]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-xl font-bold tracking-[-0.02em]"
            whileHover={{ scale: 1.02 }}
          >
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              PortfolioPro
            </span>
          </motion.div>
          
          <div className="hidden md:flex gap-10 text-sm font-medium">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-2 transition-colors group ${
                  activeSection === item.id ? 'text-amber-200' : 'text-gray-400 hover:text-white'
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <span className="relative z-10">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                {/* Hover underline */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400/50 to-amber-600/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-amber-500/20 btn-premium"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 174, 80, 0.45)' }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu with smooth animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-[#09080d]/95 backdrop-blur-xl border-t border-white/10"
            >
              <motion.div 
                className="px-6 py-4 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left py-3 px-4 rounded-xl transition-colors ${
                      activeSection === item.id 
                        ? 'bg-amber-500/10 text-amber-200' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div 
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/12 via-transparent to-transparent" />
        </motion.div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(245, 174, 80, 0.3)' }}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm text-gray-300 font-medium">Serving University City Philadelphia</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-semibold mb-8 leading-[1.05] tracking-tight">
              <motion.span 
                className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Your Portfolio,
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient mt-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
              >
                Your Story
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-slate-300/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Stand out to UPenn, Drexel admissions committees and research institutions with a portfolio that tells your unique academic journey.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl shadow-amber-500/25 btn-premium"
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(245, 174, 80, 0.55)' }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('gallery')}
                className="group inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur border border-white/10 px-10 py-5 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-amber-200/30 transition-all btn-premium-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Work
                <div className="w-2 h-2 rounded-full bg-amber-300/50 group-hover:bg-amber-300 transition-colors" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
            <div className="w-8 h-14 rounded-full border-2 border-white/10 flex items-start justify-center p-2 bg-white/5 backdrop-blur">
              <motion.div 
                className="w-2 h-2 bg-gradient-to-b from-amber-300 to-amber-500 rounded-full"
                animate={{ y: [0, 20, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 px-6 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className="text-center mb-20">
            <motion.span 
              className="inline-block text-amber-300 text-sm font-semibold uppercase tracking-[0.32em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Our Services
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                What We Offer
              </span>
            </h2>
            <p className="text-slate-300/80 text-xl max-w-2xl mx-auto">Everything you need to stand out in the academic world</p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
                  }
                }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className="group relative premium-card rounded-3xl p-10 backdrop-blur-xl transition-all duration-500"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} mb-8 shadow-lg premium-icon`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-slate-300/80 leading-relaxed">{service.description}</p>
                
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* AI Objection Section */}
      <section id="ai-difference" className="py-40 px-6 bg-gradient-to-b from-transparent via-indigo-500/[0.05] to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-indigo-300 text-sm font-semibold uppercase tracking-[0.32em] mb-4">
              Why Not Just AI?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Yes, AI Can Build a Free Portfolio.
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                Here's Why You Shouldn't.
              </span>
            </h2>
            <p className="text-slate-300/80 text-xl max-w-2xl mx-auto">Every student now has access to the same AI tools. That means AI-generated portfolios all look the same.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* AI Generated Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
            >
              <div className="text-4xl mb-6">🤖</div>
              <h3 className="text-xl font-semibold text-slate-300 mb-4">AI-Generated</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-400">Generic template look</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-400">No recruiter optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-400">10+ hours to figure out</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✗</span>
                  <span className="text-slate-400">No accountability</span>
                </li>
              </ul>
            </motion.div>

            {/* DIY Tools Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
            >
              <div className="text-4xl mb-6">🛠️</div>
              <h3 className="text-xl font-semibold text-slate-300 mb-4">DIY Builders</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">~</span>
                  <span className="text-slate-400">Still takes time to customize</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">~</span>
                  <span className="text-slate-400">Limited design control</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">~</span>
                  <span className="text-slate-400">No guidance on what works</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400 mt-1">~</span>
                  <span className="text-slate-400">You own the problems</span>
                </li>
              </ul>
            </motion.div>

            {/* Our Portfolios Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative p-8 rounded-2xl bg-gradient-to-b from-amber-500/15 via-amber-600/10 to-transparent border-amber-400/30 backdrop-blur-xl shadow-[0_0_60px_rgba(245,174,80,0.15)]"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 text-black text-xs font-bold px-4 py-1 rounded-full">OUR APPROACH</span>
              </div>
              <div className="text-4xl mb-6 mt-2">✨</div>
              <h3 className="text-xl font-semibold text-amber-200 mb-4">Our Portfolios</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span className="text-slate-200">Custom brand design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span className="text-slate-200">Built for what recruiters want</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span className="text-slate-200">Done in 48-72 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1">✓</span>
                  <span className="text-slate-200">Direct communication + revisions</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-xl text-slate-300 mb-6">Stop looking like every other student.</p>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 px-10 py-5 rounded-xl font-semibold text-lg shadow-2xl shadow-amber-500/25 btn-premium"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(245, 174, 80, 0.55)' }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Portfolio That Stands Out
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 px-6 bg-gradient-to-b from-transparent via-amber-500/[0.05] to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-amber-300 text-sm font-semibold uppercase tracking-[0.32em] mb-4">
              Pricing
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
          </motion.div>

          {/* Student Discount Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border border-amber-400/30 rounded-full px-8 py-4 backdrop-blur-xl">
              <span className="text-2xl">🎓</span>
              <div className="text-left">
                <span className="text-amber-200 font-bold text-lg">Student Special: 40% OFF</span>
                <span className="text-slate-300 text-sm ml-2">Limited time for UPenn, Drexel, Temple students</span>
              </div>
              <div className="bg-amber-500/20 border border-amber-400/40 rounded-full px-3 py-1">
                <span className="text-amber-200 text-xs font-bold">Only 8 spots left</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-4">⚡ Offer expires end of May — don't wait</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`relative group ${tier.popular ? 'md:-mt-6 md:mb-6' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-amber-300 to-amber-500 text-black text-xs font-bold px-5 py-2 rounded-full shadow-lg shadow-amber-500/30">
                      {tier.badge}
                    </span>
                  </div>
                )}
                
                {tier.badge === 'BEST VALUE' && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg shadow-emerald-500/30">
                      {tier.badge}
                    </span>
                  </div>
                )}
                
                <div className={`relative h-full backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 premium-card ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-amber-500/20 via-amber-600/10 to-transparent border-amber-500/45 shadow-2xl shadow-amber-500/20' 
                    : tier.badge === 'BEST VALUE'
                    ? 'bg-gradient-to-b from-emerald-500/15 via-emerald-600/8 to-transparent border-emerald-500/30 shadow-xl shadow-emerald-500/10'
                    : 'bg-white/[0.04] border-white/10 hover:border-amber-300/30'
                }`}>
                  {/* Animated border glow on hover */}
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    tier.popular ? 'animate-pulse-glow' : ''
                  }`}>
                    <div className="absolute inset-0 rounded-3xl border-2 border-amber-400/50 animate-border-pulse" />
                  </div>
                  
                  {/* Ambient glow */}
                  <div className={`absolute -inset-px rounded-3xl bg-gradient-to-br ${tier.popular ? 'from-amber-500/25' : tier.badge === 'BEST VALUE' ? 'from-emerald-500/20' : 'from-white/5'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  
                  <div className="relative mb-8">
                    <h3 className="text-xl font-semibold text-slate-200 mb-3">{tier.name}</h3>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-2xl font-bold text-slate-400 line-through decoration-red-400/60">{tier.originalPrice}</span>
                      <span className="text-5xl font-bold text-white tracking-tight">{tier.price}</span>
                    </div>
                    {tier.savings && (
                      <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
                        Save {tier.savings}
                      </span>
                    )}
                    <p className="text-slate-300/80">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-5 mb-10">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className={`p-1.5 rounded-full ${tier.popular ? 'bg-amber-500/20' : 'bg-white/10'}`}>
                          <Check className={`w-4 h-4 ${tier.popular ? 'text-amber-300' : 'text-slate-300/80'}`} />
                        </div>
                        <span className="text-slate-200/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/40 btn-premium' 
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 btn-premium-outline'
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Choose {tier.name}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="gallery" className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="inline-block text-amber-300 text-sm font-semibold uppercase tracking-[0.32em] mb-4">
              Portfolio
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Our Work
              </span>
            </h2>
            <p className="text-slate-300/80 text-xl">Real portfolios from real clients across University City</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolios.map((portfolio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Frame container with styled border */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-[#121019] to-[#0b0a10] shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] gallery-frame">
                  {/* Inner frame decoration */}
                  <div className="absolute inset-3 border border-white/10 rounded-xl z-10 pointer-events-none" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl font-bold opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500">
                      {portfolio.title.charAt(0)}
                    </div>
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08060b] via-transparent to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-amber-200">
                      {portfolio.category}
                    </span>
                  </div>
                  
                  {/* Hover overlay with details */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-amber-500/25 via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ opacity: 0 }}
                  />
                  
                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-semibold text-lg mb-1">{portfolio.title}</h3>
                    <p className="text-sm text-slate-300/80 mb-2">{portfolio.subtitle}</p>
                    {portfolio.result && (
                      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        ✓ {portfolio.result}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Outer glow border */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-amber-400/40 transition-colors duration-500 pointer-events-none" />
                
                {/* Corner accent */}
                <div className="absolute -top-1 -right-1 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-bl from-amber-500/25 to-transparent rounded-tr-2xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 px-6 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-amber-300 text-sm font-semibold uppercase tracking-[0.32em] mb-6">
              About Us
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                About Us
              </span>
            </h2>
            <p className="text-2xl text-slate-300/80 mb-20 leading-relaxed font-light">
              We specialize in crafting digital portfolios for University City Philadelphia's academic community. 
              From UPenn researchers to Drexel innovators, we help you present your work in the best possible light.
              Our mission is to transform your achievements into a compelling digital presence.
            </p>

            <div className="grid grid-cols-3 gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.7 }}
                  className="text-center"
                >
                  <div className="inline-flex p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 premium-icon">
                    <stat.icon className="w-10 h-10 text-amber-300" />
                  </div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent mb-3 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-slate-300/80 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-40 px-6 bg-gradient-to-b from-transparent via-amber-500/[0.03] to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-amber-300 text-sm font-semibold uppercase tracking-[0.32em] mb-4">
              Testimonials
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                What Students Are Saying
              </span>
            </h2>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 py-6 px-8 bg-white/[0.03] rounded-2xl border border-white/10 backdrop-blur-xl"
          >
            {[
              { value: '150+', label: 'Portfolios Delivered' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '40+', label: 'Happy Students' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-amber-300 mb-1">{item.value}</div>
                <div className="text-slate-400 text-sm">{item.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Marcus T.',
                role: 'Drexel CS Senior',
                quote: "Landed my Amazon internship 2 weeks after getting my portfolio. Worth every penny.",
                rating: 5
              },
              {
                name: 'Priya K.',
                role: 'UPenn MBA',
                quote: "Wharton career services actually referenced my site during interviews. Game changer.",
                rating: 5
              },
              {
                name: 'James L.',
                role: 'Temple Design Grad',
                quote: "Finally a portfolio that actually shows my work instead of hiding it.",
                rating: 5
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-xl"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                
                <p className="text-slate-200 text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/30 flex items-center justify-center text-amber-200 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-amber-300 text-sm font-semibold uppercase tracking-[0.32em] mb-6">
              Contact
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Let's Talk
              </span>
            </h2>
            <p className="text-slate-300/80 text-xl">Ready to build your portfolio? Send us a message and we'll get back to you within 24 hours.</p>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center bg-gradient-to-b from-amber-500/15 to-amber-700/5 border border-amber-500/25 rounded-3xl p-16"
              >
                <div className="inline-flex p-5 rounded-full bg-amber-500/20 mb-8">
                  <Check className="w-10 h-10 text-amber-300" />
                </div>
                <h3 className="text-3xl font-semibold mb-3">Message Sent!</h3>
                <p className="text-slate-300/80 text-lg">We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-300">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl px-5 py-4 focus:outline-none transition backdrop-blur input-premium"
                    placeholder="Alex Thompson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl px-5 py-4 focus:outline-none transition backdrop-blur input-premium"
                    placeholder="alex@upenn.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-3 text-gray-300">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl px-5 py-4 focus:outline-none transition resize-none backdrop-blur input-premium"
                    placeholder="Tell us about your portfolio needs..."
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700 py-5 rounded-xl font-semibold text-lg shadow-lg shadow-amber-500/20 btn-premium"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245, 174, 80, 0.45)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div 
              className="text-lg font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                PortfolioPro
              </span>
            </motion.div>
            
            <p className="text-gray-500 text-sm">
              © 2026 PortfolioPro. Crafted with care in University City Philadelphia.
            </p>
            
            <div className="flex gap-8 text-sm">
              {['Privacy', 'Terms', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Subtle top gradient accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      </footer>
    </div>
  )
}

export default App