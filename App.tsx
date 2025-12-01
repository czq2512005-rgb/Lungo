
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Coffee, Star, Menu as MenuIcon, X, ChevronRight, Check, Wand2, MessageCircle, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, MenuItem, CartItem, OrderType, PaymentMethod } from './types';
import { MENU_ITEMS } from './constants';
import clsx from 'clsx';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

// Chat Interface Component
const ChatInterface = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hi! I'm BA-Co, your friendly baker. I'm fresh out of the oven and ready to help! Ask me anything about our bagels or coffee." }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize Gemini API
  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY }), []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsLoading(true);

    try {
      // Construct system instruction with menu context
      const menuContext = MENU_ITEMS.map(item => 
        `- ${item.nameEn} (${item.nameZh}): $${item.price} (${item.category})`
      ).join('\n');

      const systemInstruction = `
        You are BA-Co, the mascot of Lungo Coffee. You are a cute, cheerful bagel with a coffee cup inside you. 
        Role: You are the head baker and coffee expert.
        Personality: Friendly, helpful, energetic, and you love making puns about bread, baking, and coffee (e.g., "Don't worry, be frappe!", "You're all I knead!").
        Task: Answer customer questions about the menu, suggest combinations, and explain menu items.
        
        Menu Data:
        ${menuContext}

        Payment Methods: In-Store, AlipayHK, PayPal, PayMe, FPS.
        Store Info: We serve premium coffee and artisan bagels.
        
        Keep your responses concise, helpful, and in character. Do not output markdown, just plain text.
      `;

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text;

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops! My brain feels a bit toasty. Can you ask that again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed z-50 bottom-24 right-4 w-[90vw] md:w-96 h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-coffee-200 flex flex-col overflow-hidden font-sans"
    >
      {/* Header */}
      <div className="bg-coffee-800 p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full p-1 overflow-hidden border-2 border-amber-300">
             {/* Mascot Image in Chat Header */}
             <img 
               src="https://images.unsplash.com/photo-1621939514649-28b12e81658a?auto=format&fit=crop&w=100&q=80" 
               alt="BA-Co" 
               className="w-full h-full object-cover rounded-full"
             />
          </div>
          <div>
            <h3 className="font-bold font-serif leading-none">BA-Co</h3>
            <p className="text-xs text-coffee-200">The Lungo Baker</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-coffee-50">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={clsx(
              "flex w-full",
              msg.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div 
              className={clsx(
                "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-coffee-600 text-white rounded-tr-none" 
                  : "bg-white text-coffee-900 border border-coffee-100 rounded-tl-none"
              )}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-coffee-100 shadow-sm flex items-center gap-2 text-coffee-400 text-sm">
              <Loader2 className="animate-spin w-4 h-4" />
              <span>Baking a response...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-coffee-100 shrink-0">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask BA-Co about the menu..."
            className="flex-1 px-4 py-2 bg-coffee-50 border border-coffee-200 rounded-full focus:outline-none focus:ring-2 focus:ring-coffee-500 text-sm text-coffee-900 placeholder-coffee-400"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !inputText.trim()}
            className="p-2 bg-coffee-800 text-white rounded-full hover:bg-coffee-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Mascot Component
const Mascot = ({ onClick, isChatOpen }: { onClick: () => void; isChatOpen: boolean }) => {
  return (
    <>
      <motion.div
        className="fixed z-50 bottom-4 right-4 md:bottom-8 md:right-8 cursor-pointer group"
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <motion.div 
             className="absolute inset-0 bg-amber-200 rounded-full opacity-20"
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Main Mascot Image Container */}
          <div className="relative w-full h-full bg-white rounded-full border-4 border-white shadow-xl overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1621939514649-28b12e81658a?auto=format&fit=crop&w=200&q=80" 
               alt="BA-Co Mascot" 
               className="w-full h-full object-cover"
             />
          </div>

          {/* Badge/Notification */}
          {!isChatOpen && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="absolute -top-10 right-0 left-0 mx-auto w-max max-w-[150px]"
             >
               <div className="bg-white px-3 py-2 rounded-xl shadow-lg border border-coffee-100 relative text-xs font-bold text-coffee-800 text-center">
                 Hi, I'm BA-Co!
                 <br/><span className="font-normal text-[10px] text-coffee-500">Click to chat!</span>
                 <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-b border-r border-coffee-100"></div>
               </div>
             </motion.div>
          )}

          {/* Chat Icon Badge */}
          <div className="absolute bottom-0 right-0 bg-coffee-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
             {isChatOpen ? <X size={14} /> : <MessageCircle size={14} />}
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Navbar
const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Surprise Me', path: '/random' },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-coffee-200 shadow-sm font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-coffee-800 rounded-full flex items-center justify-center text-white font-bold">L</div>
            <span className="text-xl font-bold text-coffee-900 tracking-tight">Lungo</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  "text-coffee-800 hover:text-coffee-600 transition-colors font-medium",
                  location.pathname === link.path && "text-amber-700 border-b-2 border-amber-700"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2 text-coffee-800 hover:bg-coffee-50 rounded-full transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-coffee-800 rounded-md"
            >
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-coffee-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-coffee-800 hover:bg-coffee-50 hover:text-coffee-900"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Home Page
const Home = ({ onChatOpen }: { onChatOpen: () => void }) => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-coffee-900">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1920&q=80" 
            alt="Coffee Shop Interior" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Taste the range.<br/>Brew the exclusive.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-coffee-100 mb-8 max-w-2xl mx-auto"
          >
            Experience premium bagels and artisanal coffee in a sophisticated atmosphere.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/menu" 
              className="px-8 py-3 bg-white text-coffee-900 rounded-full font-bold shadow-lg hover:bg-coffee-50 transition-all transform hover:scale-105"
            >
              Order Now
            </Link>
            <Link 
              to="/random" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Surprise Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Meet BA-Co Section */}
      <section className="py-12 bg-amber-50 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row items-center p-8 gap-8">
           <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <div className="absolute inset-0 bg-amber-100 rounded-full animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1621939514649-28b12e81658a?auto=format&fit=crop&w=400&q=80" 
                alt="BA-Co the Mascot" 
                className="w-full h-full object-cover rounded-full border-8 border-white shadow-lg relative z-10"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-full shadow-md z-20">
                <Sparkles className="w-8 h-8 text-amber-500" />
              </div>
           </div>
           <div className="flex-1 text-center md:text-left">
             <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-3 tracking-wide">
               MEET OUR BAKER
             </div>
             <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-4">Hi, I'm BA-Co!</h2>
             <p className="text-coffee-600 mb-6 text-lg leading-relaxed">
               I'm Lungo's resident baker and coffee enthusiast. I'm part bagel, part coffee cup, and 100% ready to help you find your perfect flavor match!
             </p>
             <button 
               onClick={onChatOpen}
               className="inline-flex items-center gap-2 px-6 py-3 bg-coffee-800 text-white rounded-xl font-bold hover:bg-coffee-700 transition-colors shadow-md"
             >
               <MessageCircle size={20} />
               Chat with BA-Co
             </button>
           </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-coffee-50 rounded-2xl">
            <Coffee className="w-12 h-12 text-coffee-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-coffee-900 mb-2">Premium Beans</h3>
            <p className="text-coffee-700">Sourced from the finest growers worldwide for that perfect roast.</p>
          </div>
          <div className="text-center p-6 bg-coffee-50 rounded-2xl">
            <div className="w-12 h-12 bg-coffee-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">B</div>
            <h3 className="text-xl font-bold text-coffee-900 mb-2">Artisan Bagels</h3>
            <p className="text-coffee-700">Freshly baked daily with creative flavors and premium fillings.</p>
          </div>
          <div className="text-center p-6 bg-coffee-50 rounded-2xl">
            <Star className="w-12 h-12 text-coffee-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-coffee-900 mb-2">Exclusive Merch</h3>
            <p className="text-coffee-700">Take a piece of Lungo home with our signature merchandise.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Menu Page
const Menu = ({ addToCart }: { addToCart: (item: MenuItem, variant?: 'Hot' | 'Iced', stickerText?: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.Scone);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Modal State
  const [variant, setVariant] = useState<'Hot' | 'Iced'>('Hot');
  const [stickerText, setStickerText] = useState('');

  // Reset variant when item opens with correct default logic
  useEffect(() => {
    if (selectedItem?.isDrink) {
      // If availableVariants is defined, pick the first one, otherwise default to Hot
      if (selectedItem.availableVariants && selectedItem.availableVariants.length > 0) {
        setVariant(selectedItem.availableVariants[0]);
      } else {
        setVariant('Hot');
      }
    } else {
      setVariant('Hot');
    }
    setStickerText('');
  }, [selectedItem]);

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.nameZh.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const categories = Object.values(Category);

  const handleAddToCart = () => {
    if (selectedItem) {
      // Validate sticker text length
      if (stickerText.length > 20) {
        alert("Sticker text must be 20 characters or less.");
        return;
      }
      addToCart(selectedItem, selectedItem.isDrink ? variant : undefined, stickerText);
      setSelectedItem(null);
    }
  };

  const isHotAvailable = selectedItem?.availableVariants?.includes('Hot') ?? true;
  const isIcedAvailable = selectedItem?.availableVariants?.includes('Iced') ?? (!!selectedItem?.priceIced);

  return (
    <div className="min-h-screen bg-coffee-50 pb-20">
      <div className="bg-coffee-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Our Menu</h1>
          <p className="text-coffee-200">Discover your new favorite flavor.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 items-start">
          <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
            <h3 className="font-bold text-coffee-900 mb-2 px-2">Categories</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as Category)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap text-left",
                    activeCategory === cat 
                      ? "bg-coffee-600 text-white shadow-md" 
                      : "bg-white text-coffee-700 hover:bg-coffee-100"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search menu / 搜尋菜單..."
                className="w-full px-4 py-3 rounded-xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden relative group">
                    <img src={item.image} alt={item.nameEn} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="absolute bottom-4 right-4 bg-white text-coffee-900 p-2 rounded-full shadow-lg hover:bg-coffee-50 transition-colors"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-coffee-900">{item.nameEn}</h3>
                      <span className="font-bold text-amber-700 text-lg">${item.price}</span>
                    </div>
                    <p className="text-sm text-coffee-600 mb-1 font-medium">{item.nameZh}</p>
                    {item.descriptionEn && (
                      <p className="text-xs text-coffee-400 mt-2 line-clamp-2">{item.descriptionEn}</p>
                    )}
                    <div className="mt-auto pt-4">
                      <button 
                        onClick={() => setSelectedItem(item)}
                        className="w-full py-2 border border-coffee-200 text-coffee-700 rounded-lg hover:bg-coffee-50 font-medium text-sm transition-colors"
                      >
                        Select Options
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Item Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
            >
              <div className="h-48 bg-coffee-100 relative">
                 <img src={selectedItem.image} alt={selectedItem.nameEn} className="w-full h-full object-cover" />
                 <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-black/30 text-white p-1 rounded-full hover:bg-black/50"
                 >
                   <X size={24} />
                 </button>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-serif font-bold text-coffee-900 mb-1">{selectedItem.nameEn}</h2>
                <p className="text-coffee-600 mb-4">{selectedItem.nameZh}</p>
                
                {selectedItem.isDrink && (
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-coffee-800 mb-2">Temperature</label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setVariant('Hot')}
                        disabled={!isHotAvailable}
                        className={clsx(
                          "flex-1 py-2 rounded-lg border transition-colors",
                          !isHotAvailable 
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : variant === 'Hot' 
                              ? "bg-coffee-600 text-white border-coffee-600" 
                              : "bg-white text-coffee-600 border-coffee-200"
                        )}
                      >
                        Hot (${selectedItem.price})
                      </button>
                      
                      <button 
                        onClick={() => setVariant('Iced')}
                        disabled={!isIcedAvailable}
                        className={clsx(
                          "flex-1 py-2 rounded-lg border transition-colors",
                          !isIcedAvailable 
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : variant === 'Iced' 
                              ? "bg-sky-600 text-white border-sky-600" 
                              : "bg-white text-coffee-600 border-coffee-200"
                        )}
                      >
                        Iced (${selectedItem.priceIced || selectedItem.price})
                      </button>
                    </div>
                  </div>
                )}

                {/* Always show custom sticker input for drinks */}
                {selectedItem.isDrink && (
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-coffee-800 mb-2">
                      Custom Cup Sticker
                      <span className="text-xs font-normal text-gray-500 ml-2">Takeout only (Max 20 chars)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={20}
                      placeholder="e.g., Have a nice day!"
                      value={stickerText}
                      onChange={(e) => setStickerText(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-coffee-300 bg-coffee-800 text-white placeholder-coffee-300 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                    />
                    <p className="text-right text-xs text-gray-400 mt-1">{stickerText.length}/20</p>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-coffee-800 text-white font-bold rounded-xl hover:bg-coffee-700 transition-colors shadow-lg"
                >
                  Add to Cart - ${selectedItem.isDrink && variant === 'Iced' && selectedItem.priceIced ? selectedItem.priceIced : selectedItem.price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Random Combo Page
const RandomCombo = ({ addToCart }: { addToCart: (item: MenuItem, variant?: 'Hot'|'Iced', stickerText?: string) => void }) => {
  const [combo, setCombo] = useState<{ food: MenuItem; drink: MenuItem } | null>(null);
  const [loading, setLoading] = useState(false);
  const [comboStickerText, setComboStickerText] = useState('');

  const generateCombo = () => {
    setLoading(true);
    setCombo(null);
    setComboStickerText('');
    
    setTimeout(() => {
      const foods = MENU_ITEMS.filter(i => !i.isDrink && i.category !== Category.Merch);
      const drinks = MENU_ITEMS.filter(i => i.isDrink);
      
      const randomFood = foods[Math.floor(Math.random() * foods.length)];
      const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
      
      setCombo({ food: randomFood, drink: randomDrink });
      setLoading(false);
    }, 800);
  };

  const addComboToCart = () => {
    if (combo) {
      // Validate sticker text length
      if (comboStickerText.length > 20) {
        alert("Sticker text must be 20 characters or less.");
        return;
      }

      addToCart(combo.food);
      const variant = combo.drink.availableVariants?.[0] || 'Hot';
      addToCart(combo.drink, variant, comboStickerText);
    }
  };

  const generateRandomSticker = () => {
    const slogans = [
      "Have a great day!", "Smile!", "You got this!", "Coffee time!", "Enjoy!", 
      "Stay awesome!", "Good vibes only", "Made with love", "Hello there!", "Cheers!"
    ];
    setComboStickerText(slogans[Math.floor(Math.random() * slogans.length)]);
  };

  return (
    <div className="min-h-screen bg-coffee-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-coffee-900 mb-2">Can't Decide?</h1>
        <p className="text-coffee-600">Let BA-Co pick a perfect pairing for you!</p>
      </div>

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden p-8 min-h-[400px] flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center animate-pulse">
            <div className="w-24 h-24 bg-coffee-100 rounded-full mb-4"></div>
            <div className="h-4 bg-coffee-100 w-48 rounded mb-2"></div>
            <div className="h-4 bg-coffee-100 w-32 rounded"></div>
          </div>
        ) : combo ? (
          <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
               <div className="flex-1 text-center">
                 <img src={combo.food.image} alt={combo.food.nameEn} className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-md border-4 border-coffee-100" />
                 <h3 className="font-bold text-lg text-coffee-900">{combo.food.nameEn}</h3>
                 <p className="text-sm text-coffee-600 mb-1">{combo.food.nameZh}</p>
                 <p className="text-coffee-500">${combo.food.price}</p>
               </div>
               <div className="text-coffee-300 font-serif text-4xl font-bold">+</div>
               <div className="flex-1 text-center flex flex-col items-center">
                 <img src={combo.drink.image} alt={combo.drink.nameEn} className="w-40 h-40 object-cover rounded-full mb-4 shadow-md border-4 border-coffee-100" />
                 <h3 className="font-bold text-lg text-coffee-900">{combo.drink.nameEn}</h3>
                 <p className="text-sm text-coffee-600 mb-1">{combo.drink.nameZh}</p>
                 <p className="text-coffee-500 mb-3">${combo.drink.price}</p>
                 
                 <div className="w-full max-w-[200px]">
                   <label className="block text-xs font-bold text-coffee-600 mb-1 text-left">Custom Sticker</label>
                   <div className="flex gap-2">
                    <input 
                      type="text" 
                      maxLength={20}
                      className="w-full px-3 py-1.5 text-sm rounded-lg border border-coffee-200 bg-coffee-800 text-white focus:outline-none focus:ring-1 focus:ring-coffee-500 placeholder-coffee-300"
                      placeholder="Sticker text..."
                      value={comboStickerText}
                      onChange={(e) => setComboStickerText(e.target.value)}
                    />
                    <button 
                      onClick={generateRandomSticker}
                      className="p-1.5 bg-coffee-100 text-coffee-700 rounded-lg hover:bg-coffee-200"
                      title="Generate Random Slogan"
                    >
                      <Wand2 size={16} />
                    </button>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="text-center">
                <div className="text-2xl font-bold text-amber-700 mb-6">
                  Total: ${combo.food.price + combo.drink.price}
                </div>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={generateCombo}
                    className="px-6 py-3 border-2 border-coffee-200 text-coffee-700 font-bold rounded-xl hover:bg-coffee-50 transition-colors"
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={addComboToCart}
                    className="px-6 py-3 bg-coffee-800 text-white font-bold rounded-xl hover:bg-coffee-700 transition-colors shadow-lg flex items-center gap-2"
                  >
                    <ShoppingBag size={20} />
                    Add Combo
                  </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="text-center">
             <div className="w-32 h-32 bg-amber-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Star className="w-16 h-16 text-amber-300" />
             </div>
             <button 
                onClick={generateCombo}
                className="px-8 py-4 bg-gradient-to-r from-coffee-600 to-coffee-800 text-white font-bold text-xl rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
             >
                Suggest a Combo
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Cart Page
const Cart = ({ 
  cart, 
  removeFromCart, 
  updateQuantity, 
  clearCart 
}: { 
  cart: CartItem[], 
  removeFromCart: (id: string) => void, 
  updateQuantity: (id: string, delta: number) => void,
  clearCart: () => void 
}) => {
  const [orderType, setOrderType] = useState<OrderType>(OrderType.DineIn);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.InStore);
  const [isPlaced, setIsPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [confirmedOrder, setConfirmedOrder] = useState<{items: CartItem[], total: number, method: PaymentMethod, type: OrderType} | null>(null);
  
  const subtotal = cart.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
  const total = subtotal; // No tax for simplicity in HK

  const handleCheckout = () => {
    const newOrderNumber = `#${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(newOrderNumber);
    setConfirmedOrder({
      items: [...cart],
      total: total,
      method: paymentMethod,
      type: orderType
    });
    setIsPlaced(true);
    clearCart();
  };

  if (cart.length === 0 && !isPlaced) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-24 h-24 text-coffee-200 mb-6" />
        <h2 className="text-2xl font-bold text-coffee-900 mb-2">Your cart is empty</h2>
        <p className="text-coffee-600 mb-8">Looks like you haven't added any bagels yet.</p>
        <Link to="/menu" className="px-8 py-3 bg-coffee-800 text-white rounded-xl font-bold hover:bg-coffee-700 transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  if (isPlaced && confirmedOrder) {
    return (
      <div className="min-h-screen bg-coffee-50 flex flex-col items-center justify-center p-4 py-12">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-coffee-900 mb-2">Order Confirmed!</h2>
          <p className="text-coffee-600 mb-6">Thank you for ordering from Lungo.</p>
          
          <div className="bg-coffee-50 rounded-xl p-4 mb-6 text-left">
            <div className="flex justify-between items-center border-b border-coffee-200 pb-2 mb-2">
              <span className="text-sm text-coffee-500">Order Number</span>
              <span className="font-bold text-xl text-coffee-900">{orderNumber}</span>
            </div>
            <div className="space-y-2 mb-4">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <span className="text-coffee-800 font-medium">{item.quantity}x {item.nameEn}</span>
                    {item.variant && <span className="text-coffee-500 text-xs ml-1">({item.variant})</span>}
                    {item.stickerText && <div className="text-xs text-coffee-400 italic">"{item.stickerText}"</div>}
                  </div>
                  <span className="text-coffee-700 font-bold">${item.finalPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-coffee-200 pt-2 flex justify-between font-bold text-coffee-900">
              <span>Total</span>
              <span>${confirmedOrder.total}</span>
            </div>
            <div className="mt-2 text-xs text-coffee-500 flex justify-between">
              <span>Payment: {confirmedOrder.method}</span>
              <span>{confirmedOrder.type}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsPlaced(false)}
            className="w-full py-3 bg-coffee-800 text-white font-bold rounded-xl hover:bg-coffee-700 transition-colors"
          >
            Start New Order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-coffee-900 mb-8">Your Order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.cartId} className="bg-white p-4 rounded-xl shadow-sm flex gap-4">
                <img src={item.image} alt={item.nameEn} className="w-24 h-24 object-cover rounded-lg bg-coffee-100" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-coffee-900">{item.nameEn}</h3>
                      <p className="text-sm text-coffee-500">{item.nameZh}</p>
                      {item.variant && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-coffee-100 text-coffee-700 text-xs rounded-md font-medium">
                          {item.variant}
                        </span>
                      )}
                      {item.stickerText && (
                         <div className="mt-2 text-xs bg-yellow-50 text-yellow-800 border border-yellow-200 px-2 py-1 rounded">
                           Sticker: "{item.stickerText}"
                         </div>
                      )}
                    </div>
                    <p className="font-bold text-coffee-800">${item.finalPrice * item.quantity}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-xs text-red-500 hover:text-red-700 underline"
                    >
                      Remove
                    </button>
                    <div className="flex items-center gap-3 bg-coffee-50 rounded-lg px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="w-6 h-6 flex items-center justify-center text-coffee-700 hover:bg-white rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-sm font-bold text-coffee-900 w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.cartId, 1)}
                         className="w-6 h-6 flex items-center justify-center text-coffee-700 hover:bg-white rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
              <h3 className="font-bold text-lg text-coffee-900 mb-6">Order Details</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-coffee-700 mb-2">Dining Option</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setOrderType(OrderType.DineIn)}
                      className={clsx(
                        "py-2 px-4 rounded-lg text-sm font-medium transition-colors border",
                        orderType === OrderType.DineIn 
                          ? "bg-coffee-100 border-coffee-500 text-coffee-900" 
                          : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      Dine In
                    </button>
                    <button
                      onClick={() => setOrderType(OrderType.Takeout)}
                      className={clsx(
                        "py-2 px-4 rounded-lg text-sm font-medium transition-colors border",
                        orderType === OrderType.Takeout 
                          ? "bg-coffee-100 border-coffee-500 text-coffee-900" 
                          : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      Takeout
                    </button>
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-bold text-coffee-700 mb-2">Payment Method</label>
                   <select 
                    className="w-full px-4 py-2 rounded-lg border border-coffee-200 bg-white text-coffee-900 focus:outline-none focus:ring-2 focus:ring-coffee-500"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                   >
                     {Object.values(PaymentMethod).map(method => (
                       <option key={method} value={method}>{method}</option>
                     ))}
                   </select>
                </div>

                <div className="pt-4 border-t border-coffee-100">
                  <div className="flex justify-between mb-2 text-coffee-600">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between mb-6 text-xl font-bold text-coffee-900">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full py-4 bg-coffee-800 text-white font-bold rounded-xl shadow-lg hover:bg-coffee-700 transition-colors flex justify-between px-6 items-center"
                  >
                    <span>Checkout</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const AppContent = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const addToCart = (item: MenuItem, variant?: 'Hot' | 'Iced', stickerText?: string) => {
    setCart(prev => {
      // Check if same item with same variant/sticker exists
      const existing = prev.find(i => 
        i.id === item.id && 
        i.variant === variant && 
        i.stickerText === stickerText
      );

      // Determine price
      let price = item.price;
      if (item.isDrink && variant === 'Iced' && item.priceIced) {
        price = item.priceIced;
      } else if (item.isDrink && variant === 'Iced' && !item.priceIced) {
        // Fallback if priceIced not explicit but variant allowed (shouldn't happen with correct data)
        price = item.price; 
      }

      if (existing) {
        return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + 1 } : i);
      }

      return [...prev, {
        ...item,
        cartId: Math.random().toString(36).substr(2, 9),
        quantity: 1,
        variant,
        stickerText,
        finalPrice: price
      }];
    });
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-coffee-50 font-sans text-coffee-900 selection:bg-amber-200">
      <Navbar cartCount={totalItems} />
      <Routes>
        <Route path="/" element={<Home onChatOpen={() => setIsChatOpen(true)} />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/random" element={<RandomCombo addToCart={addToCart} />} />
        <Route path="/cart" element={
          <Cart 
            cart={cart} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity} 
            clearCart={clearCart} 
          />
        } />
      </Routes>
      <Mascot onClick={() => setIsChatOpen(prev => !prev)} isChatOpen={isChatOpen} />
      <AnimatePresence>
        {isChatOpen && <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
