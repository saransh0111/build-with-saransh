"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackSrc?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  fill?: boolean;
}

const DEFAULT_FALLBACKS = [
  "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020.jpg.og.jpg",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
];

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  fallbackSrc,
  priority = false,
  style,
  fill = false
}: OptimizedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc || DEFAULT_FALLBACKS[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Try fallback or default
      const nextSrc = fallbackSrc || DEFAULT_FALLBACKS[Math.floor(Math.random() * DEFAULT_FALLBACKS.length)];
      setCurrentSrc(nextSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (!currentSrc) {
    return (
      <div 
        className={`bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center ${className}`}
        style={{ width, height, ...style }}
      >
        <div className="text-gray-400 dark:text-gray-600 text-center">
          <div className="w-12 h-12 mx-auto mb-2 opacity-50">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <p className="text-sm">Image placeholder</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      
      <Image
        src={currentSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={style}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        unoptimized={currentSrc.startsWith('http')} // For external URLs
      />
    </div>
  );
}
