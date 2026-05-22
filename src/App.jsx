import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Palette, Layers, FileText, ArrowRight, Check, Menu, X, 
  Sparkles, Target, Award, Users
} from 'lucide-react'

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

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
      color: 'from-amber-500 to-orange-600'
    },
    { 
      title: 'Landing Pages', 
      description: 'Eye-catching landing pages for your research projects, startups, or personal brands.',
      icon: Layers,
      color: 'from-emerald-500 to-teal-600'
    },
    { 
      title: 'Professional Resumes', 
      description: 'ATS-optimized resumes that showcase your achievements and get you noticed.',
      icon: FileText,
      color: 'from-violet-500 to-purple-600'
    }
  ]

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$299',
      description: 'Perfect for students getting started',
      features: ['Single page portfolio', 'Responsive design', '3 revisions', '2-week delivery', 'Hosting included'],
      popular: false
    },
    {
      name: 'Professional',
      price: '$599',
      description: 'Most popular for researchers',
      features: ['Multi-section portfolio', 'Custom domain setup', 'SEO optimization', '5 revisions', '1-week delivery', 'Contact form', 'Analytics'],
      popular: true
    },
    {
      name: 'Premium',
      price: '$999',
      description: 'For established academics',
      features: ['Full website with blog', 'Advanced animations', 'Analytics dashboard', 'Unlimited revisions', 'Priority support', 'Social media integration', 'Custom branding'],
      popular: false
    }
  ]

  const portfolios = [
    { title: 'Dr. Sarah Chen', subtitle: 'Data Scientist', category: 'Research Portfolio' },
    { title: 'Marcus Johnson', subtitle: 'PhD Candidate', category: 'Academic Profile' },
    { title: 'Elena Rodriguez', subtitle: 'Startup Founder', category: 'Business Landing' },
    { title: 'Prof. James Liu', subtitle: 'Researcher', category: 'University Profile' }
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

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[96px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              PortfolioPro
            </span>
          </motion.div>
          
          <div className="hidden md:flex gap-8 text-sm">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-1 transition-colors ${
                  activeSection === item.id ? 'text-amber-400' : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ y: -1 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2 rounded-lg text-sm font-semibold"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>

          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0f]/95 border-t border-white/5"
            >
              <div className="px-6 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-2 text-gray-400 hover:text-white transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"
        />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-300">Serving University City Philadelphia</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Your Portfolio,
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                Your Story
              </span>
            </h1>
            
            <motion.p 
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Stand out to UPenn, Drexel admissions committees and research institutions with a portfolio that tells your unique academic journey.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 rounded-xl font-semibold"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 158, 11, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Today
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('gallery')}
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Work
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-amber-400 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                What We Offer
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Everything you need to stand out in the academic world</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-amber-500/30"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-6`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
                
                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Transparent pricing. No hidden fees. Choose the package that fits your needs.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className={`relative h-full backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-500/30' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">{tier.name}</h3>
                    <div className="text-5xl font-bold text-white mb-2">{tier.price}</div>
                    <p className="text-gray-400 text-sm">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <div className={`p-1 rounded-full ${tier.popular ? 'bg-amber-500/20' : 'bg-white/10'}`}>
                          <Check className={`w-3 h-3 ${tier.popular ? 'text-amber-400' : 'text-gray-400'}`} />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    onClick={() => scrollToSection('contact')}
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-500/25' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
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
      <section id="gallery" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Our Work
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Real portfolios from real clients across University City</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolios.map((portfolio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                      {portfolio.title.charAt(0)}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-amber-400 mb-2 font-medium">{portfolio.category}</p>
                  <h3 className="font-semibold text-lg mb-1">{portfolio.title}</h3>
                  <p className="text-sm text-gray-400">{portfolio.subtitle}</p>
                </div>

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-amber-500/30 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                About Us
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-16 leading-relaxed">
              We specialize in crafting digital portfolios for University City Philadelphia's academic community. 
              From UPenn researchers to Drexel innovators, we help you present your work in the best possible light.
              Our mission is to transform your achievements into a compelling digital presence.
            </p>

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
                    <stat.icon className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Let's Talk
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Ready to build your portfolio? Send us a message and we'll get back to you within 24 hours.</p>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center bg-gradient-to-b from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-12"
              >
                <div className="inline-flex p-4 rounded-full bg-amber-500/20 mb-6">
                  <Check className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-gray-400">We'll be in touch soon.</p>
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
                  <label className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition"
                    placeholder="Alex Thompson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition"
                    placeholder="alex@upenn.edu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition resize-none"
                    placeholder="Tell us about your portfolio needs..."
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 py-4 rounded-xl font-semibold"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 PortfolioPro. Serving University City Philadelphia.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App