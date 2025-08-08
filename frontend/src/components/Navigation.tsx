"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWorkHovered, setIsWorkHovered] = useState(false);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Work", href: "/projects", hasDropdown: true },
    { name: "Services", href: "#services" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "#about" },
  ];

  const workItems = [
    { 
      name: "WOFA", 
      description: "Work From Anywhere", 
      details: "Flexible coworking platform for India",
      href: "/projects/wofa",
      image: "🏢"
    },
    { 
      name: "Kirana Connect", 
      description: "Website template", 
      details: "Modern e-commerce solution",
      href: "/projects/kirana-connect",
      image: "🛒"
    },
    { 
      name: "Mobile Apps", 
      description: "Native & Cross-platform", 
      details: "iOS & Android development",
      href: "#work",
      image: "📱"
    },
    { 
      name: "UI/UX Design", 
      description: "Modern interfaces", 
      details: "User-centered design approach",
      href: "#work",
      image: "🎨"
    },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 rounded-full ${
          isScrolled 
            ? "bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/10 dark:border-white/5" 
            : "bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="flex items-center px-6 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 min-w-max">
          {/* Logo */}
          <Link href="/" className="mr-20">
            <motion.div
              className="font-display font-bold text-lg text-black dark:text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Build With Saransh
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setIsWorkHovered(true)}
                onMouseLeave={() => item.hasDropdown && setIsWorkHovered(false)}
              >
                {item.href.startsWith('/') ? (
                  <Link href={item.href} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-200 text-sm">
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                    >
                      {item.name}
                    </motion.span>
                  </Link>
                ) : (
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-200 text-sm"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  >
                    {item.name}
                  </motion.button>
                )}

                {/* Ariostea.it Style Horizontal Dropdown */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {isWorkHovered && (
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        {/* Horizontal Cards Container */}
                        <div className="flex space-x-4 bg-white/95 dark:bg-black/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-200/20 dark:border-gray-700/20">
                          {workItems.map((workItem, idx) => (
                            <motion.a
                              key={workItem.name}
                              href={workItem.href}
                              className="block w-64 p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-accent/30 transition-all duration-300 group hover:shadow-lg"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              whileHover={{ y: -5 }}
                            >
                              {/* Project Image/Icon */}
                              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                                {workItem.image}
                              </div>
                              
                              {/* Project Info */}
                              <div>
                                <h3 className="font-bold text-lg text-black dark:text-white group-hover:text-accent transition-colors duration-300 mb-2">
                                  {workItem.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                  {workItem.description}
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">
                                  {workItem.details}
                                </p>
                              </div>
                              
                              {/* Hover Arrow */}
                              <div className="mt-4 flex items-center text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-sm font-medium mr-2">View Project</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Animated CTA Button */}
          <motion.div
            className="hidden md:block ml-12"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <motion.a
              href="#contact"
              className="relative inline-flex items-center px-5 py-2 accent-bg text-black rounded-full font-semibold text-xs overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                initial={false}
                animate={{ scale: [0, 1] }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Button text */}
              <span className="relative z-10 mr-2">Available</span>
              
              {/* Animated arrow */}
              <motion.svg
                className="w-4 h-4 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 3, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
              
              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent opacity-0"
                animate={{ 
                  scale: [1, 1.1, 1], 
                  opacity: [0, 0.5, 0] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-6"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.div
              className="w-6 h-6 flex flex-col justify-center items-center"
              animate={isMobileMenuOpen ? "open" : "closed"}
            >
              <motion.span
                className="w-5 h-0.5 bg-black dark:bg-white block"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 2 }
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-black dark:bg-white block mt-1"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 }
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-black dark:bg-white block mt-1"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 }
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-6 right-6 elegant-card p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  ) : (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {item.name}
                    </motion.a>
                  )
                ))}
                <motion.a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 accent-bg text-black rounded-full font-semibold mt-4 accent-glow"
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  Available for work
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}