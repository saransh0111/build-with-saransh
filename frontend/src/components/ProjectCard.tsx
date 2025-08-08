"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  slug: string;
  short_description: string;
  website_link?: string;
}

export default function ProjectCard({
  title,
  slug,
  short_description,
  website_link,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <motion.div
        className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-6 hover:scale-[1.02] transition-all shadow-xl cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-300 mb-4">{short_description}</p>
        {website_link && (
          <p className="text-blue-400 underline text-sm">Visit Site ↗</p>
        )}
      </motion.div>
    </Link>
  );
}
