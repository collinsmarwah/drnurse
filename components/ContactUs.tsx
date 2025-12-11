import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [formState, setFormState] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Mock submission logic
      setTimeout(() => {
          setIsSubmitted(true);
          setFormState({ name: '', email: '', subject: '', message: '' });
      }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormState({
          ...formState,
          [e.target.name]: e.target.value
      });
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 py-24 sm:py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Get in Touch</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Have questions about sizing, bulk orders, or shipping? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <div>
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
             <div className="space-y-8">
                 <div className="flex items-start">
                     <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                         <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                     </div>
                     <div className="ml-4">
                         <h4 className="text-base font-semibold text-gray-900 dark:text-white">Visit Us</h4>
                         <p className="mt-1 text-gray-600 dark:text-gray-400">
                             Taveta Road, Taveta Court<br />
                             Suit 301<br />
                             Nairobi, Kenya
                         </p>
                     </div>
                 </div>

                 <div className="flex items-start">
                     <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                         <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                     </div>
                     <div className="ml-4">
                         <h4 className="text-base font-semibold text-gray-900 dark:text-white">Call or WhatsApp</h4>
                         <p className="mt-1 text-gray-600 dark:text-gray-400">
                             +254 704 268 206
                         </p>
                         <p className="text-sm text-gray-500 mt-1">Mon-Sat 8am to 6pm</p>
                     </div>
                 </div>

                 <div className="flex items-start">
                     <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                         <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                     </div>
                     <div className="ml-4">
                         <h4 className="text-base font-semibold text-gray-900 dark:text-white">Email Us</h4>
                         <p className="mt-1 text-gray-600 dark:text-gray-400">
                             support@drnursecollections.com
                         </p>
                         <p className="mt-1 text-gray-600 dark:text-gray-400">
                             sales@drnursecollections.com
                         </p>
                     </div>
                 </div>
             </div>

             {/* Social Media Links */}
             <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
                 <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Follow Us</h4>
                 <div className="flex space-x-4">
                     <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors transform hover:scale-110">
                         <Instagram className="h-5 w-5" />
                         <span className="sr-only">Instagram</span>
                     </a>
                     <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors transform hover:scale-110">
                         <Facebook className="h-5 w-5" />
                         <span className="sr-only">Facebook</span>
                     </a>
                     <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors transform hover:scale-110">
                         <Twitter className="h-5 w-5" />
                         <span className="sr-only">Twitter</span>
                     </a>
                     <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors transform hover:scale-110">
                         <Linkedin className="h-5 w-5" />
                         <span className="sr-only">LinkedIn</span>
                     </a>
                 </div>
             </div>

             {/* Placeholder Map */}
             <div className="mt-10 rounded-2xl overflow-hidden h-64 bg-gray-200 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 shadow-inner flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 grayscale"></div>
                 <div className="relative z-10 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-900 dark:text-white">
                     Map View Placeholder
                 </div>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-800">
             {isSubmitted ? (
                 <div className="h-full flex flex-col items-center justify-center text-center py-12">
                     <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                         <CheckCircle2 className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                     <p className="text-gray-600 dark:text-gray-400">We'll get back to you within 24 hours.</p>
                     <button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 text-blue-600 hover:text-blue-800 font-medium"
                     >
                         Send another message
                     </button>
                 </div>
             ) : (
                 <form onSubmit={handleSubmit} className="space-y-6">
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">Send us a Message</h3>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                             <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                             <input 
                                type="text" 
                                name="name"
                                id="name"
                                required
                                value={formState.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                             />
                         </div>
                         <div>
                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                             <input 
                                type="email" 
                                name="email"
                                id="email"
                                required
                                value={formState.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                             />
                         </div>
                     </div>

                     <div>
                         <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                         <select
                            name="subject"
                            id="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                         >
                             <option value="">Select a topic</option>
                             <option value="Order Status">Order Status</option>
                             <option value="Product Inquiry">Product Inquiry</option>
                             <option value="Customization">Customization</option>
                             <option value="Bulk Order">Bulk Order</option>
                             <option value="Other">Other</option>
                         </select>
                     </div>

                     <div>
                         <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                         <textarea 
                            name="message"
                            id="message"
                            rows={4}
                            required
                            value={formState.message}
                            onChange={handleChange}
                            className="w-full rounded-lg border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                         ></textarea>
                     </div>

                     <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center shadow-md"
                     >
                         <Send className="w-5 h-5 mr-2" />
                         Send Message
                     </button>
                 </form>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;