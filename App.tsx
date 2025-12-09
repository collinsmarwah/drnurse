
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import AIAssistant from './components/AIAssistant';
import ImageGenerator from './components/ImageGenerator';
import ProductModal from './components/ProductModal';
import CheckoutSuccessModal from './components/CheckoutSuccessModal';
import { STORE_NAME, PRODUCTS } from './constants';
import { supabase } from './lib/supabase';
import { Product, CartItem, Category, CustomizationOptions } from './types';
import { 
  Filter, Star, Truck, ShieldCheck, Search, Check,
  ChevronDown, ArrowUp, ArrowDown, ArrowDownAZ, Sparkles, Loader2, Trophy
} from 'lucide-react';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
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
  const servicesSectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  
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

  // Scroll to product section when filters change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (productSectionRef.current) {
       // productSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCategory, searchQuery, sortOption, showFeaturedOnly]);

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

  const handleCheckout = () => {
    setIsCartOpen(false);
    // Simulate API call/processing
    setTimeout(() => {
        setCartItems([]);
        localStorage.removeItem('drNurseCart');
        setIsCheckoutSuccessOpen(true);
    }, 500);
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
      if (section === 'home') {
          setSelectedCategory('All');
          setSearchQuery('');
          setShowFeaturedOnly(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (section === 'shop-all') {
          setSelectedCategory('All');
          setSearchQuery('');
          setShowFeaturedOnly(false);
          productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'new-arrivals') {
          setSelectedCategory('All');
          setShowFeaturedOnly(true);
          productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (section === 'services') {
          servicesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  };

  // Filter logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeatured = showFeaturedOnly ? product.featured : true;

    return matchesCategory && matchesSearch && matchesFeatured;
  }).sort((a, b) => {
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
  const isGroupedView = selectedCategory === 'All' && !searchQuery && sortOption === 'default' && !showFeaturedOnly;

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
        onCheckout={handleCheckout}
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
        {/* Hero Section */}
        <section className="relative bg-teal-900 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[url('https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-top mix-blend-overlay"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10 text-center lg:text-left">
                <div className="lg:w-1/2">
                    <span className="inline-block py-1 px-3 rounded-full bg-teal-800 border border-teal-600 text-teal-200 text-sm font-semibold mb-4 animate-pulse">
                        PREMIUM MEDICAL APPAREL
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
                    Style Meets <br/>
                    <span className="text-teal-300">Professionalism.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                    {STORE_NAME} equips you with high-quality scrubs, lab coats, and essential medical tools. Look sharp, feel comfortable, and save lives.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button 
                            onClick={() => handleNavigation('shop-all')}
                            className="inline-block bg-white text-teal-900 font-bold px-8 py-3 rounded-lg hover:bg-teal-50 transition transform hover:-translate-y-1 shadow-lg text-center"
                        >
                        Shop Collection
                        </button>
                        <button 
                            onClick={() => setIsImageGeneratorOpen(true)}
                            className="inline-block bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition text-center flex items-center justify-center gap-2"
                        >
                            <div className="bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text text-transparent">
                                AI Design Studio
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {/* Features / Categories Highlight */}
        <section className="py-12 bg-white border-b border-gray-100 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="flex items-center space-x-4 p-6 bg-slate-50 rounded-xl hover:shadow-md transition cursor-default dark:bg-slate-800 dark:hover:bg-slate-700">
                         <div className="bg-teal-100 p-3 rounded-full text-teal-600 dark:bg-teal-900 dark:text-teal-300">
                             <Star className="h-6 w-6" />
                         </div>
                         <div>
                             <h3 className="font-bold text-gray-900 dark:text-white">Premium Fabrics</h3>
                             <p className="text-sm text-gray-600 dark:text-gray-400">Anti-wrinkle, breathable materials.</p>
                         </div>
                     </div>
                     <div className="flex items-center space-x-4 p-6 bg-slate-50 rounded-xl hover:shadow-md transition cursor-default dark:bg-slate-800 dark:hover:bg-slate-700">
                         <div className="bg-teal-100 p-3 rounded-full text-teal-600 dark:bg-teal-900 dark:text-teal-300">
                             <Truck className="h-6 w-6" />
                         </div>
                         <div>
                             <h3 className="font-bold text-gray-900 dark:text-white">Nationwide Delivery</h3>
                             <p className="text-sm text-gray-600 dark:text-gray-400">Fast shipping to your location.</p>
                         </div>
                     </div>
                     <div className="flex items-center space-x-4 p-6 bg-slate-50 rounded-xl hover:shadow-md transition cursor-default dark:bg-slate-800 dark:hover:bg-slate-700">
                         <div className="bg-teal-100 p-3 rounded-full text-teal-600 dark:bg-teal-900 dark:text-teal-300">
                             <ShieldCheck className="h-6 w-6" />
                         </div>
                         <div>
                             <h3 className="font-bold text-gray-900 dark:text-white">Trusted Equipment</h3>
                             <p className="text-sm text-gray-600 dark:text-gray-400">Authentic Littmann & instruments.</p>
                         </div>
                     </div>
                 </div>
                 
                 {/* Visual Category Links */}
                 <div className="mt-12 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex space-x-4 min-w-max">
                        {[
                            { name: Category.SCRUBS, img: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: Category.UNIFORMS, img: 'https://images.pexels.com/photos/5207085/pexels-photo-5207085.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: Category.LAB_COATS, img: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: Category.EQUIPMENT, img: 'https://images.pexels.com/photos/7659873/pexels-photo-7659873.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: Category.SHOES, img: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: Category.ACCESSORIES, img: 'https://images.pexels.com/photos/3902882/pexels-photo-3902882.jpeg?auto=compress&cs=tinysrgb&w=400' },
                            { name: Category.CUSTOMIZATION, img: 'https://images.pexels.com/photos/4625624/pexels-photo-4625624.jpeg?auto=compress&cs=tinysrgb&w=400' },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setSelectedCategory(item.name);
                                    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className={`relative group w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 transition-transform hover:scale-105 focus:outline-none ${selectedCategory === item.name ? 'ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-slate-900' : ''}`}
                            >
                                <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity"></div>
                                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm drop-shadow-md z-10 px-2 text-center">
                                    {item.name}
                                </span>
                            </button>
                        ))}
                    </div>
                 </div>
             </div>
        </section>

        {/* Product Catalog */}
        <section 
          id="products" 
          ref={productSectionRef} 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 transition-colors duration-300"
        >
          <div className="flex flex-col space-y-6 mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Collection</h2>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto z-20">
                {/* Custom Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full sm:w-56 flex items-center justify-between pl-4 pr-3 py-2 border border-gray-300 rounded-full bg-white text-gray-700 hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm group dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200"
                  >
                    <div key={sortOption} className="flex items-center space-x-2 truncate animate-in fade-in slide-in-from-bottom-1 duration-300">
                      <currentSort.icon className="h-4 w-4 text-teal-600 flex-shrink-0 group-hover:scale-110 transition-transform dark:text-teal-400" />
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
                                className={`w-full flex items-center px-4 py-3 text-sm hover:bg-teal-50 dark:hover:bg-slate-700 transition-colors ${sortOption === option.value ? 'bg-teal-50 text-teal-700 font-medium dark:bg-slate-700 dark:text-teal-300' : 'text-gray-700 dark:text-gray-300'}`}
                              >
                                <option.icon className={`h-4 w-4 mr-3 ${sortOption === option.value ? 'text-teal-600 dark:text-teal-400' : 'text-gray-400'}`} />
                                {option.label}
                                {sortOption === option.value && <Check className="h-4 w-4 ml-auto text-teal-600 dark:text-teal-400" />}
                              </button>
                            ))}
                          </div>
                        </div>
                    </>
                  )}
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm transition shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide items-center">
              <button 
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                  showFeaturedOnly 
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:text-amber-600 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700'
                }`}
              >
                <Star className={`h-4 w-4 ${showFeaturedOnly ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}`} />
                <span>Featured Only</span>
              </button>
              
              <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2 flex-shrink-0"></div>

              <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === 'All' ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700 dark:hover:border-teal-500 dark:hover:text-teal-400'}`}
              >
                All Items
              </button>
              {Object.values(Category).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-600 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700 dark:hover:border-teal-500 dark:hover:text-teal-400'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {isLoadingProducts ? (
            <div className="flex justify-center items-center py-32">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 text-teal-600 animate-spin mb-4" />
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
                        className="text-sm font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 hover:underline flex items-center"
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

        {/* Customization Banner */}
        <section id="services" ref={servicesSectionRef} className="bg-slate-900 py-20 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1555431189-0fabf2667795?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                 <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Personalize Your Uniform</h2>
                 <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
                     Stand out with our professional embroidery services. Add your name, title, or hospital logo to any scrub top, lab coat, or surgical cap for a polished look.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => setSelectedCategory(Category.CUSTOMIZATION)}
                        className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-400 transition shadow-lg shadow-teal-500/30"
                    >
                        Request Embroidery
                    </button>
                    <button 
                        onClick={() => setSelectedCategory(Category.CUSTOMIZATION)}
                        className="bg-transparent border border-gray-500 text-gray-300 font-bold py-3 px-8 rounded-lg hover:bg-white/5 transition"
                    >
                        View Font Options
                    </button>
                 </div>
             </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                  <h3 className="font-bold text-xl text-teal-900 dark:text-teal-400 mb-4">{STORE_NAME}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Providing the best attire and equipment for healthcare professionals. 
                      From hijab-friendly options to premium Littmann stethoscopes, we have everything you need to excel.
                  </p>
              </div>
              <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Customer Care</h3>
                  <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li><button onClick={() => setSelectedCategory('All')} className="hover:text-teal-600 dark:hover:text-teal-400 transition">Size Guide</button></li>
                      <li><button onClick={() => setSelectedCategory('All')} className="hover:text-teal-600 dark:hover:text-teal-400 transition">Shipping Information</button></li>
                      <li><button onClick={() => setSelectedCategory('All')} className="hover:text-teal-600 dark:hover:text-teal-400 transition">Returns & Exchanges</button></li>
                      <li><button onClick={() => setSelectedCategory(Category.CUSTOMIZATION)} className="hover:text-teal-600 dark:hover:text-teal-400 transition">Embroidery Request</button></li>
                  </ul>
              </div>
              <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4">Contact Us</h3>
                  <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li className="font-medium text-teal-900 dark:text-teal-400">Taveta road, Taveta court, Suit 301 NAIROBI</li>
                      <li className="font-bold text-teal-600 dark:text-teal-400">Call/Whatsapp: +254704268206</li>
                      <li>Email: support@drnursecollections.com</li>
                      <li>IG: @dr.nursecollections</li>
                  </ul>
              </div>
           </div>
           <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 text-center text-sm text-gray-400">
               &copy; {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
           </div>
        </div>
      </footer>
      
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-[60] transition-all duration-300 flex items-center space-x-2 ${
          toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
         <div className="bg-teal-500 rounded-full p-1">
            <Check className="h-3 w-3 text-white" />
         </div>
         <span className="font-medium text-sm">{toastMessage}</span>
      </div>

      <AIAssistant />
    </div>
  );
};

export default App;
