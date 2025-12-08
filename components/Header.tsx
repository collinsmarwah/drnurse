
import React from 'react';
import { ShoppingBag, HeartPulse, Menu, X, Sparkles, Moon, Sun } from 'lucide-react';
import { STORE_NAME } from '../constants';

interface HeaderProps {
  cartItemCount: number;
  toggleCart: () => void;
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  onOpenAIStudio: () => void;
  onNavigate: (section: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    cartItemCount, 
    toggleCart, 
    toggleMobileMenu, 
    isMobileMenuOpen, 
    onOpenAIStudio, 
    onNavigate,
    isDarkMode,
    toggleDarkMode
}) => {
  
  const handleNavClick = (section: string) => {
    onNavigate(section);
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-teal-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
            <div className="relative mr-3">
                 <div className="absolute inset-0 bg-teal-400/20 dark:bg-teal-400/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <HeartPulse className="relative h-8 w-8 text-teal-600 dark:text-teal-400 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
            </div>
            
            <div className="flex flex-col justify-center select-none">
                <div className="flex items-baseline leading-none">
                    <span className="font-montserrat font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                        Dr<span className="text-teal-600 dark:text-teal-400">.</span>
                        <span className="ml-1.5 text-teal-600 dark:text-teal-400 italic">Nurse</span>
                    </span>
                </div>
                <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-500 ml-0.5 mt-1">
                    Collections
                </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button onClick={() => handleNavClick('shop-all')} className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition">Shop All</button>
            <button onClick={() => handleNavClick('new-arrivals')} className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition">New Arrivals</button>
            <button onClick={() => handleNavClick('services')} className="text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 px-3 py-2 rounded-md text-sm font-medium transition">Services</button>
            <button 
                onClick={onOpenAIStudio}
                className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-teal-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:shadow-md transition hover:scale-105"
            >
                <Sparkles className="h-3 w-3" />
                <span>AI Studio</span>
            </button>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition focus:outline-none rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
                aria-label="Toggle Dark Mode"
            >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button 
              onClick={toggleCart} 
              className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none transition rounded-full hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-teal-600 rounded-full border-2 border-white dark:border-slate-900">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-teal-100 dark:border-slate-800 transition-colors shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => handleNavClick('shop-all')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">Shop All</button>
            <button onClick={() => handleNavClick('new-arrivals')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">New Arrivals</button>
            <button onClick={() => handleNavClick('services')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">Services</button>
            <button 
                onClick={() => {
                    onOpenAIStudio();
                    toggleMobileMenu();
                }}
                className="w-full text-left block text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-50 dark:hover:bg-slate-800 px-3 py-2 rounded-md text-base flex items-center"
            >
                <Sparkles className="h-4 w-4 mr-2" />
                AI Design Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
