
import React from 'react';
import { CheckCircle2, ShoppingBag, X, Truck } from 'lucide-react';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 dark:bg-slate-950 dark:bg-opacity-80 transition-opacity backdrop-blur-sm" onClick={onClose}></div>

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md p-8 animate-in fade-in zoom-in-95 duration-300 border border-gray-100 dark:border-slate-700">
            
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
                <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center justify-center text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/30 mb-6 animate-bounce">
                    <CheckCircle2 className="h-10 w-10 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                </div>
                
                <h3 className="text-2xl font-bold leading-6 text-gray-900 dark:text-white mb-2" id="modal-title">
                    Order Placed Successfully!
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Thank you for shopping with Dr. Nurse Collections. Your premium medical apparel is being prepared. You will receive a confirmation email shortly.
                </p>

                <div className="w-full space-y-3">
                    <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-xl border border-transparent bg-teal-600 px-4 py-3 text-base font-bold text-white shadow-sm hover:bg-teal-700 dark:hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
                        onClick={onClose}
                    >
                        Continue Shopping
                    </button>
                    
                    <button
                        type="button"
                        className="w-full inline-flex justify-center items-center rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all"
                        onClick={() => alert("Tracking feature coming soon! Check your email for details.")}
                    >
                        <Truck className="mr-2 h-5 w-5 text-gray-400 dark:text-gray-300" />
                        Track Your Order
                    </button>
                    
                    <button
                        type="button"
                        className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 font-medium"
                    >
                        View Order Receipt
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessModal;
