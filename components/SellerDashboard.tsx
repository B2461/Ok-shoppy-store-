
import React from 'react';
import { Product } from '../types';

interface SellerDashboardProps {
  products: Product[];
  onClose: () => void;
  onDeleteProduct: (id: number) => void;
  onEditProduct: (id: number) => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="card-bg p-4 rounded-lg flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">{icon}</div>
        <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-[#9aa4b2]">{title}</div>
        </div>
    </div>
);

const SellerDashboard: React.FC<SellerDashboardProps> = ({ products, onClose, onDeleteProduct, onEditProduct }) => {
    const totalSales = "₹12,450"; // Dummy data
    const pendingOrders = 4; // Dummy data

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="card-bg w-full max-w-4xl max-h-[90vh] rounded-2xl p-6 flex flex-col gap-5 text-white animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Seller Dashboard</h2>
                    <button onClick={onClose} className="bg-[#ff7a00] border-0 px-4 py-2.5 rounded-lg text-[#061226] font-semibold hover:opacity-90 transition-opacity">
                        Close
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title="Total Sales" value={totalSales} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    } />
                    <StatCard title="Pending Orders" value={pendingOrders} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    }/>
                    <StatCard title="Products Listed" value={products.length} icon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    }/>
                </div>

                {/* Product List */}
                <div className="flex flex-col gap-3 flex-1 overflow-hidden">
                    <h3 className="text-xl font-bold">Your Listings</h3>
                    <div className="overflow-y-auto pr-2 -mr-2">
                        {products.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {products.map(product => (
                                    <div key={product.id} className="bg-white/5 p-3 rounded-lg flex items-center gap-4">
                                        <img src={product.img} alt={product.title} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="font-semibold">{product.title}</div>
                                            <div className="text-sm text-[#9aa4b2]">{product.cat} • ₹{product.price}</div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => onEditProduct(product.id)} className="bg-[#0b84ff] text-white px-3 py-1.5 text-sm rounded-md hover:opacity-90 transition-opacity">Edit</button>
                                            <button onClick={() => onDeleteProduct(product.id)} className="bg-red-600/80 text-white px-3 py-1.5 text-sm rounded-md hover:bg-red-600 transition-colors">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-[#9aa4b2]">You haven't listed any products yet.</div>
                        )}
                    </div>
                </div>
                 <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.2s ease-out forwards;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default SellerDashboard;