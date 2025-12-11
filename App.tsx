
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import AIAssistant from './components/AIAssistant';
import ImageGenerator from './components/ImageGenerator';
import ProductModal from './components/ProductModal';
import CheckoutSuccessModal from './components/CheckoutSuccessModal';
import Gallery from './components/Gallery';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Checkout from './components/Checkout';
import { STORE_NAME, PRODUCTS } from './constants';
import { supabase } from './lib/supabase';
import { Product, CartItem, Category, CustomizationOptions } from './types';
import { 
  Filter, Star, Truck, ShieldCheck, Search, Check,
  ChevronDown, ArrowUp, ArrowDown, ArrowDownAZ, Sparkles, Loader2, Trophy, HeartPulse, Droplets, Scissors, Plus
} from 'lucide-react';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  // View State Management
  const [currentView, setCurrentView] = useState<'home' | 'shop-all' | 'new-arrivals' | 'gallery' | 'about' | 'contact' | 'checkout'>('home');
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference on initial load
    if (typeof window !== 'undefined') {
        const savedMode = localStorage.getItem('drNurseDarkMode');
        if (savedMode) return savedMode === 'true';
        return false;
    }
    return false;
  });
  
  // Refs for scrolling
  const productSectionRef = useRef<HTMLElement>(null);
  const gallerySectionRef = useRef<HTMLElement>(null);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  // Apply Dark Mode Class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('drNurseDarkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('drNurseDarkMode', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Fetch Products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error || !data || data.length === 0) {
          console.warn('Supabase fetch failed or empty, using fallback data.', error);
          setProducts(PRODUCTS);
        } else {
          // Inject mock ratings for prototype if missing in DB
          const enhancedData = data.map((p: any) => ({
            ...p,
            rating: p.rating || (4 + Math.random() * 1), // Mock rating 4.0-5.0
            reviews: p.reviews || Math.floor(Math.random() * 50) + 5
          }));
          setProducts(enhancedData as Product[]);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setProducts(PRODUCTS);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Supabase Realtime Subscription
  useEffect(() => {
    const channel = supabase
      .channel('products-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newProduct = {
                ...payload.new,
                rating: payload.new.rating || 4.5,
                reviews: payload.new.reviews || 0
            } as Product;
            setProducts((prev) => [...prev, newProduct]);
          } else if (payload.eventType === 'UPDATE') {
            setProducts((prev) => 
              prev.map((p) => (p.id === payload.new.id ? { ...p, ...payload.new } as Product : p))
            );
          } else if (payload.eventType === 'DELETE') {
            setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('drNurseCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('drNurseCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message: string) => {
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    setToastMessage(message);
    toastTimer.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, customization?: CustomizationOptions, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.customization) === JSON.stringify(customization)
      );

      if (existingItemIndex > -1) {
        const newItems = [...prev];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      }
      
      const finalPrice = customization ? product.price + 1040 : product.price;
      return [...prev, { ...product, price: finalPrice, quantity: quantity, customization }];
    });
    showToast(`${product.name}${customization ? ' (Customized)' : ''} added to cart`);
  };

  const handleBuyNow = (product: Product, customization?: CustomizationOptions, quantity: number = 1) => {
    addToCart(product, customization, quantity);
    setIsCartOpen(true);
  };

  const handleCheckoutInit = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = (shippingDetails: any) => {
    // Simulate API processing
    console.log("Processing order for:", shippingDetails);
    
    setTimeout(() => {
        setCartItems([]);
        localStorage.removeItem('drNurseCart');
        setCurrentView('home'); // Reset view so modal shows on home or current page
        setIsCheckoutSuccessOpen(true);
    }, 1500);
  };

  const removeFromCart = (id: string, customization?: CustomizationOptions) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === id && JSON.stringify(item.customization) === JSON.stringify(customization))
    ));
  };

  const updateQuantity = (id: string, delta: number, customization?: CustomizationOptions) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && JSON.stringify(item.customization) === JSON.stringify(customization)) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleNavigation = (section: string) => {
      // Scroll to top on page switch
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // State Updates based on section
      switch(section) {
          case 'home':
              setCurrentView('home');
              setSelectedCategory('All');
              setSearchQuery('');
              setShowFeaturedOnly(false);
              break;
          case 'shop-all':
              setCurrentView('shop-all');
              setSelectedCategory('All');
              setShowFeaturedOnly(false);
              break;
          case 'new-arrivals':
              setCurrentView('new-arrivals');
              setSelectedCategory('All');
              // We'll simulate sorting by "new" in the logic
              break;
          case 'gallery':
              setCurrentView('gallery');
              break;
          case 'about':
              setCurrentView('about');
              break;
          case 'contact':
              setCurrentView('contact');
              break;
          default:
              setCurrentView('home');
      }
  };

  // Filter logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Logic for 'new-arrivals' or 'featured' views
    const matchesFeatured = (currentView === 'home' && showFeaturedOnly) ? product.featured : true;
    
    return matchesCategory && matchesSearch && matchesFeatured;
  }).sort((a, b) => {
    // If we are in New Arrivals view, prioritize that logic
    if (currentView === 'new-arrivals') {
        // Since we don't have a date field, we reverse the ID order or list order
        // Assuming higher ID or later index is newer
        return parseInt(b.id) - parseInt(a.id);
    }
    
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
    if (sortOption === 'rating-desc') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const sortOptions = [
    { value: 'default', label: 'Featured', icon: Sparkles },
    { value: 'rating-desc', label: 'Top Rated', icon: Trophy },
    { value: 'price-asc', label: 'Price: Low to High', icon: ArrowUp },
    { value: 'price-desc', label: 'Price: High to Low', icon: ArrowDown },
    { value: 'name-asc', label: 'Name: A to Z', icon: ArrowDownAZ },
  ];

  const currentSort = sortOptions.find(o => o.value === sortOption) || sortOptions[0];
  const isGroupedView = selectedCategory === 'All' && !searchQuery && sortOption === 'default' && !showFeaturedOnly && currentView === 'shop-all';

  // Helper to render the product catalog section
  const renderProductCatalog = (title: string, showFilters = true) => (
    <section 
      id="products" 
      ref={productSectionRef} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 transition-colors duration-300"
    >
      <div className="flex flex-col space-y-6 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto z-20">
            {/* Custom Sort Dropdown */}
            {showFilters && (
                <div className="relative">
                <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full sm:w-56 flex items-center justify-between pl-4 pr-3 py-2 border border-gray-300 rounded-full bg-white text-gray-700 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm group dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                >
                    <div key={sortOption} className="flex items-center space-x-2 truncate animate-in fade-in slide-in-from-bottom-1 duration-300">
                    <currentSort.icon className="h-4 w-4 text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform dark:text-blue-400" />
                    <span className="text-sm font-medium">
                        {currentSort.label}
                    </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)}></div>
                        <div className="absolute top-full right-0 mt-2 w-full sm:w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-150 origin-top-right dark:bg-slate-800 dark:border-slate-700">
                        <div className="py-1">
                            {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                setSortOption(option.value);
                                setIsSortOpen(false);
                                }}
                                className={`w-full flex items-center px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors ${sortOption === option.value ? 'bg-blue-50 text-blue-700 font-medium dark:bg-slate-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}
                            >
                                <option.icon className={`h-4 w-4 mr-3 ${sortOption === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
                                {option.label}
                                {sortOption === option.value && <Check className="h-4 w-4 ml-auto text-blue-600 dark:text-blue-400" />}
                            </button>
                            ))}
                        </div>
                        </div>
                    </>
                )}
                </div>
            )}

            {/* Search Bar */}
            {showFilters && (
                <div className="relative w-full sm:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                </div>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        {showFilters && (
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide items-center">
            <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === 'All' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700 dark:hover:border-blue-500 dark:hover:text-blue-400'}`}
            >
                All Items
            </button>
            {Object.values(Category).map(cat => (
                <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700 dark:hover:border-blue-500 dark:hover:text-blue-400'}`}
                >
                {cat}
                </button>
            ))}
            </div>
        )}
      </div>

      {isLoadingProducts ? (
        <div className="flex justify-center items-center py-32">
            <div className="flex flex-col items-center">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium dark:text-gray-400">Loading Dr. Nurse Collection...</p>
            </div>
        </div>
      ) : isGroupedView ? (
        <div className="space-y-16">
          {Object.values(Category).map(category => {
            const categoryProducts = products.filter(p => 
              p.category === category && 
              (showFeaturedOnly ? p.featured : true)
            );
            
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category} id={`category-${category}`} className="scroll-mt-28">
                <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-slate-800 pb-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h3>
                  <button 
                    onClick={() => setSelectedCategory(category)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline flex items-center"
                  >
                    View All <span className="hidden sm:inline ml-1">{category}</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
                  {categoryProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart}
                      onBuyNow={handleBuyNow}
                      onQuickView={handleQuickView}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart}
                onBuyNow={handleBuyNow}
                onQuickView={handleQuickView}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300 dark:bg-slate-800 dark:border-slate-700">
              <Filter className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No products found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {searchQuery ? `No results for "${searchQuery}"` : 'Try changing the filters.'}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Header 
        cartItemCount={cartItemCount} 
        toggleCart={() => setIsCartOpen(true)}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        onOpenAIStudio={() => setIsImageGeneratorOpen(true)}
        onNavigate={handleNavigation}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckoutInit}
      />

      <ImageGenerator 
        isOpen={isImageGeneratorOpen}
        onClose={() => setIsImageGeneratorOpen(false)}
      />

      <ProductModal 
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={closeQuickView}
        onAddToCart={addToCart}
      />

      <CheckoutSuccessModal 
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
      />
      
      <main className="flex-grow">
        {currentView === 'checkout' ? (
          <Checkout 
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onBack={() => setCurrentView('home')}
          />
        ) : (
          <>
            {currentView === 'gallery' && <Gallery />}
            
            {currentView === 'about' && <AboutUs />}
            
            {currentView === 'contact' && <ContactUs />}

            {currentView === 'shop-all' && renderProductCatalog('Shop All Products')}

            {currentView === 'new-arrivals' && renderProductCatalog('New Arrivals', false)}

            {currentView === 'home' && (
              <>
                {/* Hero Section */}
                <section className="relative w-full h-[600px] flex items-center overflow-hidden bg-gray-900">
                    {/* Background Image */}
                    <div 
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
                        style={{ 
                            backgroundImage: `url('https://scontent.fdar12-1.fna.fbcdn.net/v/t51.82787-15/567414513_18095852839754000_2121655518682779768_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=F6xZrHJBL_wQ7kNvwEzjL2v&_nc_oc=Adk0cwZXOQqnDoPRu4st7-eNOYocWIuAdqB_1MwQnbOO6vSKj8uVQxl1_JM7AzvMO-w&_nc_zt=23&_nc_ht=scontent.fdar12-1.fna&_nc_gid=19iRMYiKV9YO0K7flczBDg&oh=00_AfnCMEi2Hh4o6OOahsmfBZ8OrlAt-cAvIOaPaL_SEHvLkw&oe=69410ACC')` 
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center rounded-md bg-blue-600/90 px-3 py-1 text-xs font-bold text-white mb-6 uppercase tracking-wider shadow-lg">
                                New Collection Available
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-sm">
                                Elevate Your <br/>
                                <span className="text-blue-400">Medical Wardrobe</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                                Premium scrubs and equipment designed for the modern healthcare professional. Experience unmatched comfort and performance.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={() => handleNavigation('shop-all')}
                                    className="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-blue-600/30"
                                >
                                    Shop the Collection
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Highlight Section */}
                <section className="py-12 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             {/* Feature 1 */}
                             <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center group hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                 <div className="h-14 w-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                     <Droplets className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                                 </div>
                                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Antimicrobial Fabric</h3>
                                 <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                     Advanced fabric technology that keeps you safe and fresh throughout your shift.
                                 </p>
                             </div>

                             {/* Feature 2 */}
                             <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center group hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                 <div className="h-14 w-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                     <Scissors className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                                 </div>
                                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tailored Fit</h3>
                                 <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                     Designed to move with you. Modern cuts that look professional and feel amazing.
                                 </p>
                             </div>

                             {/* Feature 3 */}
                             <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col items-center text-center group hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                                 <div className="h-14 w-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                     <Truck className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                                 </div>
                                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Fast Shipping</h3>
                                 <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                     Get your gear when you need it. Free shipping on all orders over $75.
                                 </p>
                             </div>
                         </div>
                     </div>
                </section>

                {/* Shop by Category Section */}
                <section className="py-20 bg-gray-50 dark:bg-slate-950">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="mb-12">
                             <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Featured Categories</h2>
                             <p className="text-gray-500 dark:text-gray-400">Browse our specialized collections tailored for your needs.</p>
                         </div>
                         
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: 'Scrubs', img: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800', subtitle: 'Comfort & Style' },
                                { name: 'Lab Coats', img: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=800', subtitle: 'Professional Look' },
                                { name: 'Stethoscopes', img: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800', subtitle: 'Diagnostic Tools' },
                                { name: 'Footwear', img: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=800', subtitle: 'All-day Support' },
                            ].map((cat) => (
                                <div 
                                    key={cat.name}
                                    className="group cursor-pointer"
                                    onClick={() => {
                                        handleNavigation('shop-all');
                                        setTimeout(() => setSelectedCategory(cat.name === 'Stethoscopes' ? Category.EQUIPMENT : cat.name === 'Footwear' ? Category.SHOES : cat.name as any), 100);
                                    }}
                                >
                                    <div className="relative h-64 w-full overflow-hidden rounded-xl bg-white shadow-md">
                                        <img 
                                            src={cat.img} 
                                            alt={cat.name} 
                                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{cat.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                     </div>
                </section>

                {/* Best Sellers Section */}
                <section className="py-20 bg-white dark:bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="flex justify-between items-end mb-10">
                             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Best Sellers</h2>
                             <button onClick={() => handleNavigation('shop-all')} className="text-blue-600 font-semibold hover:text-blue-800 dark:text-blue-400 transition flex items-center">
                                 View All <ArrowUp className="ml-1 h-4 w-4 rotate-90" />
                             </button>
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.filter(p => p.featured).slice(0, 4).map((product) => (
                                 <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onAddToCart={addToCart}
                                    onBuyNow={handleBuyNow}
                                    onQuickView={handleQuickView}
                                  />
                            ))}
                         </div>
                    </div>
                </section>

                {/* Testimonials / Trust Section */}
                <section className="py-24 bg-blue-50 dark:bg-slate-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Trusted by Healthcare Professionals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-left relative">
                                <div className="text-blue-600 dark:text-blue-400 text-6xl absolute top-4 left-6 opacity-20 font-serif">"</div>
                                <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 pt-4">
                                    Finally, scrubs that fit as good as they feel. The Dr. Nurse Collection has completely changed my work day. I don't rush to change out of my uniform anymore!
                                </p>
                                <div className="flex items-center">
                                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100" alt="Dr. Sarah" className="h-10 w-10 rounded-full object-cover mr-3" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Dr. Sarah Jenkins</h4>
                                        <p className="text-xs text-gray-500">ER Resident</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-left relative">
                                <div className="text-blue-600 dark:text-blue-400 text-6xl absolute top-4 left-6 opacity-20 font-serif">"</div>
                                <p className="text-gray-600 dark:text-gray-300 italic mb-6 relative z-10 pt-4">
                                    The antimicrobial fabric gives me real peace of mind. These scrubs hold up incredibly well after countless washes, and the fit is modern and professional.
                                </p>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs mr-3">MJ</div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm">Mark Johnson</h4>
                                        <p className="text-xs text-gray-500">Registered Nurse</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section - Preview Only */}
                <Gallery 
                  ref={gallerySectionRef} 
                  preview={true}
                  onViewAll={() => handleNavigation('gallery')} 
                />

                {/* Newsletter / Community Section */}
                <section className="bg-slate-900 py-20 relative overflow-hidden">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-white mb-4">Join the Community</h2>
                                    <p className="text-gray-300 text-lg mb-6">
                                        Subscribe for exclusive offers, new arrivals, and medical lifestyle tips.
                                    </p>
                                </div>
                                <div>
                                    <form className="flex flex-col sm:flex-row gap-3">
                                        <input 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            className="flex-grow px-5 py-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                     </div>
                </section>
              </>
            )}
          </>
        )}
      </main>

      {currentView !== 'checkout' && (
        <footer className="bg-white border-t border-gray-100 mt-12 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center mb-6">
                          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white mr-2">
                               <HeartPulse className="h-5 w-5" strokeWidth={2.5} />
                          </div>
                          <span className="font-bold text-lg text-slate-900 dark:text-white">
                              Dr. Nurse Collection
                          </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                        Premium medical apparel designed to empower healthcare professionals with comfort, style, and durability.
                    </p>
                    <div className="flex space-x-4">
                        {/* Social icons placeholder */}
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500">
                             <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Shop</h3>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><button onClick={() => { handleNavigation('shop-all'); setTimeout(() => setSelectedCategory(Category.SCRUBS), 100); }} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Men's Scrubs</button></li>
                        <li><button onClick={() => { handleNavigation('shop-all'); setTimeout(() => setSelectedCategory(Category.SCRUBS), 100); }} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Women's Scrubs</button></li>
                        <li><button onClick={() => { handleNavigation('shop-all'); setTimeout(() => setSelectedCategory(Category.LAB_COATS), 100); }} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Lab Coats</button></li>
                        <li><button onClick={() => { handleNavigation('shop-all'); setTimeout(() => setSelectedCategory(Category.EQUIPMENT), 100); }} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Equipment</button></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Support</h3>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><button onClick={() => handleNavigation('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Order Status</button></li>
                        <li><button onClick={() => handleNavigation('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Returns & Exchanges</button></li>
                        <li><button onClick={() => handleNavigation('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Size Guide</button></li>
                        <li><button onClick={() => handleNavigation('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact Us</button></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><button onClick={() => handleNavigation('about')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</button></li>
                        <li><button onClick={() => handleNavigation('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Careers</button></li>
                        <li><button onClick={() => handleNavigation('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Press</button></li>
                        <li><button onClick={() => handleNavigation('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</button></li>
                    </ul>
                </div>
             </div>
             
             <div className="mt-16 pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center">
                 <div className="text-xs text-gray-400 mb-4 md:mb-0">
                     &copy; {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
                 </div>
                 <div className="flex items-center space-x-2 text-gray-400 text-xs">
                     <LockIcon className="h-3 w-3" />
                     <span>Secure Checkout</span>
                 </div>
             </div>
          </div>
        </footer>
      )}
      
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-[60] transition-all duration-300 flex items-center space-x-2 ${
          toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
         <div className="bg-blue-500 rounded-full p-1">
            <Check className="h-3 w-3 text-white" />
         </div>
         <span className="font-medium text-sm">{toastMessage}</span>
      </div>

      <AIAssistant />
    </div>
  );
};

const LockIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
);

export default App;
