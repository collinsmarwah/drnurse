
import React, { forwardRef, useState, useMemo } from 'react';
import { Maximize, X, ArrowRight } from 'lucide-react';
import { GALLERY_IMAGES } from '../constants';

interface GalleryProps {
  preview?: boolean;
  onViewAll?: () => void;
}

const Gallery = forwardRef<HTMLElement, GalleryProps>(({ preview = false, onViewAll }, ref) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Safety check in case constants are undefined or empty
  const images = GALLERY_IMAGES || [];

  const categories = useMemo(() => {
    if (!images.length) return ['All'];
    const cats = new Set(images.map(img => img.category));
    return ['All', ...Array.from(cats)];
  }, [images]);

  const filteredImages = useMemo(() => {
    if (!images.length) return [];
    if (preview) {
      // Display only the first 4 images for the homepage preview
      return images.slice(0, 4);
    }
    // For the full gallery page, display ALL images (including the first 4)
    if (activeFilter === 'All') return images;
    return images.filter(img => img.category === activeFilter);
  }, [activeFilter, preview, images]);

  return (
    <section id="gallery" ref={ref} className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none dark:opacity-[0.05]">
          <svg width="100%" height="100%">
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm">Portfolio</span>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6 mt-2">
            {preview ? 'Recent Work' : 'Our Work Gallery'}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {preview 
              ? "A glimpse of our premium medical attire in real-world settings."
              : "Explore our complete collection of premium medical attire. From the operating room to the clinic, see how professionals style Dr. Nurse Collections."
            }
          </p>
        </div>

        {/* Filter Buttons - Hide in preview mode */}
        {!preview && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === cat
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid Layout - Responsive: 1 col mobile, 2 col sm, 3 col md, 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              style={{ aspectRatio: '3/4' }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-2 py-1 bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-2 backdrop-blur-sm">
                    {image.category}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {image.title}
                  </h3>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-blue-900">
                  <Maximize className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredImages.length === 0 && (
            <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-700">
                <p className="text-gray-500 dark:text-gray-400">No images found for this category.</p>
            </div>
        )}

        {/* View All Button - Only in preview mode */}
        {preview && onViewAll && (
          <div className="mt-12 text-center">
            <button
              onClick={onViewAll}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-10 w-10" />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Gallery preview" 
            className="max-h-[90vh] max-w-full rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
});

Gallery.displayName = 'Gallery';

export default Gallery;
