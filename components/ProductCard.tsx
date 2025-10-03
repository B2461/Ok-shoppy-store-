
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleCardClick = () => {
    alert(`Quick view: ${product.title}\n(Checkout flow & payment integrations are demo-only)`);
  };

  return (
    <div 
      className="card-bg flex flex-col p-3 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105"
      onClick={handleCardClick}
    >
      <img src={product.img} alt={product.title} className="w-full h-40 object-cover rounded-lg" />
      <div className="font-semibold mt-2.5">{product.title}</div>
      <div className="flex justify-between items-center text-[#9aa4b2] text-sm mt-1">
        <div>{product.cat}</div>
        <div className="bg-[#ff7a00] px-2 py-1.5 rounded-lg text-[#041226] font-bold">
          ₹{product.price}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
