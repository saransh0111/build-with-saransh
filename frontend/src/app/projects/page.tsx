"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/api";
import OptimizedImage from "@/components/OptimizedImage";

export default function ProjectsPage() {
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

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-black py-20 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500 dark:text-gray-400">Loading projects...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white dark:bg-black py-24 px-4">
        <div className="max-w-6xl mx-auto text-center text-red-500">{error}</div>
      </main>
    );
  }

  return (
      <main className="min-h-screen bg-white dark:bg-black py-20 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 mr-4">{"{01}"}</span>
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">— All projects</span>
          </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-3 sm:mb-4">
            Works
          </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            A selection of client projects and experiments where I blend clarity, craft, and engineering.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project: any, idx: number) => (
              <motion.div
                key={project.id || project.slug || idx}
                  className="group elegant-card overflow-hidden rounded-2xl sm:rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <OptimizedImage
                      src={project.hero_image}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                    {/* Meta */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-start justify-between">
                      <div className="text-white text-sm font-mono bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {project.date && new Date(project.date).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" })}
                      </div>
                      <div className="text-white text-xs bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {project.industry || "Mobile App"}
                      </div>
                    </div>
                  </div>

                    <div className="p-6 sm:p-8">
                    <div className="mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white group-hover:accent-text transition-colors duration-300 mb-2">
                        {project.title}
                      </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                        {project.short_description}
                      </p>
                    </div>

                      <div className="flex items-center text-sm accent-text group-hover:underline">
                      <span>View case study</span>
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">No projects found.</div>
        )}

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link href="/" className="inline-block px-8 py-4 accent-bg text-black rounded-full font-semibold accent-glow-hover">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}


