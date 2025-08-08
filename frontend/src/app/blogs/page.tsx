"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await api.get("blogposts/?ordering=-created_at");
        setBlogs(res.data);
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-white dark:bg-black py-20 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto text-center text-gray-500 dark:text-gray-400">Loading blogs...</div>
    </main>
  );

  if (error) return (
    <main className="min-h-screen bg-white dark:bg-black py-20 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto text-center text-red-500">{error}</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-white dark:bg-black py-20 sm:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center mb-6">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 mr-4">{"{02}"}</span>
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">— All posts</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white mb-3 sm:mb-4">Blogs</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Thoughts, insights, and lessons learned from building mobile apps and working with clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {blogs.map((blog: any, idx: number) => (
            <Link key={blog.id || blog.slug} href={`/blogs/${blog.slug}`}>
              <motion.article
                className="group elegant-card overflow-hidden cursor-pointer rounded-2xl sm:rounded-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {blog.cover_image && (
                  <div className="relative overflow-hidden">
                    <Image 
                      src={blog.cover_image} 
                      alt={blog.title}
                      width={800}
                      height={400}
                      className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[11px] sm:text-xs font-mono text-gray-500 dark:text-gray-400">
                      {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase() : ""}
                    </div>
                    {blog.tags && (
                      <div className="text-[11px] sm:text-xs font-mono text-gray-500 dark:text-gray-400">
                        {blog.tags.split(',')[0].trim().toUpperCase()}
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3 group-hover:text-green-500 transition-colors">{blog.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm sm:text-base">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {blog.estimated_read_time && (
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{blog.estimated_read_time}</span>
                      )}
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">BY SARANSH</span>
                    </div>
                    <div className="text-green-500 group-hover:text-green-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">No blog posts found.</div>
        )}

        <div className="mt-16 text-center">
          <Link href="/" className="inline-block px-8 py-4 accent-bg text-black rounded-full font-semibold accent-glow-hover">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
