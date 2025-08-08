"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import Navigation from "@/components/Navigation";

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[100svh] px-6 overflow-hidden bg-white dark:bg-black">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-[15%] left-[5%] w-1.5 h-1.5 sm:w-2 sm:h-2 accent-bg rounded-full animate-subtle-float"></div>
        <div className="absolute top-[25%] right-[8%] w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full animate-subtle-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-[20%] left-[12%] w-1 h-1 sm:w-1.5 sm:h-1.5 accent-bg rounded-full animate-subtle-float" style={{ animationDelay: '6s' }}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-[320px] xs:max-w-[400px] sm:max-w-5xl mx-auto pt-20 sm:pt-24 md:pt-32">
        {/* Main Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-5xl xs:text-6xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] mb-4 sm:mb-8 text-black dark:text-white tracking-tight">
            <motion.span 
              className="block text-2xl xs:text-3xl sm:text-4xl lg:text-5xl mb-2 sm:mb-4 text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Hi! I'm
            </motion.span>
            <motion.span 
              className="block accent-text mb-3 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Saransh
            </motion.span>
            <motion.div 
              className="space-y-1.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="block text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-600 dark:text-gray-400">
                a <span className="accent-text">Mobile Developer</span>
              </span>
              <span className="block text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-600 dark:text-gray-400">
                from <span className="text-black dark:text-white">India</span>
              </span>
            </motion.div>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div
          className="text-center mb-6 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-light text-black dark:text-white mb-2 sm:mb-4 tracking-wide">
            turning your ideas into pixel-perfect realities
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">(2021 – PRESENT)</p>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-base xs:text-lg sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-12 max-w-[320px] xs:max-w-[400px] sm:max-w-2xl mx-auto leading-relaxed text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          I'm dedicated to crafting mobile apps that bring your ideas to life, combining design and development to deliver fast, impactful results.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="mb-10 sm:mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.button
            onClick={() => {
              const element = document.querySelector('#work');
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            }}
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 accent-bg text-black rounded-full font-semibold text-base sm:text-lg accent-glow-hover"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            See what I can do
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {[
            { number: "2+", label: "years of experience" },
            { number: ">95%", label: "client retention rate" },
            { number: "18", label: "satisfied clients" },
            { number: "14", label: "projects finished" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Ticker */}
        <motion.div
          className="w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">— Tech stack I work with —</p>
          </div>
          <div className="relative">
            <div className="flex animate-scroll space-x-12 items-center">
              {[
                { name: "Figma", icon: "🎨" },
                { name: "React", icon: "⚛️" },
                { name: "Next.js", icon: "▲" },
                { name: "Django", icon: "🐍" },
                { name: "Flutter", icon: "📱" },
                { name: "Swift", icon: "🍎" },
                { name: "GCP", icon: "☁️" },
                { name: "Firebase", icon: "🔥" },
                { name: "Xcode", icon: "🛠️" },
                { name: "VS Code", icon: "💻" },
                { name: "Git", icon: "🔀" },
                { name: "Docker", icon: "🐳" }
              ].concat([
                { name: "Figma", icon: "🎨" },
                { name: "React", icon: "⚛️" },
                { name: "Next.js", icon: "▲" },
                { name: "Django", icon: "🐍" },
                { name: "Flutter", icon: "📱" },
                { name: "Swift", icon: "🍎" },
                { name: "GCP", icon: "☁️" },
                { name: "Firebase", icon: "🔥" },
                { name: "Xcode", icon: "🛠️" },
                { name: "VS Code", icon: "💻" },
                { name: "Git", icon: "🔀" },
                { name: "Docker", icon: "🐳" }
              ]).map((tech, index) => (
                <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuickStats() {
  return (
    <section className="flex flex-col items-center py-8">
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">2</span>
          <span className="text-gray-500">Years of experience</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">10+</span>
          <span className="text-gray-500">Clients</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">95%</span>
          <span className="text-gray-500">Satisfaction rate</span>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    "E-commerce",
    "Corporate website", 
    "Landing page",
    "Blog",
    "Social network"
  ];

  return (
    <section id="services" className="py-32 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 mr-4">{"{03}"}</span>
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">— Process</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-8">
            How it works
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-12">
          {[
            {
              number: "01",
              title: "Discovery",
              subtitle: "We'll dive deep into your personal goals and long-term vision",
              details: [
                "Initial Consultation: Understand the client's vision, goals, and target audience.",
                "Research: Analyze competitors and industry trends to gather insights.", 
                "Define Scope: Set the project's objectives, deliverables, and timelines."
              ],
              duration: "3-5 days"
            },
            {
              number: "02", 
              title: "Design",
              subtitle: "Creating beautiful, functional interfaces tailored to your needs",
              details: [
                "Wireframing: Create low-fidelity layouts to establish structure.",
                "Visual Design: Develop high-fidelity mockups with your brand identity.",
                "Prototyping: Build interactive prototypes for user testing."
              ],
              duration: "1-2 weeks"
            },
            {
              number: "03",
              title: "Development", 
              subtitle: "Bringing your vision to life with clean, scalable code",
              details: [
                "Frontend Development: Build responsive, accessible user interfaces.",
                "Backend Integration: Connect to APIs and databases as needed.",
                "Testing: Ensure cross-browser compatibility and performance."
              ],
              duration: "2-4 weeks"
            },
            {
              number: "04",
              title: "Launch",
              subtitle: "Deploying your project and ensuring everything runs smoothly",
              details: [
                "Deployment: Launch your project on your preferred platform.",
                "Training: Provide documentation and training for content management.",
                "Support: Ongoing maintenance and updates as needed."
              ],
              duration: "1 week"
            }
          ].map((step, idx) => (
            <motion.div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Step Number */}
              <div className="lg:col-span-2">
                <div className="text-6xl font-bold text-black dark:text-white">
                  {step.number}
                </div>
              </div>
              
              {/* Step Content */}
              <div className="lg:col-span-8">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {step.subtitle}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIdx) => (
                    <li key={detailIdx} className="text-gray-600 dark:text-gray-300 text-sm">
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Duration */}
              <div className="lg:col-span-2">
                <div className="text-sm font-mono text-gray-500 dark:text-gray-400">
                  {step.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Types */}
        <motion.div
          className="mt-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
              >
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StepProcess() {
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      desc: "We'll talk through your idea, goals, and users to align on the right product direction."
    },
    {
      number: "02", 
      title: "Custom design",
      desc: "I'll create clean, modern UI/UX tailored to your brand and user needs."
    },
    {
      number: "03",
      title: "Development", 
      desc: "Your app comes to life with scalable code, real-time features, and smooth performance."
    },
    {
      number: "04",
      title: "Launch",
      desc: "Final testing, store deployment, and go-live support—your app, ready for the world."
    }
  ];

  return (
    <section className="py-20 px-4 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="bg-blue-700 rounded-3xl p-12 mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-6 right-6 text-8xl font-black text-white opacity-10">4</div>
          <h2 className="text-4xl font-bold text-white mb-4">Step process</h2>
          <p className="text-blue-100 text-lg max-w-lg mx-auto">
            A simple, proven approach to turn ideas into versatile mobile products—designed, built, and launched with clarity and care.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex items-start text-left bg-white rounded-2xl p-6 shadow-sm"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg mr-6 flex-shrink-0">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg"
          >
            Launch your business
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await api.get("projects/");
        setProjects(res.data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);
  if (loading) return <section className="py-20 px-4"><div className="max-w-6xl mx-auto text-center text-gray-500 dark:text-gray-400">Loading projects...</div></section>;
  if (error) return <section className="py-20 px-4"><div className="max-w-6xl mx-auto text-center text-gray-500 dark:text-gray-400">{error}</div></section>;
  if (!projects.length) return <section className="py-20 px-4"><div className="max-w-6xl mx-auto text-center text-gray-500 dark:text-gray-400">No projects found.</div></section>;
  return (
    <section id="work" className="py-32 px-4 bg-white dark:bg-black">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-40 right-[10%] w-1 h-1 accent-bg rounded-full animate-subtle-float"></div>
        <div className="absolute bottom-40 left-[8%] w-1.5 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full animate-subtle-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 mr-4">{"{01}"}</span>
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">— Featured projects</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-8">
            I blend creativity with<br />technical expertise
          </h2>
          <motion.a
            href="#contact"
            className="inline-flex items-center accent-text font-medium hover:underline"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Become a client
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.slice(0, 4).map((project, idx) => (
            <motion.div
              key={project.id}
              className="group elegant-card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <OptimizedImage
                src={project.hero_image}
                alt={project.title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  
                  {/* Project Meta Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div className="text-white text-sm font-mono bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.date && new Date(project.date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' })}
                    </div>
                    <div className="text-white text-xs bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.industry || "Mobile App"}
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-black dark:text-white group-hover:accent-text transition-colors duration-300 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>
                  
                  <div className="flex items-center text-sm accent-text group-hover:underline">
                      <span>View case study</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Projects */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="/projects"
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            View all projects
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function Toolkit() {
  const tools = [
    { name: "Figma", percent: 80, desc: "Leading design tool", icon: "🎨" },
    { name: "Swift UI", percent: 70, desc: "Framework for iOS applications", icon: "📱" },
    { name: "Kotlin", percent: 90, desc: "Native android development", icon: "🤖" },
    { name: "Flutter", percent: 70, desc: "Cross-platform toolkit", icon: "💙" },
    { name: "Firebase", percent: 80, desc: "Mobile backend platform", icon: "🔥" }
  ];

  return (
    <section id="toolkit" className="py-24 px-4 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black dark:text-white mb-4">
            My toolkit,<br />your advantage
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See how my expertise with these tools drives better results.
          </p>
        </motion.div>

        {/* Compact Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Background Progress Fill */}
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
                <motion.div
                  className="h-full accent-bg opacity-20"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tool.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1.5, 
                    delay: idx * 0.15 + 0.3,
                    ease: "easeOut"
                  }}
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-black/90 backdrop-blur-sm group-hover:border-accent/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-xl shadow-sm group-hover:shadow-accent/20 transition-all duration-300">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-black dark:text-white group-hover:text-accent transition-colors duration-300">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <motion.div 
                      className="text-3xl font-bold accent-text"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: idx * 0.15 + 0.8,
                        ease: "easeOut"
                      }}
                    >
                      {tool.percent}%
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Career() {
  const journey = [
    { year: "2024 – Present", role: "Founder & CTO", company: "WOFA", description: "Leading product development and technical strategy for flexible coworking platform" },
    { year: "2023 – 2025", role: "Mobile Dev Lead", company: "GDG & Amity E-Cell", description: "Mentoring developers and leading mobile development initiatives" },
    { year: "2023-2024", role: "Associate Mobile Developer", company: "CodeNicely", description: "Building scalable mobile applications with modern frameworks" },
    { year: "2019-2023", role: "Chapter Lead", company: "CodeChef ITM University", description: "Organizing coding competitions and building developer community" }
  ];

  return (
    <section id="career" className="py-32 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 mr-4">{"{04}"}</span>
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">— Career journey</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-8">
            Building experiences<br />across platforms
          </h2>
        </motion.div>

        {/* Journey Timeline */}
        <div className="space-y-8">
          {journey.map((item, idx) => (
            <motion.div
              key={idx}
              className="elegant-card overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Timeline Dot */}
                    <div className="lg:col-span-1 flex lg:justify-center">
                      <div className={`w-4 h-4 rounded-full ${idx === 0 ? 'accent-bg' : 'bg-gray-300 dark:bg-gray-600'}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="lg:col-span-8">
                      <h3 className="text-2xl font-bold text-black dark:text-white mb-2">
                        {item.role}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                        {item.company}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Year */}
                    <div className="lg:col-span-3 lg:text-right">
                      <span className="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>
                  </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Contact me
            </h2>
            <div className="space-y-6">
              <div>
                <div className="text-6xl font-black text-gray-900 dark:text-white mb-2">2</div>
                <p className="text-gray-600 dark:text-gray-300">Years of experience<br />in design and development</p>
              </div>
              <div className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
              <div className="text-6xl font-black text-gray-900 dark:text-white mb-2">95%</div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Client satisfaction rate<br />built on trust and results.</p>
              <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await api.get("blogposts/?ordering=-created_at&limit=4");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-32 px-4 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-gray-500 dark:text-gray-400">Loading blogs...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-32 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 mr-4">{"{05}"}</span>
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">— Latest insights</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-8">
            From my journal
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Thoughts, insights, and lessons learned from building mobile apps and working with amazing clients.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Link href={`/blogs/${blog.slug}`}>
                <div className="elegant-card overflow-hidden">
                  {/* Blog Image */}
                  {blog.cover_image && (
                    <div className="relative overflow-hidden">
                      <Image 
                        src={blog.cover_image} 
                        alt={blog.title}
                        width={600}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  {/* Blog Content */}
                  <div className="p-8">
                    {/* Date and Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-mono text-gray-500 dark:text-gray-400">
                        {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }).toUpperCase() : ""}
                      </div>
                      {blog.tags && (
                        <div className="text-sm font-mono text-gray-500 dark:text-gray-400">
                          {blog.tags.split(',')[0].trim().toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-black dark:text-white mb-4 group-hover:text-green-500 transition-colors">
                      {blog.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    {/* Read Time and Author */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {blog.estimated_read_time && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {blog.estimated_read_time}
                          </span>
                        )}
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          BY SARANSH
                        </span>
                      </div>
                      <div className="text-green-500 group-hover:text-green-400 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        {blogs.length > 0 && (
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/blogs">
              <motion.button
                className="inline-flex items-center px-8 py-4 accent-bg text-black rounded-full font-semibold text-lg accent-glow-hover"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View all posts
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>
            </Link>
          </motion.div>
        )}

        {blogs.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No blog posts available yet. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
}



function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "What services do you offer?",
      answer: "I specialize in UX/UI design, Mobile App development, and Product Consultancy for individuals and businesses."
    },
    {
      question: "How long does it take to complete a project?",
      answer: "Project timelines depend on the complexity, but most are finished within 4–8 weeks, allowing time for feedback and revisions."
    },
    {
      question: "Can I request additional revisions?",
      answer: "Yes, you can request extra revisions after the initial ones included in the package, though additional fees may apply."
    },
    {
      question: "Do you consult on tech stack and go-to-market strategy?",
      answer: "Absolutely. I advise early-stage teams on selecting the right tech stack, setting up development pipelines, and building lean products that are launch-ready—with a focus on speed, scalability, and user validation."
    },
    {
      question: "Do you build apps for both Android and iOS?",
      answer: "Yes, I build native apps using Kotlin and SwiftUI, and also cross-platform apps using Flutter for faster development."
    },
    {
      question: "Can you work with my existing team or designer?",
      answer: "Yes! I'm comfortable collaborating with other developers, designers, or business teams to make the process smooth."
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Absolutely. I can help with updates, bug fixes, and new features after your app is live."
    },
    {
      question: "What if I only need design or development?",
      answer: "No problem. I offer flexible services—whether you need just the UI/UX design or full-stack app development."
    }
  ];

  return (
    <section id="faq" className="py-32 px-4 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Section Header with Flowstep-style animation */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-8"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.25, 0.25, 0.75] }}
          >
            <motion.span 
              className="block overflow-hidden"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.25, 0.25, 0.75] }}
            >
              Frequently
            </motion.span>
            <motion.span 
              className="block overflow-hidden accent-text"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.25, 0.25, 0.75] }}
            >
              asked questions
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="elegant-card overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
                <div className="p-6">
                <div className="flex items-center justify-between">
                  <motion.h3 
                    className="text-lg font-semibold text-black dark:text-white pr-4"
                    animate={{ 
                      color: openIndex === idx ? 'var(--accent)' : undefined 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.question}
                  </motion.h3>
                  <motion.div
                    className="w-6 h-6 flex items-center justify-center"
                    animate={{ rotate: openIndex === idx ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="w-4 h-0.5 bg-black dark:bg-white absolute" />
                    <div className="w-0.5 h-4 bg-black dark:bg-white absolute" />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === idx ? "auto" : 0,
                    opacity: openIndex === idx ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 0.25, 0.25, 0.75] }}
                  className="overflow-hidden"
                >
                  <motion.div 
                    className="pt-4 text-gray-600 dark:text-gray-300 leading-relaxed"
                    initial={{ y: -20 }}
                    animate={{ y: openIndex === idx ? 0 : -20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {faq.answer}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Do you have any other questions?
          </p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-8 py-4 accent-bg text-black rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ask me directly
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// Scroll Progress Component
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// Section Wrapper with smooth transitions
function SectionWrapper({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-150px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.25, 0.25, 0.75],
        staggerChildren: 0.1 
      }}
    >
      {children}
    </motion.div>
  );
}

// Loading Screen Component - Ariostea.it Style
function LoadingScreen() {
  const [loadingPhase, setLoadingPhase] = useState(0); // 0: blank, 1: title, 2: fade up
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Phase 1: Show title after 800ms
    const phase1Timer = setTimeout(() => {
      setLoadingPhase(1);
    }, 800);

    // Phase 2: Start fade up animation after 2500ms
    const phase2Timer = setTimeout(() => {
      setLoadingPhase(2);
    }, 2500);

    // Phase 3: Complete loading after 3500ms
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
    }, 3500);

    // Listen for scroll to skip loading
    const handleScroll = () => {
      if (window.scrollY > 10) {
        clearTimeout(phase1Timer);
        clearTimeout(phase2Timer);
        clearTimeout(completeTimer);
        setIsComplete(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(completeTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: loadingPhase === 2 ? 0 : 1,
        y: loadingPhase === 2 ? -100 : 0
      }}
      transition={{ 
        duration: loadingPhase === 2 ? 1 : 0,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
    >
      {/* Phase 1 & 2: Title */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: loadingPhase >= 1 ? 1 : 0,
          y: loadingPhase === 2 ? -50 : 0
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: loadingPhase === 1 ? 0.2 : 0
        }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-8xl font-black text-white tracking-tight"
          initial={{ scale: 0.9 }}
          animate={{ 
            scale: loadingPhase >= 1 ? 1 : 0.9,
            y: loadingPhase === 2 ? -30 : 0
          }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.25, 0.25, 0.75],
            delay: loadingPhase === 1 ? 0.3 : 0
          }}
        >
          <span className="block font-light">BUILD WITH</span>
          <span className="block font-black accent-text mt-2">SARANSH</span>
        </motion.h1>
        
        <motion.div
          className="mt-8 text-gray-400 text-lg font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: loadingPhase >= 1 ? 1 : 0,
            y: loadingPhase === 2 ? -20 : 0
          }}
          transition={{ 
            duration: 0.6, 
            delay: loadingPhase === 1 ? 0.8 : 0,
            ease: "easeOut"
          }}
        >
          Mobile Developer & Designer
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Ariostea-style Footer Component
function Footer() {
  return (
    <motion.footer
      className="bg-accent text-black relative overflow-hidden w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Large Brand Text Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-[8rem] sm:text-[12rem] lg:text-[16rem] font-black text-black/10 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          build with saransh build with saransh build with saransh
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-8">
        {/* Top Section */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
            {/* Brand Section */}
            <div className="sm:col-span-1 lg:col-span-4">
              <motion.h2 
                className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                BUILD WITH SARANSH
              </motion.h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-black/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a 
                    href="mailto:saransh0111@gmail.com"
                    className="text-black/80 hover:text-black transition-colors text-sm"
                  >
                    saransh0111@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-black/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a 
                    href="tel:+918109450745"
                    className="text-black/80 hover:text-black transition-colors text-sm"
                  >
                    +91 8109450745
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation & Follow */}
            <div className="sm:col-span-2 lg:col-span-8">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-black mb-4 text-sm">NAVIGATION</h4>
                  <div className="space-y-2 text-sm">
                    <a href="#" className="block text-black/80 hover:text-black transition-colors">HOME</a>
                    <a href="/projects" className="block text-black/80 hover:text-black transition-colors">PROJECTS</a>
                    <a href="#services" className="block text-black/80 hover:text-black transition-colors">SERVICES</a>
                    <a href="#contact" className="block text-black/80 hover:text-black transition-colors">CONTACT</a>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-black mb-4 text-sm">FOLLOW</h4>
                  <div className="flex space-x-4">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                      </svg>
                    </a>
                    <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-black transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.561-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H13.96c.13 3.211 3.483 3.312 4.588 2.029h3.178zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h4.976c2.318 0 4.024 1.507 4.024 3.918 0 2.53-1.706 4.049-4.024 4.049zM2.977 9.609V7.334h1.605c1.031 0 1.605.449 1.605 1.338 0 .83-.574 1.337-1.605 1.337H2.977z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Large Brand Text */}
          <div className="mb-6">
            <motion.h1 
              className="text-[3rem] sm:text-[4rem] lg:text-[5rem] font-black text-black leading-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              build with saransh
            </motion.h1>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-black/20">
            <div className="text-black/80 text-sm">
              <p>© 2025 SARANSH NIRMALKAR</p>
            </div>
            <div className="flex space-x-6 text-sm text-black/80 mt-4 md:mt-0">
              <a href="#" className="hover:text-black transition-colors">LEGAL</a>
              <span>—</span>
              <a href="#" className="hover:text-black transition-colors">PRIVACY</a>
              <span>—</span>
              <a href="#" className="hover:text-black transition-colors">COOKIES</a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.1, 0.2]);
  
  return (
    <main className="min-h-screen bg-white dark:bg-black relative overflow-x-hidden">
      <LoadingScreen />
      <ScrollProgress />
      <Navigation />
      
      {/* Subtle parallax background */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
      </motion.div>
      
      <Hero />
      <Projects />
      <Toolkit />
      <Services />
      <BlogPreview />
      <Career />
      <FAQ />
      
      {/* Ariostea-style Footer with integrated contact */}
      <Footer />
    </main>
  );
}
