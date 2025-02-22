
import{ useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Update scroll to top button visibility
  useEffect(() => {
    const updateScrollTopVisibility = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', updateScrollTopVisibility);
    return () => window.removeEventListener('scroll', updateScrollTopVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="progress-bar"
        style={{ scaleX }}
      />

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-20 right-24 z-50 p-3 rounded-full bg-white dark:bg-gray-800 
          shadow-lg hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          y: showScrollTop ? 0 : 20
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
      </motion.button>
    </>
  );
};