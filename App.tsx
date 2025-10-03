
import React, { useState, useEffect, useCallback } from 'react';
import { Product, ChatMessage } from './types';
import { DEMO_PRODUCTS } from './constants';
import { getChatbotReply } from './services/geminiService';

import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Sidebar from './components/Sidebar';
import ListingForm from './components/ListingForm';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(DEMO_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListingFormVisible, setListingFormVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { kind: 'bot', text: 'Hi! How can we help you today? Ask about listings, payments or tracking.' }
  ]);
  const [isBotReplying, setIsBotReplying] = useState(false);
  const [realtimeStatus, setRealtimeStatus] = useState({ text: 'online', pulse: false });
  const [liveDotOpacity, setLiveDotOpacity] = useState(1);

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setLiveDotOpacity(Math.random() > 0.5 ? 1 : 0.25);
    }, 1200);
    return () => clearInterval(pulseInterval);
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(p =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.cat.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: ChatMessage = { kind: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsBotReplying(true);

    try {
      const reply = await getChatbotReply(text, messages);
      const botMessage: ChatMessage = { kind: 'bot', text: reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting bot reply:", error);
      const errorMessage: ChatMessage = { kind: 'bot', text: "Sorry, I'm having trouble connecting right now." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsBotReplying(false);
    }
  }, [messages]);

  const handleAddListing = (newProduct: Omit<Product, 'id'>) => {
    const productWithId = { ...newProduct, id: products.length + 1 };
    setProducts(prev => [productWithId, ...prev]);
    setListingFormVisible(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert('Listing published (demo). Sellers will receive orders here.');
  };

  const openListingForm = () => {
    setListingFormVisible(true);
    setTimeout(() => {
        document.getElementById('listingForm')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  return (
    <div className="text-[#e6eef6] min-h-screen">
      <div className="max-w-[1100px] mx-auto p-5 md:p-7">
        <Header 
          onOpenListing={openListingForm}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />
        <main className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6 mt-5">
          <div className="flex flex-col gap-4">
            <div className="card-bg p-5 rounded-xl">
               <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold">Buy & Sell — E-books, Mobile Accessories, पूजा सामान & Courses</h2>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="chip">Fast UPI Payments</div>
                      <div className="chip">Seller Dashboard</div>
                      <div className="chip">Order Tracking</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4 hidden sm:block">
                    <div className="text-[#9aa4b2] text-sm">Realtime Activity</div>
                    <div className="flex items-center justify-end gap-2 mt-1.5">
                       <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] shadow-[0_6px_12px_rgba(37,211,102,0.12)] transition-opacity duration-300" style={{ opacity: realtimeStatus.pulse ? 1 : liveDotOpacity }}></div>
                       <div className="text-sm text-[#9aa4b2] capitalize">{realtimeStatus.text}</div>
                    </div>
                  </div>
               </div>
               <div className="mt-4 h-40 rounded-xl bg-gradient-to-r from-[#ff7a00] to-[#ffb86b] flex items-center justify-center text-xl font-bold text-[#041023]">
                  Image-led hero — ok shoppy store
               </div>
               <ProductGrid products={filteredProducts} />
            </div>
          </div>
          <aside className="flex flex-col gap-4">
            <Sidebar onOpenListing={openListingForm} setRealtimeStatus={setRealtimeStatus} />
          </aside>
        </main>
        {isListingFormVisible && (
          <ListingForm 
            onClose={() => setListingFormVisible(false)}
            onAddListing={handleAddListing}
          />
        )}
        <Footer />
      </div>
      <ChatWidget 
        messages={messages}
        onSendMessage={handleSendMessage}
        isReplying={isBotReplying}
      />
    </div>
  );
};

// Global styles injected via components, but for some core elements it's easier here.
// These replicate the custom properties from the original CSS.
const style = document.createElement('style');
style.textContent = `
  .card-bg {
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    box-shadow: 0 6px 30px rgba(2,6,23,0.6);
    backdrop-filter: blur(6px);
  }
  .glass-input {
    background: rgba(255,255,255,0.04);
  }
  .chip {
    background: rgba(255,255,255,0.03);
    padding: 8px 10px;
    border-radius: 999px;
    font-size: 13px;
    color: #9aa4b2;
  }
`;
document.head.appendChild(style);


export default App;
