import React, { useState, useRef, useEffect } from 'react';
import { CLOUDFLARE_IMAGES_URL } from '../../utils/constants';

interface LazyImageProps {
  cfImageId: string;
  alt: string;
  className?: string;
  variant?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  cfImageId, 
  alt, 
  className = '', 
  variant = 'public' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const imageUrl = `${CLOUDFLARE_IMAGES_URL}/${cfImageId}/${variant}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={isInView ? imageUrl : undefined}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;