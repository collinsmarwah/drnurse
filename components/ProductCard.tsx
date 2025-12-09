
import React, { useState, useEffect } from 'react';
import { Plus, ImageOff, Loader2, Eye, AlertCircle, CheckCircle2, Ban, HeartPulse, Scissors, Star, Check, CreditCard, ShoppingCart } from 'lucide-react';
import { Product, CustomizationOptions } from '../types';
import { generatePlaceholderImage } from '../services/geminiService';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, customization?: CustomizationOptions) => void;
  onBuyNow: (product: Product, customization?: CustomizationOptions) => void;
  onQuickView: (product: Product) => void;
}

const EMBROIDERY_COLORS = ['White', 'Black', 'Gold', 'Teal', 'Navy'];

const COLOR_MAP: Record<string, string> = {
  'White': 'bg-white border-gray-200',
  'Black': 'bg-gray-900 border-gray-900',
  'Gold': 'bg-amber-400 border-amber-400',
  'Teal': 'bg-teal-600 border-teal-600',
  'Navy': 'bg-blue-900 border-blue-900'
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow, onQuickView }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasError, setHasError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Customization State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [embroideryText, setEmbroideryText] = useState('');
  const [embroideryColor, setEmbroideryColor] = useState(EMBROIDERY_COLORS[0]);

  // Added Confirmation State
  const [isAdded, setIsAdded] = useState(false);

  // Rating State
  const [rating, setRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    setImgSrc(product.image);
    setHasError(false);
    setIsGenerating(false);
    setIsImageLoading(true);
    // Reset customization on product change
    setIsCustomizing(false);
    setEmbroideryText('');
    setEmbroideryColor(EMBROIDERY_COLORS[0]);
    setIsAdded(false);

    // Initialize random mock rating
    setRating(4 + Math.random());
    setReviewCount(Math.floor(Math.random() * 50) + 5);
    setUserRating(0);
  }, [product.image]);

  const handleImageError = async () => {
    if (isGenerating || imgSrc.startsWith('data:')) {
      setHasError(true);
      setIsImageLoading(false);
      return;
    }

    setIsGenerating(true);
    try {
      const generatedUrl = await generatePlaceholderImage(product.name);
      if (generatedUrl) {
        setImgSrc(generatedUrl);
        setHasError(false);
      } else {
        setHasError(true);
        // Fallback to placeholder logic inside render if generation fails entirely
      }
    } catch (error) {
      console.error("Failed to generate placeholder", error);
      setHasError(true);
    } finally {
      setIsGenerating(false);
      setIsImageLoading(false);
    }
  };

  const getCustomization = () => {
    return isCustomizing && embroideryText.trim() 
      ? { text: embroideryText, color: embroideryColor } 
      : undefined;
  };

  const handleAddToCart = () => {
    const customization = getCustomization();
    onAddToCart(product, customization);
    
    // Reset form after adding
    setIsCustomizing(false);
    setEmbroideryText('');
    setEmbroideryColor(EMBROIDERY_COLORS[0]);

    // Trigger success feedback
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    const customization = getCustomization();
    onBuyNow(product, customization);
    setIsCustomizing(false);
    setEmbroideryText('');
    setEmbroideryColor(EMBROIDERY_COLORS[0]);
  };

  const handleRate = (stars: number) => {
    setUserRating(stars);
  };

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;
  // const isCustomizable = product.category === 'Scrubs' || product.category === 'Lab Coats' || product.category === 'Uniforms'; // Unused now
  const isInvalidCustomization = isCustomizing && !embroideryText.trim();

  return (
    <article className="group relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-800">
      <div className="h-64 w-full overflow-hidden bg-gray-100 dark:bg-slate-700 group-hover:opacity-95 relative">
        
        {/* Skeleton Loader */}
        {isImageLoading && !hasError && !isGenerating && (
          <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800 animate-pulse flex items-center justify-center z-10">
             <HeartPulse className="h-10 w-10 text-slate-200 dark:text-slate-600" />
          </div>
        )}

        {!hasError && !isGenerating ? (
          <img
            src={imgSrc}
            alt={product.name}
            onError={handleImageError}
            onLoad={() => setIsImageLoading(false)}
            className={`h-full w-full object-cover object-center transform transition-all duration-500 ease-out ${isImageLoading ? 'opacity-0 blur-sm scale-110' : 'opacity-100 blur-0 scale-100 group-hover:scale-105'} ${isOutOfStock ? 'grayscale opacity-75' : ''}`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : isGenerating ? (
          <div className="h-full w-full flex items-center justify-center bg-gray-50 dark:bg-slate-700 text-teal-600 dark:text-teal-400 animate-pulse" role="status" aria-label="Generating product image">
            <div className="text-center">
                <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" aria-hidden="true" />
                <span className="text-xs font-medium">Creating product image...</span>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 animate-in fade-in duration-700" role="img" aria-label="Image unavailable">
             <img 
                src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Product placeholder"
                className="h-full w-full object-cover opacity-50 grayscale"
             />
          </div>
        )}
        
        {product.featured && !isOutOfStock && (
            <span className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm z-20">
                Bestseller
            </span>
        )}

        {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                <span className="bg-red-600 text-white px-3 py-1.5 rounded-md font-bold text-sm shadow-md">
                    Out of Stock
                </span>
            </div>
        )}

        {/* Quick View Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto bg-black/10 backdrop-blur-[1px] z-30">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="transform translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-gray-900 dark:text-white px-5 py-2.5 rounded-full shadow-lg font-medium text-sm flex items-center hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-teal-600"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-4 h-4 mr-2" />
            Quick View
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between px-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {product.name}
          </h3>
          <div className="flex items-center mt-1 space-x-1">
             <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.round(rating) ? 'fill-current' : 'text-gray-200 dark:text-gray-600'}`} />
                ))}
             </div>
             <span className="text-[10px] text-gray-400 dark:text-gray-500">({reviewCount})</span>
          </div>
        </div>
        <div className="text-right">
             <p className="text-sm font-bold text-teal-700 dark:text-teal-400" aria-label={`Price: KES ${product.price.toLocaleString()}`}>
                KES {product.price.toLocaleString()}
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{product.category}</p>
        </div>
      </div>
      <div className="px-4 pb-2">
         <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[2.5rem] mt-2">
            {product.description}
         </p>
      </div>

      <div className="mt-auto px-4 pb-4 pt-2">
        {/* Customization Section Removed */}

        {/* Stock Level Indicator */}
        <div className="mb-3">
            {isOutOfStock ? (
                <div className="flex items-center text-xs text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20 px-2 py-1.5 rounded-full w-fit">
                   <Ban className="w-3 h-3 mr-1.5" />
                   Unavailable
                </div>
            ) : isLowStock ? (
                <div className="flex items-center text-xs text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-900/20 px-2 py-1.5 rounded-full w-fit animate-pulse">
                   <AlertCircle className="w-3 h-3 mr-1.5" />
                   Only {product.stock} left in stock!
                </div>
            ) : (
                <div className="flex items-center text-xs text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1.5 rounded-full w-fit">
                   <CheckCircle2 className="w-3 h-3 mr-1.5" />
                   In Stock ({product.stock})
                </div>
            )}
        </div>

        {userRating > 0 ? (
            <div className="mb-4 text-center animate-in fade-in zoom-in">
                <p className="text-xs font-medium text-teal-700 dark:text-teal-400 mb-1">Thanks for rating!</p>
                <div className="flex justify-center text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= userRating ? 'fill-current' : 'text-gray-200 dark:text-gray-600'}`} />
                    ))}
                </div>
            </div>
        ) : isAdded && !isOutOfStock ? (
             <div className="mb-4 text-center animate-in fade-in">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Rate this product:</p>
                <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button 
                            key={star}
                            onClick={() => handleRate(star)}
                            className="text-gray-300 dark:text-gray-600 hover:text-yellow-400 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm"
                            aria-label={`Rate ${star} out of 5 stars`}
                        >
                            <Star className="w-5 h-5 fill-current" />
                        </button>
                    ))}
                </div>
             </div>
        ) : null}

        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isInvalidCustomization || isAdded}
                aria-label={isAdded ? "Item added to cart" : `Add ${product.name} to cart`}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 border dark:focus:ring-offset-slate-800 ${
                    isOutOfStock || isInvalidCustomization
                    ? 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-slate-800 dark:border-slate-600 dark:text-gray-500 cursor-not-allowed' 
                    : isAdded 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300'
                        : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                }`}
            >
                {isAdded ? (
                    <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        <span>Added</span>
                    </div>
                ) : (
                    <>
                        <ShoppingCart className="h-4 w-4 mr-1.5" aria-hidden="true" />
                        Add
                    </>
                )}
            </button>

            <button
                onClick={handleBuyNow}
                disabled={isOutOfStock || isInvalidCustomization || isAdded}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-sm dark:focus:ring-offset-slate-800 ${
                    isOutOfStock || isInvalidCustomization
                    ? 'bg-gray-100 text-gray-400 dark:bg-slate-700 dark:text-gray-500 cursor-not-allowed' 
                    : 'bg-teal-600 text-white hover:bg-teal-700 dark:hover:bg-teal-500'
                }`}
            >
                <CreditCard className="h-4 w-4 mr-1.5" />
                Buy Now
            </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
