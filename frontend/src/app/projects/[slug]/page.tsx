"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import api from "@/lib/api";
import OptimizedImage from "@/components/OptimizedImage";
import Image from "next/image";
import { useParams } from "next/navigation";

function AdvancedSectionRenderer({ section, index }: { section: any; index: number }) {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: index * 0.05 } },
  };
  const itemVariants: any = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.25, 0.25, 0.75] } },
  };

  // Horizontal scroller ref (used when section renders a carousel)
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const themeClass =
    section.theme === 'dark' ? 'bg-black text-white' : section.theme === 'accent' ? 'bg-accent/10' : 'bg-white dark:bg-black';

  switch (section.type) {
    case "heading":
      return (
        <motion.section className={`py-16 px-4 text-center ${themeClass}`} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {section.title && (
            <motion.h2 className="text-4xl md:text-6xl font-bold" variants={itemVariants}>{section.title}</motion.h2>
          )}
          {section.subtitle && (
            <motion.p className="text-xl text-gray-600 dark:text-gray-300 mt-4" variants={itemVariants}>{section.subtitle}</motion.p>
          )}
          {section.cta_text && section.cta_url && (
            <motion.a href={section.cta_url} className="inline-flex items-center mt-6 px-6 py-3 accent-bg text-black rounded-full font-semibold" variants={itemVariants}>
              {section.cta_text}
            </motion.a>
          )}
        </motion.section>
      );
    case "paragraph":
      return (
        <motion.section className={`py-16 px-4 ${themeClass}`} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="max-w-6xl mx-auto">
            {(section.title || section.subtitle) && (
              <div className="text-center mb-8">
                {section.title && <motion.h3 className="text-3xl md:text-5xl font-bold" variants={itemVariants}>{section.title}</motion.h3>}
                {section.subtitle && <motion.p className="text-lg text-gray-600 dark:text-gray-300 mt-3" variants={itemVariants}>{section.subtitle}</motion.p>}
              </div>
            )}
            {section.content && (
              <motion.p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto" variants={itemVariants}>{section.content}</motion.p>
            )}
            {/* Optional Tiles — centered grid (not scroll) */}
            {Array.isArray(section.tiles) && section.tiles.length > 0 && (
              <div className="mt-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {section.tiles.map((t: any) => (
                    <TileCard key={t.id || t.title} tile={t} />
                  ))}
                </div>
              </div>
            )}
            {/* Optional Specs grid */}
            {Array.isArray(section.specs) && section.specs.length > 0 && (
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {section.specs.map((s: any) => (
                  <div key={s.id || s.label} className="elegant-card p-6 text-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
                    <div className="text-2xl font-bold mt-1 text-black dark:text-white">{s.value}</div>
                  </div>
                ))}
              </div>
            )}
            {/* Optional FAQs */}
            {Array.isArray(section.faqs) && section.faqs.length > 0 && (
              <div className="mt-10 space-y-3 max-w-3xl mx-auto">
                {section.faqs.map((f: any) => (
                  <FAQItem key={f.id || f.question} faq={f} />
                ))}
              </div>
            )}
            {section.cta_text && section.cta_url && (
              <div className="mt-8 text-center">
                <a href={section.cta_url} className="inline-flex items-center px-6 py-3 accent-bg text-black rounded-full font-semibold">{section.cta_text}</a>
              </div>
            )}
          </div>
        </motion.section>
      );
    case "metrics":
      return (
        <motion.section className="py-20 px-4 bg-gray-50" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="max-w-6xl mx-auto">
            {section.content && (
              <motion.h3 className="text-3xl md:text-5xl font-bold text-center mb-12" variants={itemVariants}>{section.content}</motion.h3>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {(section.metrics || []).map((m: any) => (
                <motion.div key={m.id || m.label} className="text-center" variants={itemVariants}>
                  <div className="text-3xl md:text-4xl font-bold">{m.value}</div>
                  <div className="text-gray-600 mt-1">{m.label}</div>
                  {m.description && <div className="text-gray-400 text-sm mt-1">{m.description}</div>}
                  </motion.div>
                ))}
            </div>
          </div>
        </motion.section>
      );
    case "media_tabs": {
      const tabs = Array.isArray(section.media_tabs) ? section.media_tabs : [];
      const [active, setActive] = useState<number>(0);
      const handleSelect = (idx: number) => {
        if (idx === active) return;
        // Simultaneous close/open for smoothness
        setActive(idx);
      };
      const activeTab = active >= 0 && active < tabs.length ? tabs[active] : null;
      return (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: simple accordion list */}
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {tabs.map((t: any, idx: number) => {
                  const isActive = idx === active;
                  return (
                    <div key={t.id || t.title}>
                      <button
                        onClick={() => handleSelect(idx)}
                        className="w-full text-left py-6 flex items-center justify-between px-4 rounded-lg transition-all"
                        aria-expanded={isActive}
                      >
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
                            {t.title}
                          </h3>
                        </div>
                        <svg className={`w-6 h-6 text-gray-400 transition-transform ${isActive ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                      </button>
                      <div className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="px-4 pb-6 min-h-0">
                          {t.description && (
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{t.description}</p>
                          )}
                          {/* Mobile: show media directly under description when open */}
                          {isActive && t.image && (
                            <div className="mt-4 lg:hidden rounded-2xl overflow-hidden">
                              <OptimizedImage src={t.image} alt={t.title} width={1200} height={900} className="w-full h-auto" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: sticky media (desktop only) */}
              <div className="hidden lg:block lg:sticky lg:top-20">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <div className="aspect-[4/3] relative">
                    {activeTab ? (
                      <OptimizedImage src={activeTab.image} alt={activeTab.title} width={1200} height={900} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-500 dark:text-gray-400">Select a section to view related content</div>
                      </div>
                    )}
                    {activeTab && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />}
                  </div>
                  {activeTab && (
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-2xl p-4">
                        <h4 className="font-semibold text-black dark:text-white">{activeTab.title}</h4>
                        {(activeTab.subtitle || activeTab.description) && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activeTab.subtitle || activeTab.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* Dots */}
                {tabs.length > 1 && (
                  <div className="mt-6 flex justify-center gap-2">
                    {tabs.map((_: any, i: number) => (
                      <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all ${active === i ? 'bg-blue-600 w-8' : 'bg-gray-300 dark:bg-gray-600 w-2'}`} aria-label={`Go to ${i+1}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    }
    case "features":
      const titleRef = useRef<HTMLHeadingElement | null>(null);
      const [leadSpacer, setLeadSpacer] = useState<number>(0);

      useEffect(() => {
        const computeLead = () => {
          if (titleRef.current) {
            const titleStyle = getComputedStyle(titleRef.current);
            const titlePadLeft = parseFloat(titleStyle.paddingLeft || '0');
            setLeadSpacer(Math.max(16, Math.round(titlePadLeft)));
          } else {
            // Fallbacks matching pl classes: pl-10, sm:pl-12, md:pl-20, lg:pl-24
            const w = window.innerWidth;
            let pad = 40; // pl-10 = 2.5rem
            if (w >= 640) pad = 48; // sm
            if (w >= 768) pad = 80; // md
            if (w >= 1024) pad = 96; // lg
            setLeadSpacer(pad);
          }
        };
        computeLead();
        window.addEventListener('resize', computeLead);
        return () => window.removeEventListener('resize', computeLead);
      }, []);

      const scrollByCard = (dir: number) => {
        const scroller = scrollerRef.current;
        if (!scroller) return;
        const card = scroller.querySelector('[data-feature-card]') as HTMLElement | null;
        const gap = 24; // matches md:gap-6
        const amount = card ? card.offsetWidth + gap : Math.min(window.innerWidth * 0.8, 420);
        scroller.scrollBy({ left: dir * amount, behavior: 'smooth' });
      };
      return (
        <motion.section className="py-20 px-0" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="max-w-none">
            {section.content && (
              <motion.h3
                ref={titleRef}
                className="pl-10 sm:pl-12 md:pl-20 lg:pl-24 pr-6 md:pr-12 text-3xl md:text-5xl font-bold mb-8 md:mb-12"
                variants={itemVariants}
              >
                {section.content}
              </motion.h3>
            )}
            <div className="relative">
              <div
                ref={scrollerRef}
                className="overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12"
                style={{ paddingLeft: leadSpacer, paddingRight: '3rem', scrollPaddingLeft: leadSpacer, scrollPaddingRight: '3rem' }}
              >
                <div className="flex gap-4 md:gap-6 w-max items-stretch">
                  {(section.features || []).map((f: any) => (
                    <FeatureCard key={f.id || f.title} feature={f} />
                  ))}
                  {/* Trailing spacer to keep last card off the edge */}
                  <div style={{ width: Math.max(leadSpacer, 40) }} className="flex-shrink-0" aria-hidden="true" />
                </div>
              </div>
              {/* Scroll arrows bottom-right */}
              <div className="hidden md:flex gap-2 absolute -bottom-16 right-6">
                <button
                  aria-label="Scroll left"
                  className="w-10 h-10 rounded-full bg-white text-gray-700 shadow border border-gray-200 flex items-center justify-center hover:shadow-md"
                  onClick={() => scrollByCard(-1)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button
                  aria-label="Scroll right"
                  className="w-10 h-10 rounded-full bg-white text-gray-700 shadow border border-gray-200 flex items-center justify-center hover:shadow-md"
                  onClick={() => scrollByCard(1)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      );
    case "image":
      return (
        <motion.section className={`py-16 px-4 ${themeClass}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-6xl mx-auto">
            <OptimizedImage src={section.image} alt={section.caption || "Project image"} width={1600} height={900} className="w-full h-auto" />
          </div>
          {section.caption && <p className="text-center text-gray-500 mt-3">{section.caption}</p>}
        </motion.section>
      );
    case "gallery":
      return (
        <motion.section className={`py-16 px-4 ${themeClass}`} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {(section.extra?.images || []).map((img: string, idx: number) => (
              <motion.div key={idx} variants={itemVariants} className="rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage src={img} alt={`Gallery ${idx + 1}`} width={1200} height={800} className="w-full h-auto" />
        </motion.div>
            ))}
          </div>
        </motion.section>
      );
    case "video":
      return (
        <motion.section className="py-16 px-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <video src={section.video} controls className="w-full h-auto" />
          </div>
        </motion.section>
      );
    case "quote":
      return (
        <motion.section className={`py-16 px-4 ${themeClass}`} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <blockquote className="max-w-4xl mx-auto border-l-4 border-gray-200 pl-6 italic text-gray-700 text-xl">
            {section.content}
          </blockquote>
        </motion.section>
      );
    case "list":
      return (
        <motion.section className="py-16 px-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="max-w-3xl mx-auto">
            {section.title && (
              <motion.h3 className="text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white" variants={itemVariants}>
                {section.title}
              </motion.h3>
            )}
            {section.content && (
              <motion.p className="text-lg text-gray-600 dark:text-gray-300 mb-6" variants={itemVariants}>
                {section.content}
              </motion.p>
            )}
            <div className="space-y-3 text-lg md:text-xl">
              {(section.faqs || []).map((f: any) => (
                <FAQItem key={f.id || f.question} faq={f} />)
              )}
            </div>
          </div>
        </motion.section>
      );
    default:
      return null;
  }
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  useEffect(() => {
    async function fetchProject() {
        if (!slug) return;
        const res = await api.get(`/projects/${slug}/`);
        setProject(res.data);
        setLoading(false);
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  );
  }

  if (!project) {
    return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <a href="/projects" className="inline-block px-8 py-4 accent-bg text-black rounded-full font-semibold">Back to Projects</a>
      </div>
    </div>
  );
  }

  return (
    <main className="bg-white dark:bg-black">
      {/* Apple-inspired hero with subtle accent background */}
      <motion.section className="relative overflow-hidden md:min-h-[100svh] pt-24 pb-6 sm:py-16 md:py-28 flex items-center" style={{ opacity: heroOpacity, y: heroY }}>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50 dark:from-black dark:via-black dark:to-gray-950" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] rounded-full bg-accent/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="group mx-auto max-w-6xl w-full rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
            <div className="relative aspect-[16/9] w-full bg-black">
              {project.video_url ? (
                <video src={project.video_url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <OptimizedImage src={project.hero_image} alt={project.title} fill className="absolute inset-0 w-full h-full object-cover" priority />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/8 to-transparent" />
              {/* Chips over media (top-left) */}
              <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2">
                {project.client && <span className="px-2.5 py-1 rounded-full bg-black/45 text-white text-[11px] border border-white/20 backdrop-blur-sm">{project.client}</span>}
                {project.industry && <span className="px-2.5 py-1 rounded-full bg-black/45 text-white text-[11px] border border-white/20 backdrop-blur-sm">{project.industry}</span>}
                {project.date && <span className="px-2.5 py-1 rounded-full bg-black/45 text-white text-[11px] border border-white/20 backdrop-blur-sm">{project.date}</span>}
              </div>
              {/* Curved banner (Variant D) refined to match navbar glass – desktop/tablet */}
              <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="relative w-full sm:w-auto sm:max-w-none rounded-[18px] sm:rounded-[26px] bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/10 dark:border-white/5 p-3 sm:p-4 md:p-6 overflow-hidden">
                  {/* Softer, less shiny sheen and grain to match navbar */}
                  <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(45deg,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:12px_12px] rounded-[26px]" />

                    <div className="flex items-center gap-3 mb-3 md:mb-4 relative">
                    {project.logo && (<DynamicLogoPill src={project.logo} />)}
                    <h3 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]">{project.title}</h3>
                  </div>
                  
                  {/* CTA in top-right */}
                  {project.website_url && (
          <motion.a 
                      href={project.website_url}
                      target="_blank"
                      className="absolute top-3 right-3 inline-flex items-center px-3 sm:px-4 py-2 rounded-full font-semibold text-xs text-black bg-[var(--accent)] hover:brightness-110 transition shadow overflow-hidden"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">Visit website</span>
                      <motion.svg className="ml-2 w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                      <span className="absolute inset-0 rounded-full opacity-0 animate-[pulse_2s_ease-in-out_infinite]" style={{ boxShadow: '0 0 0 2px rgba(0,255,136,0.35)' }} />
          </motion.a>
                  )}
                  <div className="relative mt-8 sm:mt-1 pr-0">
                    <p className="text-white/90 text-sm md:text-base w-full line-clamp-3">{project.short_description}</p>
                  </div>
                </div>
              </div>

              {/* Mobile-only: separate card below media with blurred thumbnail background */}
              <div className="block sm:hidden relative">
                <div className="mt-3 px-3">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-xl p-4">
                    {/* Background thumbnail inside the glass */}
                    <OptimizedImage src={project.hero_image} alt={`${project.title} background`} fill className="absolute inset-0 w-full h-full object-cover blur-sm opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10" />
                    <div className="relative">
                      {/* CTA top-right */}
                      {project.website_url && (
            <motion.a
                          href={project.website_url}
              target="_blank"
                          className="absolute top-3 right-3 inline-flex items-center px-3 py-2 rounded-full font-semibold text-[11px] text-black bg-[var(--accent)] hover:brightness-110 transition shadow"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10">Visit website</span>
                          <motion.svg className="ml-2 w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </motion.svg>
            </motion.a>
          )}
                      {/* Logo + title */}
                      <div className="flex items-center gap-3 mb-2">
                        {project.logo && (<DynamicLogoPill src={project.logo} />)}
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      </div>
                      
                      {/* Description full width, clamped */}
                      <p className="text-white/90 text-sm line-clamp-3 w-full">{project.short_description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>


      

      {/* Sections */}
      <div className="relative z-10">
        {(project.sections || []).map((section: any, idx: number) => (
          <AdvancedSectionRenderer key={idx} section={section} index={idx} />
        ))}
      </div>

      {/* Footer from homepage reused here */}
      <footer className="bg-accent text-black relative overflow-hidden w-full mt-16">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[6rem] sm:text-[10rem] lg:text-[14rem] font-black text-black/10 whitespace-nowrap animate-[scrollLinear_30s_linear_infinite]">
            build with saransh build with saransh build with saransh
          </div>
        </div>
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-8">
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
              <div className="sm:col-span-1 lg:col-span-4">
                <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight">BUILD WITH SARANSH</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <a href="mailto:saransh0111@gmail.com" className="text-black/80 hover:text-black transition-colors text-sm">saransh0111@gmail.com</a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a href="tel:+918109450745" className="text-black/80 hover:text-black transition-colors text-sm">+91 8109450745</a>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-black mb-4 text-sm">NAVIGATION</h4>
                    <div className="space-y-2 text-sm">
                      <a href="/" className="block text-black/80 hover:text-black transition-colors">HOME</a>
                      <a href="/projects" className="block text-black/80 hover:text-black transition-colors">PROJECTS</a>
                      <a href="/#services" className="block text-black/80 hover:text-black transition-colors">SERVICES</a>
                      <a href="/#contact" className="block text-black/80 hover:text-black transition-colors">CONTACT</a>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-4 text-sm">FOLLOW</h4>
                    <div className="flex space-x-4">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-black transition-colors">LinkedIn</a>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-black transition-colors">GitHub</a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-black/80 hover:text-black transition-colors">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h1 className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.5rem] font-black text-black leading-none">build with saransh</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-black/20">
              <div className="text-black/80 text-sm"><p>© 2025 SARANSH NIRMALKAR</p></div>
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
      </footer>
    </main>
  );
}

function DynamicLogoPill({ src }: { src: string }) {
  // Full-bleed logo in the ball with safe padding, animated stroke ring.
  return (
    <div className="relative w-12 h-12 rounded-full bg-white/90 dark:bg-black/80 border border-white/10 overflow-hidden flex items-center justify-center">
      <img src={src} alt="logo" className="w-full h-full object-contain p-1.5" />
      {/* Animated stroke ring */}
      <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/30 animate-[pulse_2s_ease-in-out_infinite]" />
    </div>
  );
}

function FeatureCard({ feature }: { feature: any }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        data-feature-card
        className={`relative overflow-hidden text-left w-[76vw] sm:w-[48vw] md:w-[38vw] lg:w-[30vw] xl:w-[26vw] max-w-[420px] snap-start rounded-3xl border border-gray-800/30 ${feature.background_color || 'bg-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Aspect ratio: tall portrait (approx 3:5) or square */}
        <div className={`${feature.style === 'portrait' ? 'aspect-[3/5]' : 'aspect-square'} relative`}>
          {/* Background image/color */}
          {feature.background_image ? (
            <Image src={feature.background_image} alt="" width={800} height={1066} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="relative p-6 h-full flex flex-col items-start gap-3">
            <div className="text-3xl">
          {feature.icon_image ? (
            <Image src={feature.icon_image} alt={feature.title} width={40} height={40} className="w-10 h-10 object-contain" />
          ) : (
            <span>{feature.icon_text || "✨"}</span>
          )}
            </div>
            <div>
              {/* Category label small */}
              {feature.category && <div className="text-xs text-white/80 mb-1">{feature.category}</div>}
              <h4 className={`text-2xl md:text-3xl font-bold leading-tight mb-1 ${feature.text_color || 'text-white'}`}>{feature.title}</h4>
              {feature.description && <p className="text-white/90 text-sm">{feature.description}</p>}
            </div>
            {/* Plus icon bottom-right */}
            <div className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-white/90 text-black flex items-center justify-center shadow-md">+</div>
          </div>
        </div>
      </motion.button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <motion.div
            className="relative z-10 max-w-3xl w-[92vw] bg-white dark:bg-black rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">{feature.modal_title || feature.title}</h3>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-black dark:hover:text-white">✕</button>
              </div>
              {feature.modal_description && (
                <p className="text-gray-600 dark:text-gray-300 mt-3">{feature.modal_description}</p>
              )}
              {feature.modal_image && (
                <div className="mt-6 rounded-2xl overflow-hidden">
                  <Image src={feature.modal_image} alt={feature.title} width={1200} height={675} className="w-full h-auto" />
                </div>
              )}
              {feature.modal_video_url && (
                <div className="mt-6 rounded-2xl overflow-hidden">
                  <video src={feature.modal_video_url} controls className="w-full h-auto" />
            </div>
              )}
              {feature.modal_content && (
                <div className="prose dark:prose-invert mt-6" dangerouslySetInnerHTML={{ __html: feature.modal_content }} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

function TileCard({ tile }: { tile: any }) {
  return (
    <div className="elegant-card p-6 w-80">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{tile.icon_image ? <Image src={tile.icon_image} alt="" width={24} height={24} /> : tile.icon_text || "⬤"}</div>
        <div>
          <div className="text-lg font-semibold text-black dark:text-white">{tile.title}</div>
          {tile.body && <div className="text-gray-600 dark:text-gray-300 mt-1 text-sm">{tile.body}</div>}
          {tile.action_text && tile.action_url && (
            <a href={tile.action_url} className="inline-flex items-center text-sm mt-3 accent-text hover:underline">{tile.action_text}</a>
          )}
          </div>
      </div>
    </div>
  );
}

function FAQItem({ faq }: { faq: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="elegant-card p-4">
      <button onClick={() => setOpen(!open)} className="w-full text-left flex items-center justify-between">
        <span className="font-medium text-black dark:text-white">{faq.question}</span>
        <span className="text-gray-500">{open ? '–' : '+'}</span>
      </button>
      {open && <div className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</div>}
    </div>
  );
}
