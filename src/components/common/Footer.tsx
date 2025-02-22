// src/components/common/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, Twitter, Instagram, Mail, Phone, MapPin,
  Globe, Youtube, Linkedin, ExternalLink, ChevronRight, Send
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' }
];

const links = {
  quick: [
    { name: 'Home', href: '/' },
    { name: 'Elections', href: '/elections' },
    { name: 'Publications', href: '/publications' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Guidelines', href: '/guidelines' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Support', href: '/support' }
  ]
};

export const Footer = () => {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <footer className="bg-white dark:bg-gray-900">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                  bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-200">
                  <Mail className="w-4 h-4 mr-2" />
                  Newsletter
                </span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Stay Updated</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get the latest election updates and announcements directly in your inbox.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 
                    rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                        focus:ring-2 focus:ring-primary-500 focus:border-transparent
                        transition-all duration-300"
                    />
                    {status !== 'idle' && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {status === 'loading' && <div className="animate-spin w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full" />}
                        {status === 'success' && <span className="text-green-500 animate-bounce">✓</span>}
                        {status === 'error' && <span className="text-red-500">✗</span>}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full"
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  {status === 'loading' ? 'Subscribing...' : 
                   status === 'success' ? 'Subscribed!' : 
                   'Subscribe Now'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img className="h-10 w-auto" src="/ur_logo.png" alt="UR Logo" />
              <div className="ml-3">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">UR-Electify</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure Digital Voting</p>
              </div>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-gray-400 transition-all duration-200 ${item.color} hover:scale-110`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.quick.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group flex items-center text-gray-600 dark:text-gray-400 
                      hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 
                      transition-all duration-200 group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="group flex items-center text-gray-600 dark:text-gray-400 
                      hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 
                      transition-all duration-200 group-hover:translate-x-1" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h4>
            {[
              { icon: Mail, text: 'support@ur-electify.com', href: 'mailto:support@ur-electify.com' },
              { icon: Phone, text: '+250 788 123 456', href: 'tel:+250788123456' },
              { icon: MapPin, text: 'KK 737 St, Gikondo, Kigali' }
            ].map((item, index) => (
              <div key={index} className="flex items-center group">
                <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 
                  group-hover:scale-110 transition-transform" />
                {item.href ? (
                  <a 
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 
                      dark:hover:text-primary-400 transition-colors"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="text-gray-600 dark:text-gray-400">{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} UR-Electify. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 
                    dark:hover:text-primary-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating UR Website Link */}
      <a
        href="https://ur.ac.rw"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-10 flex items-center space-x-2 bg-white dark:bg-gray-800 
          rounded-full px-4 py-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">Visit UR Website</span>
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </a>
    </footer>
  );
};