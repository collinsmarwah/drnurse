
import React, { useEffect, useState } from 'react';
import { X, Plus, Check, Scissors, AlertCircle, Ban, CheckCircle2 } from 'lucide-react';
import { Product, CustomizationOptions } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, customization?: CustomizationOptions) => void;
}

const EMBROIDERY_COLORS = ['White', 'Black', 'Gold', 'Teal', 'Navy'];
const COLOR_MAP: Record<string, string> = {
  'White': 'bg-white border-gray-200',
  'Black': 'bg-gray-900 border-gray-900',
  'Gold': 'bg-amber-400 border-amber-400',
  'Teal': 'bg-teal-600 border-teal-600',
  'Navy': 'bg-blue-900 border-blue-900'
};

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  // Customization State
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [embroideryText, setEmbroideryText] = useState('');
  const [embroideryColor, setEmbroideryColor] = useState(EMBROIDERY_COLORS[0]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state when modal opens
      setIsCustomizing(false);
      setEmbroideryText('');
      setEmbroideryColor(EMBROIDERY_COLORS[0]);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;
  // const isCustomizable = product.category === 'Scrubs' || product.category === 'Lab Coats' || product.category === 'Uniforms'; // Unused

  const handleAddToCart = () => {
    const customization = isCustomizing && embroideryText.trim() 
      ? { text: embroideryText, color: embroideryColor } 
      : undefined;
    
    onAddToCart(product, customization);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-75 dark:bg-slate-950 dark:bg-opacity-80 transition-opacity backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl flex flex-col md:flex-row border border-gray-100 dark:border-slate-700">
          <div className="absolute right-4 top-4 z-10">
            <button
              type="button"
              className="rounded-full bg-white/80 dark:bg-slate-900/80 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 backdrop-blur-sm transition-colors"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Image Section */}
          <div className="relative h-64 md:h-auto md:w-1/2 bg-gray-100 dark:bg-slate-700">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-10 flex flex-col justify-center md:w-1/2 bg-white dark:bg-slate-800">
            <div className="mb-2">
               <span className="inline-flex items-center rounded-full bg-teal-50 dark:bg-teal-900/30 px-2.5 py-0.5 text-xs font-medium text-teal-700 dark:text-teal-300">
                 {product.category}
               </span>
               {product.featured && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                    Bestseller
                  </span>
               )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl mb-2">
              {product.name}
            </h2>
            
            <p className="text-3xl tracking-tight text-teal-600 dark:text-teal-400 font-bold mb-4">
              KES {product.price.toLocaleString()}
            </p>

            {/* Stock Level */}
            <div className="mb-6">
                {isOutOfStock ? (
                    <div className="flex items-center text-sm text-red-600 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full w-fit">
                       <Ban className="w-4 h-4 mr-2" />
                       Unavailable
                    </div>
                ) : isLowStock ? (
                    <div className="flex items-center text-sm text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full w-fit">
                       <AlertCircle className="w-4 h-4 mr-2" />
                       Only {product.stock} left in stock!
                    </div>
                ) : (
                    <div className="flex items-center text-sm text-emerald-700 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit">
                       <CheckCircle2 className="w-4 h-4 mr-2" />
                       In Stock ({product.stock})
                    </div>
                )}
            </div>

            <div className="prose prose-sm text-gray-500 dark:text-gray-400 mb-6">
              <p>{product.description}</p>
            </div>

            {/* Customization Section Removed */}

            <div className="mt-auto">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || (isCustomizing && !embroideryText.trim())}
                className={`flex w-full items-center justify-center rounded-xl border border-transparent px-8 py-4 text-base font-bold text-white shadow-lg transition-all transform active:scale-95 ${
                    isOutOfStock || (isCustomizing && !embroideryText.trim())
                    ? 'bg-gray-300 dark:bg-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 dark:bg-slate-950 hover:bg-teal-600 dark:hover:bg-teal-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
                }`}
              >
                {isOutOfStock ? (
                    'Out of Stock'
                ) : (
                    <>
                        <Plus className="mr-2 h-5 w-5" />
                        Add to Cart
                    </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
