
import React, { useState, useEffect } from 'react';
import { Plus, ImageOff, Loader2, Eye, AlertCircle, CheckCircle2, Ban, HeartPulse, Scissors, Star, Check, CreditCard, ShoppingCart, Minus } from 'lucide-react';
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
  const [userRating, setUserRating] = useState(0);

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

    // Use passed rating or fallback if not present (should be handled by parent)
    setRating(product.rating || 4.5);
    setReviewCount(product.reviews || Math.floor(Math.random() * 50) + 5);
    setUserRating(0);
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

  const handleBuyNow = () => {
    const customization = isCustomizing && embroideryText.trim() 
        ? { text: embroideryText, color: embroideryColor } 
        : undefined;
        
    onBuyNow(product, customization, quantity);
    
    // Reset form
    setQuantity(1);
    setIsCustomizing(false);
    setEmbroideryText('');
    setEmbroideryColor(EMBROIDERY_COLORS[0]);
  };

  const handleRate = (stars: number) => {
    setUserRating(stars);
  };

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;

  const incrementQuantity = () => {
    if (quantity < product.stock) {
        setQuantity(q => q + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
        setQuantity(q => q - 1);
    }
  };

  const isTextLimitReached = embroideryText.length >= 20;

  return (
    <article className="group relative bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-800">
      <div className="h-64 w-full overflow-hidden bg-gray-50 dark:bg-slate-700 group-hover:opacity-95 relative">
        
        {/* Skeleton Loader with smooth fade out */}
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
            alt={`${product.name} - Premium ${product.category} for healthcare professionals`}
            onError={handleImageError}
            onLoad={() => setIsImageLoading(false)}
            className={`h-full w-full object-cover object-center transform transition-all duration-700 ease-in-out ${
                isImageLoading ? 'scale-110 blur-xl' : 'scale-100 blur-0 group-hover:scale-105'
            } ${isOutOfStock ? 'grayscale opacity-75' : ''}`}
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
                alt={`Placeholder image for ${product.name}`}
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
            className="transform translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-gray-900 dark:text-white px-5 py-2.5 rounded-full shadow-lg font-medium text-sm flex items-center hover:bg-teal-50 dark:hover:bg-slate-800 hover:text-teal-700 dark:hover:text-teal-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white dark:focus-visible:ring-slate-700 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
            aria-label={`Quick view ${product.name}`}
            tabIndex={0}
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
        {/* Customization Section */}
        {!isOutOfStock && (
            <div className={`mb-4 rounded-xl border transition-all duration-300 overflow-hidden ${
                isCustomizing 
                ? 'bg-white dark:bg-slate-800 border-teal-500/30 ring-1 ring-teal-500/20 shadow-sm' 
                : 'bg-slate-50 dark:bg-slate-700/50 border-slate-100 dark:border-slate-600 hover:border-teal-200 dark:hover:border-slate-500'
            }`}>
                <button 
                    onClick={() => setIsCustomizing(!isCustomizing)}
                    className="w-full flex items-center justify-between p-3 focus:outline-none group"
                >
                    <div className="flex items-center">
                        <div className={`p-1.5 rounded-full mr-3 transition-colors ${isCustomizing ? 'bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400' : 'bg-gray-200 text-gray-500 dark:bg-slate-600 dark:text-gray-400 group-hover:text-teal-600 dark:group-hover:text-teal-400'}`}>
                            <Scissors className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                            <span className={`block text-sm font-semibold transition-colors ${isCustomizing ? 'text-teal-900 dark:text-teal-100' : 'text-gray-700 dark:text-gray-300'}`}>
                                {isCustomizing ? 'Customize Your Item' : 'Add Embroidery'}
                            </span>
                            {!isCustomizing && (
                                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium block">
                                    +KES 1,040
                                </span>
                            )}
                        </div>
                    </div>
                    {isCustomizing ? (
                        <Minus className="w-4 h-4 text-gray-400" />
                    ) : (
                        <Plus className="w-4 h-4 text-gray-400" />
                    )}
                </button>

                {isCustomizing && (
                    <div className="px-3 pb-4 pt-1 space-y-4 animate-in fade-in slide-in-from-top-2 border-t border-gray-100 dark:border-slate-700/50">
                        {/* Text Input */}
                        <div>
                            <div className="flex justify-between items-center mb-1.5">
                                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                    Embroidery Text
                                </label>
                                <span className={`text-[10px] font-medium ${isTextLimitReached ? 'text-red-500' : 'text-gray-400'}`}>
                                    {embroideryText.length}/20
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    maxLength={20}
                                    value={embroideryText}
                                    onChange={(e) => setEmbroideryText(e.target.value)}
                                    placeholder="e.g. Dr. Name"
                                    className={`w-full text-sm border-2 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 focus:ring-0 dark:bg-slate-900 dark:text-white transition-all ${
                                        isTextLimitReached 
                                        ? 'border-red-300 bg-red-50 text-red-900 dark:bg-red-900/10 dark:border-red-800' 
                                        : 'border-gray-200 dark:border-slate-600'
                                    }`}
                                />
                                {isTextLimitReached && (
                                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-500 animate-pulse" />
                                )}
                            </div>
                            {isTextLimitReached ? (
                                <p className="text-[10px] text-red-500 mt-1 font-medium">Character limit reached</p>
                            ) : (
                                <p className="text-[10px] text-gray-400 mt-1">Add name or title (Max 20 chars)</p>
                            )}
                        </div>

                        {/* Color Selection */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                Thread Color
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {EMBROIDERY_COLORS.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setEmbroideryColor(color)}
                                        className={`group relative w-8 h-8 rounded-full border shadow-sm flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-800 ${COLOR_MAP[color]} ${
                                            embroideryColor === color ? 'ring-2 ring-teal-500 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 scale-110' : ''
                                        }`}
                                        title={color}
                                        aria-label={`Select ${color} thread`}
                                    >
                                        {embroideryColor === color && (
                                            <Check 
                                                className={`w-4 h-4 stroke-[3] transition-opacity duration-200 ${
                                                    ['White', 'Gold'].includes(color) ? 'text-gray-900' : 'text-white'
                                                }`} 
                                            />
                                        )}
                                        {/* Hover Tooltip */}
                                        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium bg-gray-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                            {color}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}

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
                            className="text-gray-300 dark:text-gray-600 hover:text-yellow-400 hover:scale-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-sm"
                            aria-label={`Rate ${star} out of 5 stars`}
                        >
                            <Star className="w-5 h-5 fill-current" />
                        </button>
                    ))}
                </div>
             </div>
        ) : null}

        {!isOutOfStock && (
            <div className="flex items-center mb-3">
                 <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mr-2">Qty:</span>
                 <div className="flex items-center border border-gray-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700">
                    <button 
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 disabled:opacity-50 transition rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-sm font-medium text-gray-900 dark:text-white min-w-[1.5rem] text-center" aria-live="polite">{quantity}</span>
                    <button 
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                        className="p-1 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 disabled:opacity-50 transition rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                        aria-label="Increase quantity"
                    >
                        <Plus className="w-3 h-3" />
                    </button>
                 </div>
            </div>
        )}

        <div className="grid grid-cols-2 gap-2">
            <button
                onClick={handleAddToCart}
                disabled={isOutOfStock || isAdded || (isCustomizing && !embroideryText.trim())}
                aria-label={isAdded ? "Item added to cart" : `Add ${quantity} ${product.name} to cart`}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 border dark:focus-visible:ring-offset-slate-800 ${
                    isOutOfStock || (isCustomizing && !embroideryText.trim())
                    ? 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-slate-800 dark:border-slate-600 dark:text-gray-500 cursor-not-allowed' 
                    : isAdded 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300'
                        : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 hover:border-gray-300 dark:hover:border-slate-500'
                }`}
            >
                {isAdded ? (
                    <div className="flex items-center animate-in fade-in zoom-in duration-300">
                        <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        <span>Added to Cart</span>
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
                disabled={isOutOfStock || isAdded || (isCustomizing && !embroideryText.trim())}
                aria-label={`Buy ${quantity} ${product.name} now`}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 shadow-sm dark:focus-visible:ring-offset-slate-800 ${
                    isOutOfStock || (isCustomizing && !embroideryText.trim())
                    ? 'bg-gray-100 text-gray-400 dark:bg-slate-700 dark:text-gray-500 cursor-not-allowed' 
                    : 'bg-teal-600 text-white hover:bg-teal-700 dark:hover:bg-teal-500'
                }`}
            >
                <CreditCard className="h-4 w-4 mr-1.5" aria-hidden="true" />
                Buy Now
            </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
