
import React, { useState, useEffect } from 'react';
import { Plus, Loader2, Eye, AlertCircle, CheckCircle2, Ban, HeartPulse, Scissors, Star, Check, CreditCard, ShoppingCart, Minus } from 'lucide-react';
import { Product, CustomizationOptions } from '../types';
import { generatePlaceholderImage } from '../services/geminiService';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, customization?: CustomizationOptions, quantity?: number) => void;
  onBuyNow: (product: Product, customization?: CustomizationOptions, quantity?: number) => void;
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

const PRODUCT_COLORS = ['#2563eb', '#1e3a8a', '#10b981', '#1f2937', '#ffffff', '#8b5cf6'];

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onBuyNow, onQuickView }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [hasError, setHasError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Quantity State
  const [quantity, setQuantity] = useState(1);

  // Customization State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [embroideryText, setEmbroideryText] = useState('');
  const [embroideryColor, setEmbroideryColor] = useState(EMBROIDERY_COLORS[0]);

  // Added Confirmation State
  const [isAdded, setIsAdded] = useState(false);

  // Rating State
  const [rating, setRating] = useState(product.rating || 0);
  const [reviewCount, setReviewCount] = useState(product.reviews || 0);

  useEffect(() => {
    setImgSrc(product.image);
    setHasError(false);
    setIsGenerating(false);
    setIsImageLoading(true);
    setIsAdded(false);
    setQuantity(1);
    
    // Reset customization
    setIsCustomizing(false);
    setEmbroideryText('');
    setEmbroideryColor(EMBROIDERY_COLORS[0]);

    setRating(product.rating || 4.5);
    setReviewCount(product.reviews || Math.floor(Math.random() * 50) + 5);
  }, [product.image, product.rating, product.reviews]);

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
      }
    } catch (error) {
      console.error("Failed to generate placeholder", error);
      setHasError(true);
    } finally {
      setIsGenerating(false);
      setIsImageLoading(false);
    }
  };

  const handleAddToCart = () => {
    const customization = isCustomizing && embroideryText.trim() 
        ? { text: embroideryText, color: embroideryColor } 
        : undefined;

    onAddToCart(product, customization, quantity);
    
    // Reset form
    setQuantity(1);
    setIsCustomizing(false);
    setEmbroideryText('');
    setEmbroideryColor(EMBROIDERY_COLORS[0]);

    // Trigger success feedback
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
    }, 2000);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-slate-800 rounded-lg overflow-hidden transition-all duration-300">
      <div className="relative aspect-[4/5] bg-gray-100 dark:bg-slate-700 overflow-hidden rounded-lg mb-3">
        
        {/* Skeleton Loader */}
        {!hasError && !isGenerating && (
            <div 
                className={`absolute inset-0 bg-gray-100 dark:bg-slate-800 flex items-center justify-center z-10 transition-opacity duration-700 ease-in-out ${
                    isImageLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-slate-700"></div>
                <div className="bg-white/50 dark:bg-slate-600/50 h-16 w-16 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm relative">
                    <HeartPulse className="h-8 w-8 text-gray-400 dark:text-slate-400" />
                </div>
            </div>
        )}

        {!hasError && !isGenerating ? (
          <img
            src={imgSrc}
            alt={product.name}
            onError={handleImageError}
            onLoad={() => setIsImageLoading(false)}
            className={`h-full w-full object-cover object-center transform transition-all duration-700 ease-in-out group-hover:scale-105 ${
                isImageLoading ? 'scale-110 blur-xl' : 'scale-100 blur-0'
            } ${isOutOfStock ? 'grayscale opacity-75' : ''}`}
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500">
             <HeartPulse className="h-12 w-12 opacity-50" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1 z-20">
            {product.featured && !isOutOfStock && (
                <span className="bg-white text-blue-800 text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm border border-gray-100">
                    Best Seller
                </span>
            )}
             {!product.featured && !isOutOfStock && (
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
                    New
                </span>
            )}
            {product.stock > 0 && product.stock < 5 && (
                 <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
                    Low Stock
                 </span>
            )}
        </div>

        {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                <span className="bg-gray-900 text-white px-3 py-1.5 font-bold text-sm shadow-md">
                    Out of Stock
                </span>
            </div>
        )}

        {/* Quick Actions */}
        {!isOutOfStock && (
            <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center space-x-2">
                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-white text-gray-900 font-bold py-2 px-4 rounded shadow-lg hover:bg-gray-100 text-sm flex items-center justify-center"
                >
                   {isAdded ? <CheckCircle2 className="w-4 h-4 mr-1 text-green-600" /> : <Plus className="w-4 h-4 mr-1" />}
                   {isAdded ? "Added" : "Add to Cart"}
                </button>
            </div>
        )}
        
        <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-gray-700 shadow-sm z-20"
            title="Quick View"
        >
            <Eye className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
            {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">
            {product.category}
        </p>

        <div className="flex items-center justify-between mt-auto">
             <p className="text-base font-bold text-gray-900 dark:text-white">
                ${product.price.toLocaleString()}
            </p>
            {/* Color Swatches */}
            <div className="flex space-x-1">
                {PRODUCT_COLORS.slice(0, 3).map((color, i) => (
                    <div 
                        key={i} 
                        className="w-3 h-3 rounded-full border border-gray-200 shadow-sm"
                        style={{ backgroundColor: color }}
                    ></div>
                ))}
                <div className="w-3 h-3 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
                    <span className="text-[6px] text-gray-500">+2</span>
                </div>
            </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
