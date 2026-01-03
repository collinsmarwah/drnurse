
import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Moon, Sun, Search, User } from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavClick = (section: string) => {
    onNavigate(section);
    if (isMobileMenuOpen) toggleMobileMenu();
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
            <img 
              src="https://res.cloudinary.com/dldtmvsow/image/upload/v1767448355/images_qgnmxn.png" 
              alt="Dr. Nurse Collections Logo" 
              className="h-12 w-auto mr-3 object-contain group-hover:scale-105 transition-transform duration-300"
            />
            
            <div className="flex flex-col justify-center select-none">
                <span className="font-montserrat font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                    Dr. Nurse
                </span>
                <span className="font-montserrat text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 leading-tight mt-1">
                    Collection
                </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-slate-700 rounded-full leading-5 bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 sm:text-sm transition-all"
                placeholder="Search for scrubs, lab coats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Nav & Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
                <button onClick={() => handleNavClick('home')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Home</button>
                <button onClick={() => handleNavClick('shop-all')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Shop</button>
                <button onClick={() => handleNavClick('new-arrivals')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">New</button>
                <button onClick={() => handleNavClick('gallery')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Gallery</button>
                <button onClick={() => handleNavClick('about')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">About</button>
                <button onClick={() => handleNavClick('contact')} className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Contact</button>
            </nav>

            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700"></div>

            <div className="flex items-center space-x-3">
                <button onClick={toggleDarkMode} className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition">
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition">
                    <User className="h-5 w-5" />
                </button>
                <button 
                  onClick={toggleCart} 
                  className="relative p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full border-2 border-white dark:border-slate-900">
                      {cartItemCount}
                    </span>
                  )}
                </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button onClick={toggleCart} className="relative p-2 text-gray-500 dark:text-gray-400">
                <ShoppingBag className="h-6 w-6" />
                {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
                    {cartItemCount}
                </span>
                )}
            </button>
            <button onClick={toggleMobileMenu} className="text-gray-500 dark:text-gray-400 p-2">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors shadow-lg animate-in slide-in-from-top-2">
          
          <div className="p-4 border-b border-gray-100 dark:border-slate-800">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>

          <div className="px-4 py-3 space-y-1">
            <button onClick={() => handleNavClick('home')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-3 rounded-lg text-base font-medium transition">Home</button>
            <button onClick={() => handleNavClick('shop-all')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-3 rounded-lg text-base font-medium transition">Shop All</button>
            <button onClick={() => handleNavClick('new-arrivals')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-3 rounded-lg text-base font-medium transition">New Arrivals</button>
            <button onClick={() => handleNavClick('gallery')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-3 rounded-lg text-base font-medium transition">Gallery</button>
            <button onClick={() => handleNavClick('about')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-3 rounded-lg text-base font-medium transition">About Us</button>
            <button onClick={() => handleNavClick('contact')} className="block w-full text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 px-3 py-3 rounded-lg text-base font-medium transition">Contact Us</button>
          </div>
          
          <div className="p-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
             <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Appearance</span>
             <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-md border border-gray-200 dark:border-slate-700 shadow-sm text-sm"
             >
                {isDarkMode ? (
                    <><Sun className="h-4 w-4 text-amber-500" /> <span>Light Mode</span></>
                ) : (
                    <><Moon className="h-4 w-4 text-blue-600" /> <span>Dark Mode</span></>
                )}
             </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
