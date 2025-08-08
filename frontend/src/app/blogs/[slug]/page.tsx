"use client";

import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import api from "@/lib/api";

export default function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await api.get(`/blogposts/${resolvedParams.slug}/`);
        setBlog(res.data);
      } catch (err) {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [resolvedParams.slug]);

  if (loading) return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="animate-pulse">Loading blog post...</div>
      </div>
    </main>
  );

  if (error || !blog) return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <a href="/" className="inline-block px-6 py-3 bg-black text-white rounded-full font-semibold shadow hover:bg-gray-900 transition">
          Back to Home
        </a>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Blog Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <div className="text-sm text-gray-500 mb-2">
            {blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) : ''}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
          {blog.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{blog.excerpt}</p>
          )}
          {blog.estimated_read_time && (
            <div className="text-sm text-gray-500 mb-6">{blog.estimated_read_time}</div>
          )}
          {blog.cover_image && (
            <Image 
              src={blog.cover_image} 
              alt={blog.title} 
              width={900} 
              height={400} 
              className="rounded-xl mb-6" 
            />
          )}
        </motion.div>

        {/* Blog Content */}
        <motion.div 
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div dangerouslySetInnerHTML={{ __html: blog.content || '' }} />
        </motion.div>

        {/* Tags */}
        {blog.tags && (
          <motion.div 
            className="flex flex-wrap gap-2 mt-8"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {blog.tags.split(',').map((tag: string, idx: number) => (
              <span 
                key={idx} 
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </motion.div>
        )}

        {/* Back to Blog */}
        <div className="mt-16 text-center">
          <a 
            href="/#blog" 
            className="inline-block px-6 py-3 bg-black text-white rounded-full font-semibold shadow hover:bg-gray-900 transition"
          >
            Back to Journal
          </a>
        </div>
      </div>
    </main>
  );
}
