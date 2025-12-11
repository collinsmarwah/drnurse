
import React from 'react';
import { X, Trash2, Plus, Minus, Scissors } from 'lucide-react';
import { CartItem, CustomizationOptions } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemove: (id: string, customization?: CustomizationOptions) => void;
  onUpdateQuantity: (id: string, delta: number, customization?: CustomizationOptions) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, onRemove, onUpdateQuantity, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-75 dark:bg-slate-950 dark:bg-opacity-90 transition-opacity backdrop-blur-sm" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pointer-events-none">
        <div className="w-screen max-w-md pointer-events-auto transform transition-transform duration-500 sm:duration-700">
          <div className="h-full flex flex-col bg-white dark:bg-slate-900 shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Shopping Cart ({cartItems.length})</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                onClick={onClose}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6 bg-gray-50 dark:bg-slate-900/50">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-slate-700 mb-4" strokeWidth={1} />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">Your cart is empty</p>
                  <p className="text-sm">Looks like you haven't added any items yet.</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 text-blue-600 font-bold text-sm hover:underline"
                  >
                      Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((item, index) => (
                    <li key={`${item.id}-${index}`} className="flex bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                            <h3 className="line-clamp-1">{item.name}</h3>
                            <p className="ml-4 text-blue-600 dark:text-blue-400">${(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                          
                          {/* Customization Details */}
                          {item.customization && (
                            <div className="mt-2 text-xs bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-100 dark:border-blue-800 text-gray-600 dark:text-gray-300">
                                <div className="flex items-center font-medium text-blue-700 dark:text-blue-400 mb-1">
                                    <Scissors className="w-3 h-3 mr-1" />
                                    Embroidery Added
                                </div>
                                <div><span className="text-gray-500">Text:</span> {item.customization.text}</div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm mt-3">
                          <div className="flex items-center border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900">
                            <button 
                                onClick={() => onUpdateQuantity(item.id, -1, item.customization)}
                                className="p-1 px-2 text-gray-500 hover:text-blue-600 disabled:opacity-50"
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 font-medium text-gray-900 dark:text-white min-w-[1.5rem] text-center">{item.quantity}</span>
                            <button 
                                onClick={() => onUpdateQuantity(item.id, 1, item.customization)}
                                className="p-1 px-2 text-gray-500 hover:text-blue-600"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemove(item.id, item.customization)}
                            className="font-medium text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 dark:border-slate-800 py-6 px-4 sm:px-6 bg-white dark:bg-slate-900">
                <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white mb-4">
                  <p>Subtotal</p>
                  <p className="text-xl">${total.toLocaleString()}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 mb-6">Shipping and taxes calculated at checkout.</p>
                <button
                  onClick={onCheckout}
                  className="w-full flex items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition-all transform active:scale-95"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Icon component for empty state
const ShoppingBag = ({ className, strokeWidth }: { className?: string, strokeWidth?: number }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={strokeWidth || 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

export default CartSidebar;
