
import React, { useState } from 'react';
import { CartItem } from '../types';
import { CreditCard, Truck, ChevronLeft, Lock, ShieldCheck, Smartphone } from 'lucide-react';

interface CheckoutProps {
  cartItems: CartItem[];
  onPlaceOrder: (shippingDetails: any) => void;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onPlaceOrder, onBack }) => {
  const [shippingDetails, setShippingDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'mpesa'

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'express' ? 1500 : 500; // KES
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder({ ...shippingDetails, shippingMethod, paymentMethod, total });
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Shop
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-auto mr-auto pr-20">Secure Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit}>
              
              {/* Contact Information */}
              <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-slate-800 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={shippingDetails.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number (for M-PESA)</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      placeholder="e.g. 0712345678"
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-slate-800 mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      value={shippingDetails.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      value={shippingDetails.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address / Pickup Point</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      required
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City / Town</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      required
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Postal Code (Optional)</label>
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={shippingDetails.postalCode}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-slate-800 mb-6">
                 <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Delivery Method</h2>
                 <div className="space-y-3">
                    <div 
                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300'}`}
                        onClick={() => setShippingMethod('standard')}
                    >
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="shipping" 
                                checked={shippingMethod === 'standard'} 
                                onChange={() => setShippingMethod('standard')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-900 dark:text-white">Standard Delivery</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">3-5 Business Days</span>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">KES 500</span>
                    </div>

                    <div 
                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300'}`}
                        onClick={() => setShippingMethod('express')}
                    >
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="shipping" 
                                checked={shippingMethod === 'express'} 
                                onChange={() => setShippingMethod('express')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-900 dark:text-white">Express Delivery</span>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">1-2 Business Days</span>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">KES 1,500</span>
                    </div>
                 </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-slate-900 shadow-sm rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
                 <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment</h2>
                 <div className="space-y-3">
                    {/* M-PESA Option */}
                    <div 
                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-green-600 bg-green-50 dark:bg-green-900/20 dark:border-green-500' : 'border-gray-200 dark:border-slate-700 hover:border-green-300'}`}
                        onClick={() => setPaymentMethod('mpesa')}
                    >
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="payment" 
                                checked={paymentMethod === 'mpesa'} 
                                onChange={() => setPaymentMethod('mpesa')}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <div className="ml-3 flex items-center">
                                <Smartphone className="h-5 w-5 text-green-600 mr-2" />
                                <div>
                                    <span className="block text-sm font-medium text-gray-900 dark:text-white">M-PESA</span>
                                    <span className="block text-xs text-gray-500 dark:text-gray-400">Pay securely with mobile money</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Option */}
                    <div 
                        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500' : 'border-gray-200 dark:border-slate-700 hover:border-blue-300'}`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                name="payment" 
                                checked={paymentMethod === 'card'} 
                                onChange={() => setPaymentMethod('card')}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <div className="ml-3 flex items-center">
                                <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
                                <div>
                                    <span className="block text-sm font-medium text-gray-900 dark:text-white">Debit / Credit Card</span>
                                    <span className="block text-xs text-gray-500 dark:text-gray-400">Visa, Mastercard, AMEX</span>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Card Details Mockup */}
                 {paymentMethod === 'card' && (
                     <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 space-y-3 animate-in fade-in slide-in-from-top-2">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Card Number</label>
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full text-sm p-2 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Expiry Date</label>
                                <input type="text" placeholder="MM / YY" className="w-full text-sm p-2 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">CVC</label>
                                <input type="text" placeholder="123" className="w-full text-sm p-2 rounded border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white" />
                            </div>
                        </div>
                     </div>
                 )}
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-6 border border-gray-100 dark:border-slate-800 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <ul className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item, idx) => (
                  <li key={`${item.id}-${idx}`} className="flex py-2">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-slate-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <h3 className="line-clamp-1">{item.name}</h3>
                          <p className="ml-4">KES {item.price.toLocaleString()}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.category} x {item.quantity}</p>
                        {item.customization && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                                + Custom: {item.customization.text}
                            </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 dark:border-slate-800 pt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                    <p className="font-medium text-gray-900 dark:text-white">KES {subtotal.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-600 dark:text-gray-400">Shipping</p>
                    <p className="font-medium text-gray-900 dark:text-white">KES {shippingCost.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-800 pt-4">
                    <p className="text-base font-bold text-gray-900 dark:text-white">Total</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">KES {total.toLocaleString()}</p>
                </div>
              </div>

              <button
                form="checkout-form"
                type="submit"
                className="w-full mt-8 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center transform hover:-translate-y-1 hover:shadow-blue-600/30"
              >
                  <Lock className="h-4 w-4 mr-2" />
                  {paymentMethod === 'mpesa' ? 'Pay with M-PESA' : 'Pay Now'}
              </button>

              <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Secure SSL Encryption. 100% Money Back Guarantee.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
