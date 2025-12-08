
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 dark:bg-slate-900 dark:bg-opacity-90 transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="h-full flex flex-col bg-white dark:bg-slate-800 shadow-xl transition-colors duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Shopping Cart</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                onClick={onClose}
              >
                <span className="sr-only">Close panel</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg mb-2">Your cart is empty</p>
                  <p className="text-sm">Start adding some scrubs!</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-slate-700">
                  {cartItems.map((item, index) => (
                    <li key={`${item.id}-${index}`} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-slate-600">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                            <h3>{item.name}</h3>
                            <p className="ml-4">KES {(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category}</p>
                          
                          {/* Customization Details */}
                          {item.customization && (
                            <div className="mt-2 text-xs bg-slate-50 dark:bg-slate-700 p-2 rounded border border-slate-100 dark:border-slate-600 text-gray-600 dark:text-gray-300">
                                <div className="flex items-center justify-between font-medium text-teal-700 dark:text-teal-400 mb-1">
                                    <div className="flex items-center">
                                        <Scissors className="w-3 h-3 mr-1" />
                                        Custom Embroidery
                                    </div>
                                    <span className="text-xs text-teal-600 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded ml-2 whitespace-nowrap">+KES 1,040</span>
                                </div>
                                <div>Text: <span className="font-medium text-gray-900 dark:text-white">{item.customization.text}</span></div>
                                <div>Color: <span className="font-medium text-gray-900 dark:text-white">{item.customization.color}</span></div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm mt-3">
                          <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-md">
                            <button 
                                onClick={() => onUpdateQuantity(item.id, -1, item.customization)}
                                className="p-1 px-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 disabled:opacity-50"
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 font-medium text-gray-900 dark:text-white">{item.quantity}</span>
                            <button 
                                onClick={() => onUpdateQuantity(item.id, 1, item.customization)}
                                className="p-1 px-2 text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemove(item.id, item.customization)}
                            className="font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
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
              <div className="border-t border-gray-200 dark:border-slate-700 py-6 px-4 sm:px-6 bg-white dark:bg-slate-800">
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                  <p>Subtotal</p>
                  <p>KES {total.toLocaleString()}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button
                    onClick={onCheckout}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700 dark:hover:bg-teal-500 transition"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
