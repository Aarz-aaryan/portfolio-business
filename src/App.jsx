import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const services = [
    {
      title: 'Custom Portfolios',
      description: 'One-of-a-kind portfolios tailored to your academic journey and career aspirations.',
      icon: '🎨'
    },
    {
      title: 'Landing Pages',
      description: 'Eye-catching landing pages for your research projects, startups, or personal brands.',
      icon: '🚀'
    },
    {
      title: 'Professional Resumes',
      description: 'ATS-optimized resumes that showcase your achievements and get you noticed.',
      icon: '📄'
    }
  ]

  const pricingTiers = [
    {
      name: 'Starter',
      price: '$299',
      description: 'Perfect for students getting started',
      features: ['Single page portfolio', 'Responsive design', '3 revisions', '2-week delivery']
    },
    {
      name: 'Professional',
      price: '$599',
      description: 'Most popular for researchers',
      features: ['Multi-section portfolio', 'Custom domain setup', 'SEO optimization', '5 revisions', '1-week delivery', 'Contact form'],
      popular: true
    },
    {
      name: 'Premium',
      price: '$999',
      description: 'For established academics',
      features: ['Full website with blog', 'Advanced animations', 'Analytics dashboard', 'Unlimited revisions', 'Priority support', 'Social media integration']
    }
  ]

  const portfolios = [
    { title: 'Dr. Sarah Chen - Data Scientist', category: 'Research Portfolio' },
    { title: 'Marcus Johnson - PhD Candidate', category: 'Academic Profile' },
    { title: 'Elena Rodriguez - Startup Founder', category: 'Business Landing' },
    { title: 'Prof. James Liu - Researcher', category: 'University Profile' }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            PortfolioPro
          </span>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#services" className="hover:text-blue-400 transition">Services</a>
            <a href="#pricing" className="hover:text-blue-400 transition">Pricing</a>
            <a href="#gallery" className="hover:text-blue-400 transition">Gallery</a>
            <a href="#about" className="hover:text-blue-400 transition">About</a>
            <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Your Portfolio, Your Story
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Stand out to UPenn, Drexel admissions committees and research institutions with a portfolio that tells your unique academic journey.
          </p>
          <a href="#contact" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition">
            Get Started Today
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-slate-800 rounded-xl p-6 hover:scale-105 transition-transform">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">Choose the package that fits your needs. All prices include hosting for one year.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div key={index} className={`rounded-xl p-8 ${tier.popular ? 'bg-gradient-to-b from-blue-600 to-purple-700 ring-2 ring-blue-500' : 'bg-slate-800'}`}>
                {tier.popular && <span className="inline-block bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full mb-4">MOST POPULAR</span>}
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2">{tier.price}</div>
                <p className="text-slate-300 text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-green-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`block text-center py-3 rounded-lg font-semibold transition ${tier.popular ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-700 hover:bg-slate-600'}`}>
                  Choose {tier.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section id="gallery" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolios.map((portfolio, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 aspect-[3/4] flex items-center justify-center">
                  <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform">📁</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-xs text-blue-400 mb-1">{portfolio.category}</p>
                  <h3 className="font-semibold">{portfolio.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-slate-400 text-lg mb-8">
            We specialize in crafting digital portfolios for University City Philadelphia's academic community. From UPenn researchers to Drexel innovators, we help you present your work in the best possible light.
          </p>
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-3xl font-bold text-blue-400">150+</div>
              <div className="text-slate-400 text-sm">Portfolios Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">98%</div>
              <div className="text-slate-400 text-sm">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400">5+</div>
              <div className="text-slate-400 text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Let's Talk</h2>
          <p className="text-slate-400 text-center mb-8">Ready to build your portfolio? Send us a message and we'll get back to you within 24 hours.</p>
          
          {submitted ? (
            <div className="bg-green-500/20 border border-green-500 rounded-xl p-8 text-center">
              <span className="text-4xl mb-4 block">✅</span>
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-slate-300">We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Alex Thompson"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="alex@upenn.edu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Tell us about your portfolio needs..."
                />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-lg font-semibold hover:opacity-90 transition">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 PortfolioPro. Serving University City Philadelphia.</p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App